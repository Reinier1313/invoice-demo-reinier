// app/invoices/[id]/edit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import ProtectedRoute from "@/components/protected-route"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

type Product = {
  name: string
  quantity: number
  price: number
  subtotal: number
}

type Invoice = {
  id: string
  number: string
  date: string
  customerName: string
  products: Product[]
  total: number
}

export default function EditInvoicePage() {
  const router = useRouter()
  const { id } = useParams()
  const [invoice, setInvoice] = useState<Invoice | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("invoices")
    const invoices: Invoice[] = stored ? JSON.parse(stored) : []
    const currentInvoice = invoices.find((inv) => inv.id === id)
    if (!currentInvoice) {
      alert("Invoice not found.")
      router.push("/invoice")
      return
    }
    setInvoice(currentInvoice)
  }, [id, router])

  const handleChange = (field: keyof Invoice, value: string) => {
    if (!invoice) return
    setInvoice({ ...invoice, [field]: value })
  }

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    if (!invoice) return
    const updated = [...invoice.products]
    const numericValue = field === "quantity" || field === "price" ? Number(value) : value
    updated[index] = {
      ...updated[index],
      [field]: numericValue,
    }
    updated[index].subtotal = updated[index].quantity * updated[index].price
    setInvoice({ ...invoice, products: updated })
  }

  const handleAddProduct = () => {
    if (!invoice) return
    const updated = [
      ...invoice.products,
      { name: "", quantity: 1, price: 0, subtotal: 0 },
    ]
    setInvoice({ ...invoice, products: updated })
  }

  const handleRemoveProduct = (index: number) => {
    if (!invoice) return
    const updated = [...invoice.products]
    updated.splice(index, 1)
    setInvoice({ ...invoice, products: updated })
  }

  const handleUpdate = () => {
    if (!invoice) return

    const total = invoice.products.reduce((sum, p) => sum + p.subtotal, 0)
    const updatedInvoice = { ...invoice, total }

    const stored = localStorage.getItem("invoices")
    const invoices: Invoice[] = stored ? JSON.parse(stored) : []

    const updated = invoices.map((inv) =>
      inv.id === invoice.id ? updatedInvoice : inv
    )

    localStorage.setItem("invoices", JSON.stringify(updated))
    router.push("/invoice")
  }

  if (!invoice) return null

  return (
    <ProtectedRoute>
      <>
        <Header />

        <div className="max-w-4xl mx-auto px-4 mb-4">
          <Button variant="outline" onClick={() => router.push("/invoices")}>
            ← Back to Invoices
          </Button>
        </div>

        <div className="p-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-center">✏️ Edit Invoice</h1>

          {/* Invoice Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Invoice Number</Label>
                  <Input
                    value={invoice.number}
                    onChange={(e) => handleChange("number", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Invoice Date</Label>
                  <Input
                    type="date"
                    value={invoice.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    value={invoice.customerName}
                    onChange={(e) => handleChange("customerName", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <Label className="text-lg font-medium">Products</Label>

              {invoice.products.map((product, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(e) =>
                        handleProductChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      min={0}
                      value={product.price}
                      onChange={(e) =>
                        handleProductChange(index, "price", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Subtotal</Label>
                    <Input value={product.subtotal.toLocaleString()} disabled />
                  </div>
                  <div className="md:col-span-4 text-right">
                    {invoice.products.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveProduct(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button onClick={handleAddProduct} variant="outline">
                ➕ Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Total and Save */}
          <div className="text-right space-y-2">
            <p className="text-lg font-semibold">
              Total: ₱
              {invoice.products
                .reduce((sum, p) => sum + p.subtotal, 0)
                .toLocaleString()}
            </p>
            <Button onClick={handleUpdate}>💾 Update Invoice</Button>
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}
