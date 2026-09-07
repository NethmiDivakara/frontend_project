import { toast } from "react-toastify";

let logoutInProgress = false;

export const isTokenExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt) {
    return true;
  }

  const expiryTime = new Date(expiresAt).getTime();
  return Number.isNaN(expiryTime) || Date.now() >= expiryTime;
};

export const clearAuthSession = () => {
  console.warn("[auth] clearAuthSession called");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("access_expires_at");
  localStorage.removeItem("refresh_expires_at");
  localStorage.removeItem("user");
};

export const saveAuthSession = (auth: {
  access_token?: string;
  refresh_token?: string;
  expires_at?: string;
  refresh_expires_at?: string;
}) => {
  console.log("[auth] saveAuthSession called with", auth);

  logoutInProgress = false;
  if (auth.access_token) {
    localStorage.setItem("access_token", auth.access_token);
  }

  if (auth.refresh_token) {
    localStorage.setItem("refresh_token", auth.refresh_token);
  }

  if (auth.expires_at) {
    localStorage.setItem("access_expires_at", auth.expires_at);
  } else {
    console.warn("[auth] saveAuthSession: no expires_at provided");
  }

  if (auth.refresh_expires_at) {
    localStorage.setItem("refresh_expires_at", auth.refresh_expires_at);
  } else {
    console.warn("[auth] saveAuthSession: no refresh_expires_at provided");
  }

};

export const logoutAndRedirect = () => {
  console.warn("[auth] logoutAndRedirect called", { logoutInProgress });

  if (logoutInProgress) {
    return;
  }

  logoutInProgress = true;
  clearAuthSession();

  toast.error("Your session has expired. Please log in again.");

  setTimeout(() => {
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }, 1500);
};