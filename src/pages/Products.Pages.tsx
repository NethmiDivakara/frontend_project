import { useState,useCallback,useRef } from "react"
import { PackageSearch } from "lucide-react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useProducts } from "@/hooks/UseGetProducts.Hooks"
import { AddProductsButton } from "@/components/AddProductsButtonComponent"
import { ProductActions } from "@/components/ProductActions.Component"
import { DebouncedSearch } from "@/components/DebouncedSearch.Component"
import { CreateProduct } from "@/services/Products.Service"
import type { ProductInput } from '../types/ProductDetails'


const ProductsPerPage = 6

export function ProductsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const previousSearchRef = useRef("")

  const { products, isLoading, error, reload } = useProducts({
    sort_by: "price",
    sort_order: "asc",
  })

    const handleSearch = useCallback((value:string) => {
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
           
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text)]">Products ({visibleProducts.length})</h2>
            <p className="mt-2 text-sm text-[var(--muted-text)]">Browse and manage your product catalog.</p>
          </div>
          
          <DebouncedSearch onSearch={handleSearch} />
        </div>
 

        <div className="flex justify-end">
          <AddProductsButton onSaved={async (product: ProductInput) => { await CreateProduct(product); reload() }} />
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
          
        <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Compare Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                   <TableHead className="text-center">is_featured</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow> 
              </TableHeader>
              <TableBody>

                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex min-w-52 items-center gap-3">
                        {product.thumbnail_url ? (
                          <img
                            src={product.thumbnail_url}
                            alt="product image"
                            className="size-11 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex size-11 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <PackageSearch className="size-5" />
                          </div>
                        )}
                        
                        <span className="font-medium text-[var(--text)]">{product.name}</span>
                      </div>

                     
                    </TableCell>
                    <TableCell>{product.category?.name ?? "Uncategorized"}</TableCell>
                    <TableCell className="font-mono text-xs">{truncate(product.description, 40)}</TableCell>
                    <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">{product.compare_price?.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock_quantity}</TableCell>
                    <TableCell className="text-right">{product.is_featured ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {product.in_stock 
                        ? "In stock" 
                        : "Out of stock"}
                      </span>
                    </TableCell>
                    <TableCell>

                      <ProductActions product={product} onSaved={async () => reload()} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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