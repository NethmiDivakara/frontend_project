import { callApi } from "./ApiService.Services"
import type { AxiosObject } from "../types/AxiosObject.Types"
import type {
  GetProductResponse,
  GetProductsResponse,
  ProductQuery,
  ProductInput,
} from "../types/ProductDetails"
import { buildQueryString } from "../lib/QueryBuilder.Lib"

export async function Products(query: ProductQuery = {}): Promise<GetProductsResponse> {
  const queryString = buildQueryString(query)

  const apiObject: AxiosObject = {
    method: "GET",
    endpoint: `products${queryString ? `?${queryString}` : ""}`,
    requiresAuth: true,
  }

  return callApi<GetProductsResponse>(apiObject)
}

export async function CreateProduct(product: ProductInput): Promise<GetProductResponse> {
  return callApi<GetProductResponse>({
    method: "POST",
    endpoint: "products",
    requiresAuth: true,
    body: product,
  })
}

export async function EditProduct(id: number, product: ProductInput): Promise<GetProductResponse> {
  return callApi<GetProductResponse>({
    method: "PUT",
    endpoint: `products/${id}`,
    requiresAuth: true,
    body: product,
  })
}

export async function DeleteProduct(id: number): Promise<void> {
  await callApi<unknown>({
    method: "DELETE",
    endpoint: `products/${id}`,
    requiresAuth: true,
  })
}