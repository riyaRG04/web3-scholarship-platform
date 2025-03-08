"use client"

import { useState } from "react"
import { Award, Calendar, Edit, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScholarshipForm } from "@/components/scholarship-form"
import { UniversityDashboardHeader } from "@/components/university-dashboard-header"

// Mock data for scholarships
const initialScholarships = [
  {
    id: 1,
    title: "Engineering Excellence Scholarship",
    amount: "$3,000",
    deadline: "June 30, 2025",
    eligibility: "Engineering students with GPA 3.5+",
    applicants: 18,
    awarded: 3,
    remaining: "$6,000",
    status: "active",
  },
  {
    id: 2,
    title: "Future Leaders Grant",
    amount: "$2,500",
    deadline: "July 15, 2025",
    eligibility: "Students with leadership experience",
    applicants: 12,
    awarded: 2,
    remaining: "$5,000",
    status: "active",
  },
  {
    id: 3,
    title: "Diversity in Tech Scholarship",
    amount: "$5,000",
    deadline: "August 1, 2025",
    eligibility: "Underrepresented students in tech",
    applicants: 8,
    awarded: 1,
    remaining: "$4,000",
    status: "active",
  },
  {
    id: 4,
    title: "Research Innovation Award",
    amount: "$4,000",
    deadline: "July 30, 2025",
    eligibility: "Students conducting original research",
    applicants: 4,
    awarded: 2,
    remaining: "$2,000",
    status: "active",
  },
  {
    id: 5,
    title: "Computer Science Merit Scholarship",
    amount: "$2,000",
    deadline: "May 15, 2025",
    eligibility: "Computer Science students with GPA 3.7+",
    applicants: 15,
    awarded: 5,
    remaining: "$0",
    status: "closed",
  },
]

export default function UniversityScholarshipsPage() {
  const [scholarships, setScholarships] = useState(initialScholarships)
  const [editingScholarship, setEditingScholarship] = useState<number | null>(null)

  const deleteScholarship = (id: number) => {
    setScholarships(scholarships.filter((scholarship) => scholarship.id !== id))
  }

  return (
    <div className="flex flex-col">
      <UniversityDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Manage Scholarships</h1>
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
        </div>

        <div className="grid gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className={scholarship.status === "closed" ? "opacity-70" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {scholarship.title}
                      {scholarship.status === "closed" && <Badge variant="secondary">Closed</Badge>}
                    </CardTitle>
                    <CardDescription>
                      {scholarship.amount} per recipient • Deadline: {scholarship.deadline}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Scholarship</DialogTitle>
                            <DialogDescription>Update the details of your scholarship program.</DialogDescription>
                          </DialogHeader>
                          <ScholarshipForm />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onSelect={() => deleteScholarship(scholarship.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Eligibility</div>
                    <div className="text-sm">{scholarship.eligibility}</div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{scholarship.applicants} Applicants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{scholarship.awarded} Awarded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Remaining: {scholarship.remaining}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Application Progress</div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(scholarship.awarded / scholarship.applicants) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{scholarship.awarded} awarded</span>
                      <span>{scholarship.applicants} total applications</span>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/dashboard/university/applications?scholarship=${scholarship.id}`}>
                          View Applications
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

