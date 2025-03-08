"use client"

import { useState } from "react"
import { Bell, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { StudentChatbot } from "@/components/student-chatbot"
import { UserAccountNav } from "@/components/user-account-nav"

export function StudentDashboardHeader() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="hidden md:flex md:flex-1">
          <form className="w-full max-w-lg">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search scholarships..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Sheet open={chatbotOpen} onOpenChange={setChatbotOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Support</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>ScholarChain Support</SheetTitle>
                <SheetDescription>Ask any questions about scholarships or the platform</SheetDescription>
              </SheetHeader>
              <StudentChatbot />
            </SheetContent>
          </Sheet>
          <UserAccountNav />
        </div>
      </div>
    </header>
  )
}

