import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GlobalHeader } from "@/components/global-header"
import { SmoothScrollProvider } from "@/components/ux/SmoothScrollProvider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })

export const metadata: Metadata = {
  title: "RLock vs Baseline — Real Contention, Live Results",
  description: "Conflict-aware lanes, OCC DAG execution, and ER for faster, cheaper settlement on Solana devnet.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-page text-text-high`}>
        <SmoothScrollProvider>
          <GlobalHeader />
          {children}
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
