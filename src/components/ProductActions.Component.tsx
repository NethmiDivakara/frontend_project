import { Eye, Pencil, Trash } from "lucide-react"
import type { Products } from "@/types/ProductDetails"
import { Button } from "./ui/button"
import { ProductFormDialog } from "./ProductFormDialog.Component"
import { toast } from "react-toastify"
import { useAddProduct } from "@/hooks/UseCreateProduct.Hook"
import { useEditProduct } from "@/hooks/UseEditProduct.Hook"
import { useDeleteProduct } from "@/hooks/UseDeleteProduct.Hook"

export function ProductActions({ product, onSaved }: { product: Products; onSaved: () => Promise<void> }) {
  const { addProduct } = useAddProduct()
  const { updateProduct } = useEditProduct()
  const { deleteProduct } = useDeleteProduct()

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${product.name}?`)) return
    await deleteProduct(product.id)
    await onSaved()

    toast.info(
      <div className="flex items-center gap-3">
        <span>Product deleted.</span>
        <button
          type="button"
          className="font-semibold underline"
          onClick={async () => {
            try {
              await addProduct({
                category_id: product.category_id,
                name: product.name,
                description: product.description,
                price: product.price,
                compare_price: product.compare_price,
                stock_quantity: product.stock_quantity,
                status: product.status,
                is_featured: product.is_featured,
              })
              await onSaved()
              toast.success("Product restored.")
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Unable to restore product.")
            }
          }}
        >
          Undo
        </button>
      </div>,
      { autoClose: 20000 },
    )
  }

  return (
    <div className="flex justify-end gap-2">
      <ProductFormDialog
        product={product}
        mode="view"
        trigger={
          <Button variant="outline" size="sm">
            <Eye className="size-4" />
            View
          </Button>
        }
      />
      <ProductFormDialog
        product={product}
        mode="edit"
        onSave={async (values) => {
          await updateProduct(product.id, values)
          await onSaved()
        }}
        trigger={
          <Button variant="outline" size="sm">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        <Trash className="size-4" />
        Delete
      </Button>
    </div>
  )
}