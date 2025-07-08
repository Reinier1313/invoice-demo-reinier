// components/layout/Header.tsx
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type User = {
  email: string
  password: string
}


export default function Header() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  useEffect(() => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
  const token = localStorage.getItem("authToken")

  // simulate first logged-in user (in real apps you'd store a user ID/token)
  const currentUser = token ? users[0] : null

  if (currentUser) {
    setEmail(currentUser.email)
  }
}, [])


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/login")
  }
  return (
    <header className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 border-b bg-background">
      <div className="text-lg font-semibold">🧾 Invoicer</div>

     
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {email || "User"}</span>
        <Button size="sm" variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
