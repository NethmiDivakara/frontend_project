export interface AxiosObject {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    headers?: Record<string, string>;
    endpoint: string;
    isWithoutPrefix?: boolean;
    withCredentials?: boolean;
    urlencoded?: boolean;
}