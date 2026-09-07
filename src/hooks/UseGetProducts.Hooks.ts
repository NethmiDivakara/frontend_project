import { Products as getProducts } from "@/services/Products.Service"
import type { Products } from "@/types/ProductDetails"
import { useEffect, useState } from "react"

interface UseProductsResult {
    products: Products[]
    isLoading: boolean
    error: string | null
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Products[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isCurrent = true

        async function loadProducts() {
            setIsLoading(true)
            setError(null)

            try {
                const response = await getProducts()
                if (isCurrent) {
                    setProducts(response.data)
                }
            } catch (requestError) {
                if (isCurrent) {
                    setError(requestError instanceof Error ? requestError.message : "Unable to load products")
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false)
                }
            }
        }

        void loadProducts()
        return () => {
            isCurrent = false
        }
    }, [])

    return { products, isLoading, error }
}