"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"

export function FooterSection() {
  return (
    <footer className="relative px-4 md:px-8 py-12 md:py-16 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left: Logo & Mission */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <BrandMark className="text-[clamp(18px,2vw,24px)]" />
            <p className="text-sm text-text-muted max-w-xs text-center md:text-left">
              The layer where Solana runs smoother, faster, and reliably—under load.
            </p>
          </div>

          {/* Right: Status & Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--neon-success)] animate-pulse" />
              <span className="text-xs text-text-muted font-semibold">Devnet Live</span>
            </div>
            <a href="#" className="text-text-muted hover:text-text-high transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-muted hover:text-text-high transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-[var(--border-subtle)] text-center text-xs text-text-muted"
        >
          This demo uses funded test wallets on devnet. Not for production use.
        </motion.div>
      </div>
    </footer>
  )
}
