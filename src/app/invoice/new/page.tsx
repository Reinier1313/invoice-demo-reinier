"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import ProtectedRoute from "@/components/protected-route"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

type Product = {
  name: string
  quantity: string // use string for flexible input
  price: string
  subtotal: number
}

export default function NewInvoicePage() {
  const router = useRouter()

  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [products, setProducts] = useState<Product[]>([
    { name: "", quantity: "1", price: "0", subtotal: 0 },
  ])

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const updated = [...products]
    const product = { ...updated[index], [field]: value }

    const quantity = parseFloat(product.quantity)
    const price = parseFloat(product.price)

    product.subtotal = !isNaN(quantity) && !isNaN(price) ? quantity * price : 0
    updated[index] = product

    setProducts(updated)
  }

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: "1", price: "0", subtotal: 0 }])
  }

  const handleRemoveProduct = (index: number) => {
    const updated = [...products]
    updated.splice(index, 1)
    setProducts(updated)
  }

  const totalAmount = products.reduce((sum, product) => sum + product.subtotal, 0)

  const handleSubmit = () => {
    if (!invoiceNumber || !invoiceDate || !customerName || products.length === 0) {
      alert("Please complete all required fields.")
      return
    }

    const parsedProducts = products.map((p) => ({
      name: p.name,
      quantity: parseFloat(p.quantity),
      price: parseFloat(p.price),
      subtotal: p.subtotal,
    }))

    const newInvoice = {
      id: uuidv4(),
      number: invoiceNumber,
      date: invoiceDate,
      customerName,
      products: parsedProducts,
      total: totalAmount,
    }

    const stored = localStorage.getItem("invoices")
    const existing = stored ? JSON.parse(stored) : []
    const updated = [...existing, newInvoice]

    localStorage.setItem("invoices", JSON.stringify(updated))
    router.push("/invoice") // ✅ fixed typo
  }

  return (
    <ProtectedRoute>
      <>
        <Header />

        <div className="max-w-4xl mx-auto px-4 mt-5">
          <Button variant="outline" onClick={() => router.push("/invoice")}>
            ← Back to Invoices
          </Button>
        </div>

        <div className="p-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-center">🧾 Create New Invoice</h1>

          {/* Invoice Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Invoice Number</Label>
                  <Input
                    placeholder="INV-0001"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Invoice Date</Label>
                  <Input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <Label className="text-lg font-medium">Products</Label>

              {products.map((product, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      placeholder="e.g. Mouse"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min={0}
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      min={0}
                      value={product.price}
                      onChange={(e) => handleProductChange(index, "price", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Subtotal</Label>
                    <Input value={product.subtotal.toLocaleString()} disabled />
                  </div>
                  <div className="md:col-span-4 text-right">
                    {products.length > 1 && (
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveProduct(index)}>
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

          {/* Total and Submit */}
          <div className="text-right space-y-2">
            <p className="text-lg font-semibold">
              Total: ₱{totalAmount.toLocaleString()}
            </p>
            <Button onClick={handleSubmit}>✅ Save Invoice</Button>
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}
