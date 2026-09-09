import { useState } from "react"
import { CreateProduct } from "@/services/Products.Service"
import type { GetProductResponse, ProductInput } from "@/types/ProductDetails"

export function useAddProduct() {
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addProduct = async (product: ProductInput, thumbnailFile?: File | null): Promise<GetProductResponse> => {
    setIsAdding(true)
    setError(null)
    try {
      return await CreateProduct(product, thumbnailFile)
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unable to add product"
      setError(message)
      throw requestError
    } finally {
      setIsAdding(false)
    }
  }

  return { addProduct, isAdding, error }
}
