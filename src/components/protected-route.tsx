// components/auth/ProtectedRoute.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("authToken")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  return <>{children}</>
}
