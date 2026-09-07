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
import { useState } from "react"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

export function AddProductsForm(){
    const [stock, setStock] = useState(0)
    const isInStock = stock > 1

    return(
        <Dialog>
          <DialogTrigger render={<Button variant="destructive"> + Add products</Button>} />
          <DialogContent>
            <form>
            <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <DialogDescription>
            Add product details and necessary information 
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                placeholder="Enter product name"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="productCategory">Product Category</Label>
              <Input
                id="productCategory"
                name="productCategory"
                placeholder="Enter product category"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="sku">Stock keeping unit</Label>
              <Input
                id="sku"
                name="sku"
                placeholder="Enter SKU"
                required
              />
            </Field>

     
            <Field>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="Enter price"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="stock">Stock amount</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={stock}
                placeholder="Enter stock amount"
                onChange={(event) => setStock(Number(event.target.value) || 0)}
                required
              />
              <p className={isInStock ? "text-sm text-green-600" : "text-sm text-destructive"}>
                {isInStock ? "In stock" : "Currently unavailable"}
              </p>
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
            </form>
          </DialogContent>
    </Dialog>
  )
}
