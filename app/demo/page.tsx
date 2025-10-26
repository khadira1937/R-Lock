"use client"

import { useState } from "react"
import { ControlsBar } from "@/components/controls-bar"
import { ComparisonSection } from "@/components/comparison-section"
import { FooterSection } from "@/components/footer-section"

export default function DemoPage() {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(!isRunning)
  }

  return (
    <main className="relative min-h-screen bg-page text-text-high overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="vignette" />
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="pt-8 md:pt-12">
          <ControlsBar onRun={handleRun} isRunning={isRunning} />
        </div>
        <ComparisonSection isRunning={isRunning} />
        <FooterSection />
      </div>
    </main>
  )
}
