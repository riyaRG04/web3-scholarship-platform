"use client"

import type { ReactNode } from "react"
import { OCConnect } from "@opencampus/ocid-connect-js"

interface OCConnectWrapperProps {
  children: ReactNode
  sandboxMode?: boolean
}

export default function OCConnectWrapper({ children, sandboxMode = true }: OCConnectWrapperProps) {
  const opts = {
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
    referralCode: "SCHOLARCHAIN", // Replace with your partner code
    domain: "", // Leave blank to use current domain
    sameSite: true, // Use strict SameSite
  }

  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  )
}

