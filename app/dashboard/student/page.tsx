import { Award, BookOpen, Clock, FileCheck } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentDashboardHeader } from "@/components/student-dashboard-header"
import { StudentScholarshipList } from "@/components/student-scholarship-list"

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col">
      <StudentDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Documents</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">All documents verified</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awarded Scholarships</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">$5,000 total awarded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligible Scholarships</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Based on your profile</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recommended Scholarships</CardTitle>
              <CardDescription>Scholarships that match your profile and academic achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentScholarshipList />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Track your scholarship application progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pt-1 pb-8">
                    <p className="mb-2 text-lg font-semibold">Application Submitted</p>
                    <p className="text-muted-foreground">Engineering Excellence Scholarship - May 15, 2025</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pt-1 pb-8">
                    <p className="mb-2 text-lg font-semibold">Documents Verified</p>
                    <p className="text-muted-foreground">All documents verified - May 20, 2025</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                      3
                    </div>
                    <div className="w-px h-full bg-border"></div>
                  </div>
                  <div className="pt-1 pb-8">
                    <p className="mb-2 text-lg font-semibold">Under Review</p>
                    <p className="text-muted-foreground">Application is being reviewed by the university</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground">
                      4
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="mb-2 text-lg font-semibold">Decision</p>
                    <p className="text-muted-foreground">Expected by June 15, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

