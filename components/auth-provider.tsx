"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useOCAuth } from "@opencampus/ocid-connect-js"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: {
    address: string | null
    ocid: string | null
    role: "student" | "university" | null
  }
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: {
    address: null,
    ocid: null,
    role: null,
  },
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isInitialized, authState, ocAuth, OCId, ethAddress } = useOCAuth()
  const [userRole, setUserRole] = useState<"student" | "university" | null>(null)

  // Check if user is on a protected route
  const isProtectedRoute = pathname?.startsWith("/dashboard")

  // Handle authentication state changes
  useEffect(() => {
    if (!isInitialized) return

    // If authenticated, try to get user role from localStorage
    if (authState.isAuthenticated) {
      const storedRole = localStorage.getItem("userRole")
      if (storedRole === "student" || storedRole === "university") {
        setUserRole(storedRole)
      }
    } else {
      // If not authenticated and on protected route, redirect to login
      if (isProtectedRoute) {
        router.push("/login")
      }
    }
  }, [isInitialized, authState.isAuthenticated, isProtectedRoute, router])

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("userRole")

      // Logout from OCID
      await ocAuth.logout({ returnUrl: window.location.origin })

      // Redirect to home
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Set user role (called during login/signup)
  const setRole = (role: "student" | "university") => {
    setUserRole(role)
    localStorage.setItem("userRole", role)
  }

  const value = {
    isAuthenticated: isInitialized && authState.isAuthenticated,
    isLoading: !isInitialized || authState.isLoading,
    user: {
      address: ethAddress || null,
      ocid: OCId || null,
      role: userRole,
    },
    logout,
    setRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

