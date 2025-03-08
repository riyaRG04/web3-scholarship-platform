import { Check, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StudentApplicationDetails } from "@/components/student-application-details"

// Mock data for applications
const applications = [
  {
    id: 1,
    student: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "State University",
      major: "Computer Science",
      gpa: "3.8",
    },
    scholarship: "Engineering Excellence Scholarship",
    appliedDate: "May 15, 2025",
    status: "pending",
  },
  {
    id: 2,
    student: {
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "Tech Institute",
      major: "Electrical Engineering",
      gpa: "3.9",
    },
    scholarship: "Future Leaders Grant",
    appliedDate: "May 12, 2025",
    status: "pending",
  },
  {
    id: 3,
    student: {
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      university: "City College",
      major: "Computer Engineering",
      gpa: "3.7",
    },
    scholarship: "Diversity in Tech Scholarship",
    appliedDate: "May 10, 2025",
    status: "pending",
  },
]

export function UniversityApplicationList() {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={application.student.avatar} alt={application.student.name} />
                  <AvatarFallback>{application.student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{application.student.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {application.student.university} • {application.student.major}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">GPA: {application.student.gpa}</Badge>
                <Badge variant="secondary">{application.scholarship}</Badge>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Applied on {application.appliedDate}</div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Application Details</DialogTitle>
                      <DialogDescription>Review the student's application and documents</DialogDescription>
                    </DialogHeader>
                    <StudentApplicationDetails application={application} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="text-green-500 hover:text-green-500/80">
                  <Check className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-500/80">
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

