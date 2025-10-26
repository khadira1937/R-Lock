"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SectionSeparatorProps {
  className?: string
}

/**
 * Premium gradient separator that fades to transparent on both sides.
 * Appears as a subtle hairline divider between major sections.
 */
export function SectionSeparator({ className = "" }: SectionSeparatorProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full h-px ${className}`}
    >
      <div
        className="w-full h-full bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent"
        style={{
          opacity: 0.3,
        }}
      />
    </motion.div>
  )
}
