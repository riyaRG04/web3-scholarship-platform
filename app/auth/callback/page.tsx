"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginCallBack, useOCAuth } from "@opencampus/ocid-connect-js"
import { Shield } from "lucide-react"

function CustomLoadingComponent() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex items-center gap-2 font-bold text-xl mb-4">
        <Shield className="h-6 w-6 text-primary" />
        <span>ScholarChain</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  )
}

function CustomErrorComponent() {
  const { authState } = useOCAuth()
  const router = useRouter()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex items-center gap-2 font-bold text-xl mb-4">
        <Shield className="h-6 w-6 text-primary" />
        <span>ScholarChain</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-red-100 p-3">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-medium">Authentication Error</h2>
        <p className="mt-2 text-center text-muted-foreground">
          {authState.error?.message || "An error occurred during authentication"}
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default function CallbackPage() {
  const router = useRouter()
  const [redirectPath, setRedirectPath] = useState<string>("/")

  useEffect(() => {
    // Check if there's a stored redirect path
    const storedPath = localStorage.getItem("authRedirectPath")
    if (storedPath) {
      setRedirectPath(storedPath)
      localStorage.removeItem("authRedirectPath")
    }
  }, [])

  const handleLoginSuccess = () => {
    // Redirect to the stored path or default to dashboard
    router.push(redirectPath)
  }

  const handleLoginError = (error: any) => {
    console.error("Authentication error:", error)
    // Keep user on the callback page where the error component will show
  }

  return (
    <LoginCallBack
      successCallback={handleLoginSuccess}
      errorCallback={handleLoginError}
      customLoadingComponent={CustomLoadingComponent}
      customErrorComponent={CustomErrorComponent}
    />
  )
}

