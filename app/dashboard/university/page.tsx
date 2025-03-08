import { Award, Clock, FileText, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UniversityDashboardHeader } from "@/components/university-dashboard-header"
import { UniversityApplicationList } from "@/components/university-application-list"

export default function UniversityDashboardPage() {
  return (
    <div className="flex flex-col">
      <UniversityDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Scholarships</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">$25,000 total funding</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awarded Scholarships</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">$15,000 disbursed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">From 15 institutions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Review and manage recent scholarship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <UniversityApplicationList />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Scholarship Performance</CardTitle>
              <CardDescription>Application statistics for your scholarships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Engineering Excellence Scholarship",
                    applications: 18,
                    awarded: 3,
                    remaining: "$6,000",
                  },
                  {
                    name: "Future Leaders Grant",
                    applications: 12,
                    awarded: 2,
                    remaining: "$5,000",
                  },
                  {
                    name: "Diversity in Tech Scholarship",
                    applications: 8,
                    awarded: 1,
                    remaining: "$4,000",
                  },
                  {
                    name: "Research Innovation Award",
                    applications: 4,
                    awarded: 2,
                    remaining: "$2,000",
                  },
                ].map((scholarship) => (
                  <div key={scholarship.name} className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{scholarship.name}</span>
                      <span className="text-sm text-muted-foreground">{scholarship.applications} applications</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(scholarship.awarded / scholarship.applications) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{scholarship.awarded} awarded</span>
                      <span>Remaining: {scholarship.remaining}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

