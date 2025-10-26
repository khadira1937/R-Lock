"use client"

import { useEffect, useState } from "react"
import { EnhancedPipelineAnimation } from "./EnhancedPipelineAnimation"

export function CinematicRLockExplainer() {
  const [useLottie, setUseLottie] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if production Lottie animation exists
    fetch("/animations/rlock-cinematic-er.json", { method: "HEAD" })
      .then((res) => {
        setUseLottie(res.ok)
      })
      .catch(() => {
        setUseLottie(false)
      })
  }, [])

  // Loading state
  if (useLottie === null) {
    return (
      <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--section-bg)] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 lg:w-[60%] aspect-video lg:aspect-[16/9] bg-gradient-to-br from-[#051028] via-[#0a1a30] to-[#051028] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[var(--rlock-blue)] border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="lg:w-[40%] p-6 lg:p-8 flex items-center bg-[var(--section-bg)]">
            <p className="text-text-mid text-base">Loading animation...</p>
          </div>
        </div>
      </div>
    )
  }

  // If Lottie exists, use it (future implementation)
  // For now, always use enhanced animation
  return <EnhancedPipelineAnimation />
}
