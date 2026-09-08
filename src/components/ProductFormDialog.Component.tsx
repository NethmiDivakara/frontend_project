import { useState, type ChangeEvent, type ReactElement } from "react"
import type { Products, ProductInput } from "@/types/ProductDetails"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

type ProductFormValues = {
  categoryId: string
  name: string
  description: string
  price: string
  comparePrice: string
  stockQuantity: string
  status: string
  isFeatured: boolean
  thumbnail: string
}

const emptyValues: ProductFormValues = {
  categoryId: "",
  name: "",
  description: "",
  price: "",
  comparePrice: "",
  stockQuantity: "0",
  status: "active",
  isFeatured: false,
  thumbnail: "",
}

function productToValues(product?: Products): ProductFormValues {
  if (!product) return emptyValues

  return {
    categoryId: String(product.category_id),
    name: product.name,
    description: product.description,
    price: String(product.price),
    comparePrice: product.compare_price == null ? "" : String(product.compare_price),
    stockQuantity: String(product.stock_quantity),
    status: product.status,
    isFeatured: product.is_featured,
    thumbnail: product.thumbnail,
  }
}

function valuesToProduct(values: ProductFormValues): ProductInput {
  return {
    category_id: Number(values.categoryId),
    name: values.name,
    description: values.description,
    price: Number(values.price),
    compare_price: values.comparePrice ? Number(values.comparePrice) : null,
    stock_quantity: Number(values.stockQuantity),
    status: values.status,
    is_featured: values.isFeatured,
  }
}

function ProductFields({
  values,
  readOnly,
  onChange,
}: {
  values: ProductFormValues
  readOnly: boolean
  onChange: (field: keyof ProductFormValues, value: string | boolean) => void
}) {
  const update = (field: keyof ProductFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => onChange(field, event.target.value)

  return (
    <FieldGroup>
      <Field>
        <Label htmlFor="product-name">Product Name</Label>
        <Input id="product-name" value={values.name} onChange={update("name")} readOnly={readOnly} required={!readOnly} placeholder="Enter product name" />
      </Field>
      <Field>
        <Label htmlFor="category-id">Category ID</Label>
        <select
          id="category-id"
          value={values.categoryId}
          onChange={(event) => onChange("categoryId", event.target.value)}
          disabled={readOnly}
          required={!readOnly}
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Select category</option>
          <option value="1">Electronics &amp; Gadgets</option>
          <option value="2">Fashion &amp; Apparel</option>
          <option value="3">Home &amp; Living</option>
          <option value="4">Sports &amp; Fitness</option>
        </select>
      </Field>
  
    <Field>
      <Label htmlFor="description">Description</Label>
      <Input id="description" value={values.description} onChange={update("description")} readOnly={readOnly} required={!readOnly} placeholder="Enter product description" />
    
      </Field>  
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" min="0" step="0.01" value={values.price} onChange={update("price")} readOnly={readOnly} required={!readOnly} placeholder="Enter price" />
        </Field>
        <Field>
          <Label htmlFor="compare-price">Compare price</Label>
          <Input id="compare-price" type="number" min="0" step="0.01" value={values.comparePrice} onChange={update("comparePrice")} readOnly={readOnly} placeholder="Enter compare price" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field>
          <Label htmlFor="stock-quantity">Stock quantity</Label>
          <Input id="stock-quantity" type="number" min="0" value={values.stockQuantity} onChange={update("stockQuantity")} readOnly={readOnly} required={!readOnly} placeholder="Enter stock quantity" />
          <p className={Number(values.stockQuantity) > 1 ? "text-sm text-green-600" : "text-sm text-destructive"}>
            {Number(values.stockQuantity) > 1 ? "In stock" : "Currently unavailable"}
          </p>
        </Field>
        <Field>
          <Label htmlFor="status">Status</Label>
          <Input id="status" value={values.status} onChange={update("status")} readOnly={readOnly} required={!readOnly} />
        </Field>
      </div>
      <Field>
        <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
        <Input id="thumbnail" value={values.thumbnail} onChange={update("thumbnail")} readOnly={readOnly} placeholder="Enter thumbnail URL (optional)" />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={values.isFeatured} onCheckedChange={(checked) => onChange("isFeatured", checked === true)} disabled={readOnly} />
        Featured product
      </label>
    </FieldGroup>
  )
}

export function ProductFormDialog({
  product,
  mode,
  trigger,
  onSave,
}: {
  product?: Products
  mode: "add" | "view" | "edit"
  trigger: ReactElement
  onSave?: (product: ProductInput) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState(() => productToValues(product))
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const readOnly = mode === "view"
  const updateValue = (field: keyof ProductFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!onSave) return

    const price = Number(values.price)
    const comparePrice = values.comparePrice ? Number(values.comparePrice) : null
    if (comparePrice !== null && comparePrice < price) {
      setSaveError("Compare price cannot be lower than the product price.")
      return
    }

    setIsSaving(true)
    setSaveError(null)
    try {
      await onSave(valuesToProduct(values))
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        setSaveError(error.message)
      } else if (error && typeof error === "object" && "message" in error) {
        setSaveError(String(error.message))
      } else {
        setSaveError("Unable to save product")
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{mode === "add" ? "Add product" : mode === "view" ? "View product" : "Edit product"}</DialogTitle>
            <DialogDescription>
                {mode === "add" ? "Add product details. A thumbnail is optional." : `Product details for ${product?.name ?? "this product"}.`}
            </DialogDescription>
          </DialogHeader>
          <ProductFields values={values} readOnly={readOnly} onChange={updateValue} />
          {saveError && <p className="text-sm text-destructive">{saveError}</p>}
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{mode === "view" ? "Close" : "Cancel"}</Button>} />
            {!readOnly && <Button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : "Save changes"}</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}