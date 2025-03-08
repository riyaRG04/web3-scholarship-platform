import type React from "react"
import { AuthProvider } from "@/components/auth-provider"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}

