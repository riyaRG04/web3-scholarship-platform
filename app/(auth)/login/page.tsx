"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import { useOCAuth } from "@opencampus/ocid-connect-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { isInitialized, authState } = useOCAuth()
  const { isAuthenticated, user } = useAuth()

  // If already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user.role) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, user.role, router])

  const handleRoleSelection = (role: "student" | "university") => {
    // Store selected role in localStorage
    localStorage.setItem("userRole", role)

    // Redirect to appropriate dashboard
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
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Log in to access your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Connect with OCID to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ConnectWalletButton />

            {isInitialized && authState.isAuthenticated && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Select your role</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => handleRoleSelection("student")} className="w-full">
                    Student
                  </Button>
                  <Button onClick={() => handleRoleSelection("university")} className="w-full" variant="outline">
                    University
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

