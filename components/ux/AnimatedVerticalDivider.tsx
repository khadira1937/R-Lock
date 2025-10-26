"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function AnimatedVerticalDivider() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })
  
  // Glow intensity based on how much of the section is in view
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div ref={containerRef} className="relative h-full flex items-center justify-center">
      {/* Base divider line */}
      <div className="w-px h-full bg-[var(--border-subtle)]" />
      
      {/* Animated glow overlay */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-[var(--rlock-blue)] to-transparent"
          style={{
            opacity: glowOpacity,
            boxShadow: "0 0 20px rgba(44, 107, 255, 0.6)",
          }}
        />
      )}
    </div>
  )
}
