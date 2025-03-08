"use client"

import { useState } from "react"
import { Shield, User } from "lucide-react"
import { useOCAuth } from "@opencampus/ocid-connect-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { StudentDashboardHeader } from "@/components/student-dashboard-header"
import { useAuth } from "@/components/auth-provider"

export default function StudentProfilePage() {
  const { isInitialized, OCId, ethAddress } = useOCAuth()
  const { user } = useAuth()

  const [name, setName] = useState("Alex Johnson")
  const [email, setEmail] = useState("alex@example.com")
  const [university, setUniversity] = useState("State University")
  const [major, setMajor] = useState("Computer Science")
  const [graduationYear, setGraduationYear] = useState("2026")

  return (
    <div className="flex flex-col">
      <StudentDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Your Profile</h1>
          <Button>Save Changes</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OCID Information</CardTitle>
              <CardDescription>Your Open Campus ID and connected wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Open Campus ID</div>
                    <div className="text-sm text-muted-foreground break-all">
                      {isInitialized && OCId ? OCId : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Connected Wallet</div>
                    <div className="text-sm text-muted-foreground break-all">
                      {isInitialized && ethAddress ? ethAddress : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <p>Your OCID is securely connected to your wallet and verified by Open Campus.</p>
                <p className="mt-2">This information is used to verify your identity when applying for scholarships.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

