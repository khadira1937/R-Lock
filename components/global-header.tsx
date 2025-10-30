"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandMark } from "@/components/brand-mark"

export function GlobalHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Docs", href: "/docs" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/docs") return pathname.startsWith("/docs")
    if (href === "/about") return pathname === "/about"
    return pathname === href
  }

  const showConnect = pathname === "/demo"

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] glass-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center py-2 -ml-4 md:-ml-8"
          aria-label="RLock home"
        >
          <BrandMark />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-text-mid hover:text-text-high transition-colors duration-200 group"
            >
              {item.label}
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--solana-purple)] via-[var(--solana-cyan)] to-[var(--solana-green)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-high transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <button onClick={() => setIsDark(!isDark)} className="text-text-muted hover:text-text-high transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {showConnect && (
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] hover:shadow-lg hover:shadow-[var(--solana-purple)]/30 text-white border-0"
            >
              Connect (Devnet)
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-text-high">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--section-bg)]"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-[var(--panel-bg)] text-[var(--rlock-blue)]"
                      : "text-text-mid hover:text-text-high"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-[var(--border-subtle)] my-2" />
              {showConnect && (
                <Button className="w-full bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0">
                  Connect (Devnet)
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
