import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono, Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GlobalHeader } from "@/components/global-header"
import { SmoothScrollProvider } from "@/components/ux/SmoothScrollProvider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "RLock — Parallel Solana Execution SDK ",
  description: "Conflict-aware lanes, OCC DAG execution, and ephemeral rollups for faster, cheaper settlement on Solana.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${orbitron.variable}`}>
      <head>
        {/* Google Search Console verification - pasted as requested */}
        <meta name="google-site-verification" content="9xu7gy_LabP07ylY7T_T8uxdawyjWzNpsj2RO8Hgk10" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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
