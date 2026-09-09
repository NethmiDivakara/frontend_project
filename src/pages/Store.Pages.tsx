import { useState, useCallback, useRef } from "react"
import { PackageSearch } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useProducts } from "@/hooks/UseGetProducts.Hooks"
import { DebouncedSearch } from "@/components/DebouncedSearch.Component"

const ProductsPerPage = 8

export function StorePage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const previousSearchRef = useRef("")

  const { products, isLoading, error } = useProducts({
    sort_by: "price",
    sort_order: "asc",
  })

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    if (value !== previousSearchRef.current) {
      setPage(1)
    }
    previousSearchRef.current = value
  }, [])

  const visibleProducts = products.filter((product) =>
    !search || product.name.toLowerCase().startsWith(search.toLowerCase())
  )

  const totalPages = Math.ceil(visibleProducts.length / ProductsPerPage)
  const paginatedProducts = visibleProducts.slice(
    (page - 1) * ProductsPerPage,
    page * ProductsPerPage,
  )

  function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <section className="flex-1 bg-[var(--bg)] px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)]">Add to Cart ({visibleProducts.length})</h2>
            <p className="mt-2 text-sm text-[var(--muted-text)]">Add products to cart </p>
          </div>

          <DebouncedSearch onSearch={handleSearch} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
            Loading products...
          </div>
        )}

        {!isLoading && error && (
          <Card className="border-destructive/30">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <PackageSearch className="size-10 text-destructive" />
              <div>
                <p className="font-medium">Could not load products</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && visibleProducts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
              <PackageSearch className="size-10 text-muted-foreground" />
              <p className="font-medium">No products found</p>
              <p className="text-sm text-muted-foreground">Try a different search term.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && visibleProducts.length > 0 && (
          <div className="grid grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden rounded-2xl border-none shadow-sm">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex h-40 w-full items-center justify-center rounded-xl bg-muted">
                    {product.thumbnail_url ? (
                      <img
                        src={product.thumbnail_url}
                        alt={product.name}
                        className="h-32 w-32 object-cover"
                      />
                    ) : (
                      <PackageSearch className="size-8 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[var(--text)]">{product.name}</p>
                      </div>
                      <div>
                      <p className="text-red-600">${product.price.toFixed(2)}</p>
                      </div>
                    
                    <p className="mt-1 text-sm text-muted-foreground">
                      {truncate(product.description, 40)}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                    {product.in_stock ? "In stock" : "Out of stock"}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && visibleProducts.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((currentPage) => Math.max(1, currentPage - 1))
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={(event) => {
                      event.preventDefault()
                      setPage(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((currentPage) => Math.min(totalPages, currentPage + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  )
}