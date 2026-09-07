import { callApi } from "./ApiService.Services"
import type { AxiosObject } from "../types/Axios.Types"
import type { GetProductResponse, GetProductsResponse } from "../types/ProductDetails"

export async function Products(): Promise<GetProductsResponse> {
    const apiObject: AxiosObject = {
        method: "GET",
        endpoint: "products",
        requiresAuth: true,
    }

    return callApi<GetProductsResponse>(apiObject)
}

export async function Product(id: number): Promise<GetProductResponse> {
    const apiObject: AxiosObject = {
        method: "GET",
        endpoint: `products/${id}`,
        requiresAuth: true,
    }

    return callApi<GetProductResponse>(apiObject)
}