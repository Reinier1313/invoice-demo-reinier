// app/register/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type User = {
  email: string
  password: string
}


export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    // Redirect if already logged in
    if (typeof window !== "undefined" && localStorage.getItem("authToken")) {
      router.push("/invoices")
    }
  }, [router])

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required.")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.")
      return
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
const existingUser = users.find((u) => u.email === email)


    if (existingUser) {
      alert("User already exists.")
      return
    }

    const updatedUsers = [...users, { email, password }]
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    alert("Registration successful. You can now log in.")
    router.push("/login")
  }

  // Inside useEffect in /login/page.tsx and /register/page.tsx
useEffect(() => {
  const isLoggedIn = !!localStorage.getItem("authToken")
  if (isLoggedIn) {
    router.push("/invoices")
  }
}, [router])


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleRegister} className="w-full">
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
