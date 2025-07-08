// app/login/page.tsx
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


export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Inside useEffect in /login/page.tsx and /register/page.tsx
useEffect(() => {
  const isLoggedIn = !!localStorage.getItem("authToken")
  if (isLoggedIn) {
    router.push("/invoice")
  }
}, [router])


  const handleLogin = () => {
    // Fake validation: check if any user is saved
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]")
const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem("authToken", "example-token")
      router.push("/invoice")
    } else {
      alert("Invalid email or password")
    }
  }

  // Inside useEffect in /login/page.tsx and /register/page.tsx
useEffect(() => {
  const isLoggedIn = !!localStorage.getItem("authToken")
  if (isLoggedIn) {
    router.push("/invoice")
  }
}, [router])


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>

           {/* Register Redirect */}
          <div className="text-center text-sm text-muted-foreground mt-2">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-primary hover:underline"
            >
              Register
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
