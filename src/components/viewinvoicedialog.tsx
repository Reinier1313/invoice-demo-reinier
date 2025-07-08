"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

export default function ViewInvoiceDialog({ invoice }: { invoice: Invoice }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">👁️ View More</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p><strong>Invoice #:</strong> {invoice.number}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Customer:</strong> {invoice.customerName}</p>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Products:</h3>
            <table className="w-full text-sm border">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-right">Qty</th>
                  <th className="p-2 text-right">Price</th>
                  <th className="p-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {invoice.products.map((p, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2 text-right">{p.quantity}</td>
                    <td className="p-2 text-right">₱{p.price.toLocaleString()}</td>
                    <td className="p-2 text-right">₱{p.subtotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right font-semibold mt-4">
            Total: ₱{invoice.total.toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
