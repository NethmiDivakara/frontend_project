import { Products as getProducts } from "@/services/Products.Service"
import type { ProductQuery, Products } from "@/types/ProductDetails"
import { useEffect, useState } from "react"

interface UseProductsResult {
    products: Products[]
    isLoading: boolean
    error: string | null
    reload: () => void
    totalPages: number
}

export function useProducts(query: ProductQuery = {}): UseProductsResult {
    const [products, setProducts] = useState<Products[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [reloadKey, setReloadKey] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        let isCurrent = true

        async function loadProducts() {
            setIsLoading(true)
            setError(null)

            try {
                let response = await getProducts(query)
                if (query.search && response.data.length === 0) {
                    response = await getProducts({
                        ...query,
                        search: undefined,
                        per_page: 100,
                        page: 1,
                    })
                    const normalizedSearch = query.search.toLowerCase()
                    response = {
                        ...response,
                        data: response.data.filter((product) =>
                            product.name.toLowerCase().includes(normalizedSearch),
                        ),
                    }
                }
                if (isCurrent) {
                    setProducts(response.data)
                    setTotalPages(response.meta?.pagination?.total_pages ?? 1)
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
    }, [reloadKey, query.page, query.search, query.per_page, query.category_id, query.min_price, query.max_price, query.sort_by, query.sort_order])

    return { products, isLoading, error, totalPages, reload: () => setReloadKey((value) => value + 1) }
}