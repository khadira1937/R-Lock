"use client"

import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import Link from "next/link"
import { BrandMark } from "@/components/brand-mark"

export function DocsFooter() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--page-bg)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Left: Logo & Mission */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <BrandMark className="text-[clamp(18px,2vw,24px)]" />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              The layer where Solana runs smoother, faster, and reliably—under load.
            </p>
          </div>

          {/* Docs Links */}
          <div>
            <h3 className="font-semibold text-text-high mb-4 text-sm uppercase tracking-wide">Docs</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/overview/what-is-rlock"
                  className="text-sm text-text-muted hover:text-text-high transition-colors"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/quickstart/install-setup"
                  className="text-sm text-text-muted hover:text-text-high transition-colors"
                >
                  Quickstart
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/concepts/dag-dependencies"
                  className="text-sm text-text-muted hover:text-text-high transition-colors"
                >
                  Concepts
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/sdk/rlock-client"
                  className="text-sm text-text-muted hover:text-text-high transition-colors"
                >
                  SDK Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h3 className="font-semibold text-text-high mb-4 text-sm uppercase tracking-wide">Ecosystem</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Solana
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Devnet
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-text-high mb-4 text-sm uppercase tracking-wide">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-muted hover:text-text-high transition-colors">
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Status & Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--neon-success)] animate-pulse" />
              <span className="text-xs text-text-muted font-semibold">Devnet Live</span>
            </div>
            <a href="#" className="text-text-muted hover:text-text-high transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="text-text-muted hover:text-text-high transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-text-muted">© 2025 RLock. This demo uses funded test wallets on devnet.</p>
        </div>
      </div>
    </footer>
  )
}
