"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GraduationCap, School, Shield } from "lucide-react"
import { useOCAuth } from "@opencampus/ocid-connect-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useAuth } from "@/components/auth-provider"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isInitialized, authState } = useOCAuth()
  const { isAuthenticated, user } = useAuth()

  const [role, setRole] = useState<"student" | "university">("student")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [ocid, setOcid] = useState("")
  const [universityName, setUniversityName] = useState("")
  const [universityId, setUniversityId] = useState("")

  // If already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user.role) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, user.role, router])

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "student" || roleParam === "university") {
      setRole(roleParam)
    }
  }, [searchParams])

  // Auto-fill OCID if available
  useEffect(() => {
    if (isInitialized && authState.isAuthenticated && user.ocid) {
      setOcid(user.ocid)
    }
  }, [isInitialized, authState.isAuthenticated, user.ocid])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isInitialized || !authState.isAuthenticated) {
      alert("Please connect with OCID first")
      return
    }

    // Store user role in localStorage
    localStorage.setItem("userRole", role)

    // In a real app, you would send this data to your backend
    // For now, we'll just redirect to the dashboard
    router.push(`/dashboard/${role}`)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex items-center justify-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>ScholarChain</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to access decentralized scholarships</p>
        </div>

        <Tabs defaultValue={role} onValueChange={(value) => setRole(value as "student" | "university")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="university" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              University
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Registration</CardTitle>
                <CardDescription>Create your student profile to apply for scholarships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <ConnectWalletButton />
                </div>

                {isInitialized && authState.isAuthenticated && (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ocid">OCID (Open Credentials ID)</Label>
                      <Input
                        id="ocid"
                        placeholder="ocid:12345678"
                        value={ocid}
                        onChange={(e) => setOcid(e.target.value)}
                        disabled={!!user.ocid}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Create Student Account
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="university">
            <Card>
              <CardHeader>
                <CardTitle>University Registration</CardTitle>
                <CardDescription>Register your institution to offer scholarships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <ConnectWalletButton />
                </div>

                {isInitialized && authState.isAuthenticated && (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="universityName">University Name</Label>
                      <Input
                        id="universityName"
                        placeholder="State University"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Official Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="universityId">Accreditation ID</Label>
                      <Input
                        id="universityId"
                        placeholder="ACC-12345678"
                        value={universityId}
                        onChange={(e) => setUniversityId(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Create University Account
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

