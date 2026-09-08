import { Button } from "./ui/button"
import { ProductFormDialog } from "./ProductFormDialog.Component"
import type { ProductInput } from "@/types/ProductDetails"
import { useAddProduct } from "@/hooks/UseCreateProduct.Hook"

export function AddProductsButton({ onSaved }: { onSaved: (product: ProductInput) => Promise<void> }) {
  const { addProduct } = useAddProduct()

  return (
    <ProductFormDialog
      mode="add"
      trigger={<Button className="cursor-pointer bg-green-500 text-white hover:bg-green-600">
        + Add products</Button>}
      onSave={async (product) => {
        await addProduct(product)
        await onSaved(product)
      }}
    />
  )
}