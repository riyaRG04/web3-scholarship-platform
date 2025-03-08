"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, FileText, GraduationCap, Home, LogOut, Search, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

export function StudentDashboardSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: Home,
    },
    {
      title: "Profile",
      href: "/dashboard/student/profile",
      icon: User,
    },
    {
      title: "Documents",
      href: "/dashboard/student/documents",
      icon: FileText,
    },
    {
      title: "Scholarships",
      href: "/dashboard/student/scholarships",
      icon: Search,
    },
    {
      title: "Applications",
      href: "/dashboard/student/applications",
      icon: GraduationCap,
    },
    {
      title: "Notifications",
      href: "/dashboard/student/notifications",
      icon: Bell,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/dashboard/student" className="flex items-center gap-2 font-bold">
            <Shield className="h-6 w-6 text-primary" />
            <span>ScholarChain</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

