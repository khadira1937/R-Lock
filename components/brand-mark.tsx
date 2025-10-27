"use client"

import { motion } from "framer-motion"

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`
        font-[family-name:var(--font-orbitron)]
        font-black
        tracking-[0.08em]
        uppercase
        bg-gradient-to-b from-[#00d4ff] via-[#1a8fff] to-[#0066cc]
        bg-clip-text text-transparent
        [text-shadow:0_0_20px_rgba(26,143,255,0.4),0_0_40px_rgba(0,212,255,0.2)]
        supports-[not(background-clip:text)]:text-[#1a8fff]
        ${className}
      `}
      style={{
        fontSize: "clamp(22px, 2.4vw, 34px)",
        lineHeight: 1,
        WebkitTextFillColor: "transparent",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
      }}
      whileHover={{
        filter: "brightness(1.15) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      RLock
    </motion.span>
  )
}
