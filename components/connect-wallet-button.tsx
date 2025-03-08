"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"
import { useOCAuth } from "@opencampus/ocid-connect-js"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ConnectWalletButtonProps {
  onConnect?: (address: string, ocid?: string) => void
  redirectAfterLogin?: boolean
  redirectPath?: string
}

export function ConnectWalletButton({
  onConnect,
  redirectAfterLogin = false,
  redirectPath = "/dashboard/student",
}: ConnectWalletButtonProps) {
  const router = useRouter()
  const { isInitialized, authState, ocAuth, OCId, ethAddress } = useOCAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  // Handle successful connection
  useEffect(() => {
    if (isInitialized && authState.isAuthenticated && ethAddress) {
      if (onConnect) {
        onConnect(ethAddress, OCId)
      }

      if (redirectAfterLogin) {
        router.push(redirectPath)
      }
    }
  }, [isInitialized, authState.isAuthenticated, ethAddress, OCId, onConnect, redirectAfterLogin, redirectPath, router])

  const connectWallet = async () => {
    try {
      setIsConnecting(true)

      // Store the current path for redirect after authentication
      if (redirectAfterLogin && typeof window !== "undefined") {
        localStorage.setItem("authRedirectPath", redirectPath)
      }

      // Initiate OCID authentication flow
      await ocAuth.signInWithRedirect({
        state: "scholarchain",
      })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setIsConnecting(false)
    }
  }

  // Show loading state while SDK initializes
  if (!isInitialized) {
    return (
      <div className="w-full">
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  // If authenticated, show connected state
  if (authState.isAuthenticated && ethAddress) {
    return (
      <div className="flex items-center justify-between rounded-md border p-2 w-full">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Connected</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {ethAddress.substring(0, 6)}...{ethAddress.substring(ethAddress.length - 4)}
        </div>
      </div>
    )
  }

  // Otherwise show connect button
  return (
    <div className="w-full">
      <Button onClick={connectWallet} disabled={isConnecting} className="w-full" variant="outline">
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect with OCID"}
      </Button>
    </div>
  )
}

