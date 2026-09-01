import axios from "axios";
import type { AxiosResponse } from "axios";
import config from "./ApiConfig.Services";
import type { AxiosObject } from "../types/Axios.Types";

const API_TIMEOUT_MS = 10000;

export type ApiError = {
  success: false;
  status: number;
  data: unknown;
  message: string;
};

export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "success" in err &&
    (err as { success: unknown }).success === false
  );
}

export const callApi = async <T extends { success: boolean; message: string }>(
  apiObject: AxiosObject
): Promise<T> => {
  const method = apiObject.method 
  ? apiObject.method.toLowerCase() 
  : "get";
  const body = ["post", "put", "patch","delete"].includes(method) 
  ? apiObject.body 
  : undefined;

  const headers = {
    "Content-Type": apiObject.urlencoded
      ? "application/x-www-form-urlencoded"
      : "application/json",
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
    switch (method) {
      case "get":
        response = await axios.get<T>(url, requestConfig);
        break;
      case "post":
        response = await axios.post<T>(url, body, requestConfig);
        break;
      case "put":
        response = await axios.put<T>(url, body, requestConfig);
        break;
      case "patch":
        response = await axios.patch<T>(url, body, requestConfig);
        break;
      case "delete":
        response = await axios.delete<T>(url, requestConfig);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${apiObject.method}`);
    }
    if (!response.data.success) {
      throw {
        success: false,
        status: response.status,
        data: response.data,
        message: response.data.message || "Request failed.",
      } satisfies ApiError;
    }

     return response.data;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw error; 
    }

    if (axios.isAxiosError<{ message?: string }>(error)) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data;

      throw {
        success: false,
        status,
        data,
        message: data?.message || error.message || "Something went wrong",
      } satisfies ApiError;
    }

    throw {
      success: false,
      status: 500,
      data: null,
      message: "Something went wrong",
    } satisfies ApiError;
  }
};