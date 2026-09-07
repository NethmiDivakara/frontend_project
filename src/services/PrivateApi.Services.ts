import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import config from "./ApiConfig.Services";
import {
  clearAuthSession,
  isTokenExpired,
  logoutAndRedirect,
  saveAuthSession,
} from "./Interceptors.Services";

interface PrivateRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const PrivateApi = axios.create({
  baseURL: config.serverUrl,
  withCredentials: false,
});

let refreshPromise: Promise<string | null> | null = null;

const isAuthenticationError = (status?: number) =>
  status === 401;

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    console.log("[auth] refreshAccessToken invoked", {
      hasRefreshToken: !!refreshToken,
      refreshExpiresAtRaw: localStorage.getItem("refresh_expires_at"),
    });

    if (!refreshToken || isTokenExpired(localStorage.getItem("refresh_expires_at"))) {
      console.error("[auth] refreshAccessToken aborted before network call");
      clearAuthSession();
      logoutAndRedirect();
      return null;
    }

    console.log("[auth] refreshAccessToken: calling POST /auth/refresh now");

    try {
      const response = await axios.post(
        `${config.serverUrl}/auth/refresh`,
        { refresh_token: refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );
      const auth = response.data?.data?.auth ?? response.data?.auth ?? response.data;
      const currentRefreshToken = localStorage.getItem("refresh_token");
      const currentRefreshExpiresAt = localStorage.getItem("refresh_expires_at");

      console.log("[auth] /auth/refresh response", response.data);

      if (!auth?.access_token || !auth.expires_at) {
        console.error("[auth] refresh response missing access_token/expires_at", auth);
        return null;
      }

      saveAuthSession({
        access_token: auth.access_token,
        expires_at: auth.expires_at,
        refresh_token: auth.refresh_token ?? currentRefreshToken ?? undefined,
        refresh_expires_at: auth.refresh_expires_at ?? currentRefreshExpiresAt ?? undefined,
      });

      return auth.access_token;
    } catch (error) {
      console.error("[auth] /auth/refresh request failed", error);
      if (axios.isAxiosError(error) && isAuthenticationError(error.response?.status)) {
        console.error("[auth] refresh token rejected by server (401) — ending session");
        clearAuthSession();
        logoutAndRedirect();
      }
      return null;
    }
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

// adding a request interceptor
PrivateApi.interceptors.request.use(
  async (requestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (
      !accessToken ||
      !refreshToken ||
      isTokenExpired(localStorage.getItem("refresh_expires_at"))
    ) {
      console.error("[auth] request interceptor blocked request before sending", {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
      });
      clearAuthSession();
      logoutAndRedirect();
      return Promise.reject(new Error("Authentication session has expired."));
    }

    let token: string | null = accessToken;
    if (isTokenExpired(localStorage.getItem("access_expires_at"))) {
      console.log("[auth] request interceptor: access token expired, refreshing before request");
      token = await refreshAccessToken();
      if (!token) {
        return Promise.reject(new Error("Unable to refresh access token."));
      }
    }

    const headers = axios.AxiosHeaders.from(requestConfig.headers ?? {});
    headers.set("Authorization", `Bearer ${token}`);
    requestConfig.headers = headers;
    return requestConfig;
  },
  (error) => Promise.reject(error),
);

//adding a response interceptor
PrivateApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as PrivateRequestConfig | undefined;
    const statusCode = error.response?.status;

    if (!originalRequest || !isAuthenticationError(statusCode) || originalRequest._retry) {
      return Promise.reject(error);
    }

    console.warn("[auth] response interceptor caught 401, attempting refresh", originalRequest.url);

    originalRequest._retry = true;
    const token = await refreshAccessToken();

    if (!token) {
      return Promise.reject(error);
    }

    const headers = axios.AxiosHeaders.from(originalRequest.headers ?? {});
    headers.set("Authorization", `Bearer ${token}`);
    originalRequest.headers = headers;
    return PrivateApi(originalRequest);
  },
);

export default PrivateApi;