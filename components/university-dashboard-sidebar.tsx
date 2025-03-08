"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Award, Bell, FileText, Home, LogOut, School, Shield, User } from "lucide-react"

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

export function UniversityDashboardSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard/university",
      icon: Home,
    },
    {
      title: "Profile",
      href: "/dashboard/university/profile",
      icon: User,
    },
    {
      title: "Scholarships",
      href: "/dashboard/university/scholarships",
      icon: School,
    },
    {
      title: "Applications",
      href: "/dashboard/university/applications",
      icon: FileText,
    },
    {
      title: "Awards",
      href: "/dashboard/university/awards",
      icon: Award,
    },
    {
      title: "Notifications",
      href: "/dashboard/university/notifications",
      icon: Bell,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/dashboard/university" className="flex items-center gap-2 font-bold">
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

