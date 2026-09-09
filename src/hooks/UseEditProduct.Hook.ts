import { useState } from "react"
import { EditProduct } from "@/services/Products.Service"
import type { GetProductResponse } from "@/types/ProductDetails"
import type { ProductInput } from '../types/ProductDetails';

export function useEditProduct() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProduct = async (id: number, product: ProductInput, thumbnailFile?: File | null): Promise<GetProductResponse> => {
    setIsUpdating(true)
    setError(null)
    try {
      return await EditProduct(id, product, thumbnailFile)
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unable to update product"
      setError(message)
      throw requestError
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateProduct, isUpdating, error }
}