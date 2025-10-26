"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"

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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--rlock-blue)] to-[var(--neon-info)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <div>
              <div className="font-bold text-text-high">RLock</div>
              <p className="text-sm text-text-muted max-w-xs">
                The layer where Solana runs smoother, faster, and reliably—under load.
              </p>
            </div>
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
