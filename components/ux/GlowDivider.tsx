"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function GlowDivider({ className = "" }: { className?: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-[var(--rlock-blue)] to-transparent opacity-60 ${className}`}
      style={{
        boxShadow: prefersReducedMotion ? "none" : "0 0 8px rgba(44, 107, 255, 0.5)",
      }}
    />
  )
}
