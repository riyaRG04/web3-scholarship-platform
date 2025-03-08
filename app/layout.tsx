import type React from "react"
import type { Metadata } from "next"
import OCConnectWrapper from "@/components/ocid-connect-wrapper"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "ScholarChain - Decentralized Scholarships",
  description: "Connect students with universities through blockchain-powered scholarships",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <OCConnectWrapper>{children}</OCConnectWrapper>
      </body>
    </html>
  )
}



import './globals.css'