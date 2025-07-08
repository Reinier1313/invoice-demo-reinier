
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  )
}
