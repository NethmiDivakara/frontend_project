import axios, { type AxiosResponse } from "axios";
import config from "./ApiConfig.Services";
import type { AxiosObject } from "../types/AxiosObject.Types";
import PrivateApi from "./PrivateApi.Services";
import PublicApi from "./PublicApi.Services";

const API_TIMEOUT_MS = 10000;

export const callApi = async <T>(apiObject: AxiosObject): Promise<T> => {
  const method = apiObject.method 
  ? apiObject.method.toLowerCase() 
  : "get";
  const body = ["post", "put", "patch","delete"].includes(method) 
  ? apiObject.body 
  : undefined;
 const isFormData = body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": apiObject.urlencoded
            ? "application/x-www-form-urlencoded"
            : "application/json",
        }),
    ...apiObject.headers,
  };
  const requestConfig = {
    headers, 
    timeout: API_TIMEOUT_MS,
    withCredentials: apiObject.withCredentials ?? false,
  };

  const url = apiObject.isWithoutPrefix
    ? apiObject.endpoint
    : `${config.serverUrl}/${apiObject.endpoint.replace(/^\//, "")}`;

  try {
    let response: AxiosResponse<T>;
    const apiInstance = apiObject.requiresAuth ?? apiObject.authentication
      ? PrivateApi
      : PublicApi;
    switch (method) {
      case "get":
        response = await apiInstance.get<T>(url, requestConfig);
        break;
      case "post":
        response = await apiInstance.post<T>(url, body, requestConfig);
        break;
      case "put":
        response = await apiInstance.put<T>(url, body, requestConfig);
        break;
      case "patch":
        response = await apiInstance.patch<T>(url, body, requestConfig);
        break;
      case "delete":
        response = await apiInstance.delete<T>(url, requestConfig);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${apiObject.method}`);
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<{ message?: string }>(error)) {
      const axiosError = error;
      const status = axiosError.response?.status ?? 500;
      const data = axiosError.response?.data;
      const validationErrors = data && typeof data === "object" && "errors" in data
        ? Object.values(data.errors as Record<string, string[]>).flat().join(" ")
        : "";

      throw {
        success: false,
        status,
        data,
        message: validationErrors || data?.message || axiosError.message || "Something went wrong",
      };
    }

    if (error instanceof Error) {
      throw {
        success: false,
        status: 401,
        data: null,
        message: error.message,
      };
    }

    throw {
      success: false,
      status: 500,
      data: null,
      message: "Something went wrong",
    };
  }
};