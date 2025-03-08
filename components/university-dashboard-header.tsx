"use client"

import { Bell, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScholarshipForm } from "@/components/scholarship-form"
import { UserAccountNav } from "@/components/user-account-nav"

export function UniversityDashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">University Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Scholarship
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Scholarship</DialogTitle>
                <DialogDescription>
                  Define the details and requirements for your new scholarship program.
                </DialogDescription>
              </DialogHeader>
              <ScholarshipForm />
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <UserAccountNav />
        </div>
      </div>
    </header>
  )
}

