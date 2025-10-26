"use client"

import { motion } from "framer-motion"

interface KPIPillProps {
  label: string
  value: string
  delta: string
  positive: boolean
}

export function KPIPill({ label, value, delta, positive }: KPIPillProps) {
  return (
    <motion.div
      className={`rounded-full px-4 py-3 glass-bg flex flex-col items-center justify-center text-center transition-all duration-300 ${
        positive ? "neon-glow-success" : ""
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">{label}</div>
      <div className="text-lg md:text-xl font-bold text-text-high font-mono mt-1">{value}</div>
      <div
        className={`text-xs font-semibold mt-1 ${positive ? "text-[var(--neon-success)]" : "text-[var(--neon-error)]"}`}
      >
        {delta}
      </div>
    </motion.div>
  )
}
