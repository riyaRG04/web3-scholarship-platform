"use client"

import { useState } from "react"
import { Shield, User } from "lucide-react"
import { useOCAuth } from "@opencampus/ocid-connect-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { UniversityDashboardHeader } from "@/components/university-dashboard-header"

export default function UniversityProfilePage() {
  const { isInitialized, OCId, ethAddress } = useOCAuth()

  const [name, setName] = useState("State University")
  const [email, setEmail] = useState("admin@stateuniversity.edu")
  const [website, setWebsite] = useState("https://stateuniversity.edu")
  const [accreditationId, setAccreditationId] = useState("ACC-12345678")
  const [description, setDescription] = useState(
    "State University is a leading institution dedicated to academic excellence and innovation in research.",
  )

  return (
    <div className="flex flex-col">
      <UniversityDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">University Profile</h1>
          <Button>Save Changes</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>Update your university details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">University Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accreditationId">Accreditation ID</Label>
                <Input
                  id="accreditationId"
                  value={accreditationId}
                  onChange={(e) => setAccreditationId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
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
                <p>Your university's OCID is securely connected to your wallet and verified by Open Campus.</p>
                <p className="mt-2">
                  This information is used to verify your institution when creating scholarships and disbursing funds.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

