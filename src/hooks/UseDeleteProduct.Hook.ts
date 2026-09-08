import { useState } from "react"
import { DeleteProduct } from "@/services/Products.Service"

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteProduct = async (id: number): Promise<void> => {
    setIsDeleting(true)
    setError(null)
    try {
      await DeleteProduct(id)
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unable to delete product"
      setError(message)
      throw requestError
    } finally {
      setIsDeleting(false)
    }
  }

  return { deleteProduct, isDeleting, error }
}
