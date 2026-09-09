export interface AxiosObject {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    authentication?: boolean;
    requiresAuth?: boolean;
    body?: unknown;
    headers?: Record<string, string>;
    endpoint: string;
    isWithoutPrefix?: boolean;
    withCredentials?: boolean;
    urlencoded?: boolean;
    isBaseAuth?: boolean;
    state?: string;
    tokenRenewed?:boolean;
    files?: File[];
}