// app/invoices/page.tsx
import ProtectedRoute from "@/components/protected-route"
import LogoutButton from "@/components/logoutbutton"

export default function InvoicesPage() {
  return (
    <ProtectedRoute>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <LogoutButton />
      </div>
      {/* You can add your invoice list/table here */}
    </ProtectedRoute>
  )
}
