"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  /** Use 'hero' for full-height hero sections */
  variant?: "default" | "hero"
  /** Custom max-width class (defaults to max-w-6xl) */
  maxWidth?: string
  /** Custom vertical padding class (defaults to py-24 md:py-32) */
  verticalPadding?: string
}

/**
 * Section wrapper that establishes consistent vertical rhythm,
 * horizontal padding, and max content width across the home page.
 */
export function Section({
  children,
  className = "",
  variant = "default",
  maxWidth = "max-w-6xl",
  verticalPadding = "py-24 md:py-32 lg:py-40",
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative px-4 md:px-8",
        variant === "hero" ? "min-h-screen flex items-center justify-center" : verticalPadding,
        className
      )}
    >
      <div className={cn("w-full mx-auto", maxWidth)}>
        {children}
      </div>
    </section>
  )
}
