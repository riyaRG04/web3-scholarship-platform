import type React from "react"

import { UniversityDashboardSidebar } from "@/components/university-dashboard-sidebar"

export default function UniversityDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check would go here in a real app
  // For now, we'll rely on the client-side auth provider

  return (
    <div className="flex min-h-screen">
      <UniversityDashboardSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

