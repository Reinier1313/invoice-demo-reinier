// app/invoices/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ViewInvoiceDialog from "@/components/viewinvoicedialog"


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

export default function InvoiceDashboardPage() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("invoices")
    if (stored) {
      setInvoices(JSON.parse(stored))
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = invoices.filter((invoice) => invoice.id !== id)
    setInvoices(updated)
    localStorage.setItem("invoices", JSON.stringify(updated))
  }

  return (
    <ProtectedRoute>
      <>
        <Header />

        <div className="p-4 space-y-6">
          {/* Dashboard Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome to the Invoicing Dashboard</h1>
            <p className="text-muted-foreground">
              Use this system to create, manage, and review invoices easily.
            </p>
          </div>

          {/* Navigation Buttons (on main page, not header) */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button onClick={() => router.push("/invoice/new")}>➕ New Invoice</Button>
          </div>

          {/* Invoice List */}
          <div className="space-y-4">
            {invoices.length === 0 ? (
              <p className="text-muted-foreground text-center">No invoices found.</p>
            ) : (
              invoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{invoice.number}</span>
                      <span className="text-sm text-muted-foreground">{invoice.date}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Customer:</strong> {invoice.customerName}</p>
                    <p><strong>Total:</strong> ₱{invoice.total.toLocaleString()}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
  <ViewInvoiceDialog invoice={invoice} />
  <Button size="sm" onClick={() => router.push(`/invoice/${invoice.id}/edit`)}>
    Edit
  </Button>
  <Button variant="destructive" size="sm" onClick={() => handleDelete(invoice.id)}>
    Delete
  </Button>
</div>

                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </>
    </ProtectedRoute>
  )
}
