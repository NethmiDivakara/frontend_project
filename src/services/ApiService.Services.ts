import axios from "axios";
import type { AxiosResponse } from "axios";
import config from "./ApiConfig.Services";
import type { AxiosObject } from "../types/Axios.Types";

const API_TIMEOUT_MS = 10000;

export const callApi = async <T>(apiObject: AxiosObject): Promise<T> => {
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

    return response.data;
  } catch (error: unknown) {

    if (axios.isAxiosError<{ message?: string }>(error)) {
      const axiosError = error;
      const status = axiosError.response?.status ?? 500;
      const data = axiosError.response?.data;

      throw {
        success: false,
        status,
        data,
        message: data?.message || axiosError.message || "Something went wrong",
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
