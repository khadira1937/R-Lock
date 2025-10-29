"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Book, Rocket, Puzzle, Code, Layers, BarChart3, LifeBuoy, History, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DocItem {
  id: string
  title: string
  href: string
}

interface DocSection {
  id: string
  title: string
  icon: React.ReactNode
  items: DocItem[]
}

const docSections: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: <Book className="w-4 h-4" />,
    items: [
      { id: "what-is-rlock", title: "What is RLock?", href: "/docs/overview/what-is-rlock" },
      { id: "key-features", title: "How it works", href: "/docs/overview/key-features" },
      { id: "when-to-use", title: "When to Use RLock", href: "/docs/overview/when-to-use" },
    ],
  },
  {
    id: "quickstart",
    title: "Quickstart",
    icon: <Rocket className="w-4 h-4" />,
    items: [
      { id: "install-setup", title: "Install & Setup", href: "/docs/quickstart/install-setup" },
      { id: "minimal-example", title: "Minimal Example", href: "/docs/quickstart/minimal-example" },
      { id: "running-devnet", title: "Running on Devnet", href: "/docs/quickstart/running-devnet" },
    ],
  },
  {
    id: "concepts",
    title: "Concepts",
    icon: <Puzzle className="w-4 h-4" />,
    items: [
      { id: "dag-dependencies", title: "DAG & Dependencies", href: "/docs/concepts/dag-dependencies" },
      { id: "lock-hint-lanes", title: "Lock-Hint Lanes", href: "/docs/concepts/lock-hint-lanes" },
      { id: "occ", title: "Optimistic Concurrency Control", href: "/docs/concepts/occ" },
      { id: "ephemeral-rollups", title: "Ephemeral Rollups (ER)", href: "/docs/concepts/ephemeral-rollups" },
    ],
  },
  {
    id: "sdk",
    title: "SDK Reference",
    icon: <Code className="w-4 h-4" />,
    items: [
      { id: "rlock-client", title: "RLockClient", href: "/docs/sdk/rlock-client" },
      { id: "build-dag", title: "buildDAG()", href: "/docs/sdk/build-dag" },
      { id: "execute", title: "execute()", href: "/docs/sdk/execute" },
      { id: "events-errors", title: "Events & Error Codes", href: "/docs/sdk/events-errors" },
    ],
  },
  {
    id: "scenarios",
    title: "Scenarios",
    icon: <Layers className="w-4 h-4" />,
    items: [
      { id: "amm-hot-pool", title: "AMM Hot-Pool", href: "/docs/scenarios/amm-hot-pool" },
      { id: "airdrop-crowd", title: "Airdrop Crowd", href: "/docs/scenarios/airdrop-crowd" },
      { id: "nft-mint-style", title: "NFT Mint-Style", href: "/docs/scenarios/nft-mint-style" },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    icon: <BarChart3 className="w-4 h-4" />,
    items: [
      { id: "event-schema", title: "Event Schema", href: "/docs/observability/event-schema" },
      { id: "summary-diff", title: "Summary & Diff", href: "/docs/observability/summary-diff" },
      { id: "export-jsonl", title: "Export .jsonl", href: "/docs/observability/export-jsonl" },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <LifeBuoy className="w-4 h-4" />,
    items: [
      { id: "common-errors", title: "Common Errors & Fixes", href: "/docs/troubleshooting/common-errors" },
      { id: "reduced-motion", title: "Reduced-Motion Mode", href: "/docs/troubleshooting/reduced-motion" },
      { id: "devnet-limits", title: "Devnet Limits & Faucet", href: "/docs/troubleshooting/devnet-limits" },
    ],
  },
  {
    id: "changelog",
    title: "Changelog",
    icon: <History className="w-4 h-4" />,
    items: [{ id: "versions", title: "Versions & Compat", href: "/docs/changelog/versions" }],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const activeItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("docs-expanded-sections")
    if (saved) {
      setExpandedSections(JSON.parse(saved))
    } else {
      // Auto-expand the section containing the current page
      const currentSection = docSections.find((section) =>
        section.items.some((item) => pathname.startsWith(item.href.split("/").slice(0, 3).join("/"))),
      )
      if (currentSection) {
        setExpandedSections([currentSection.id])
      }
    }
  }, [pathname])

  useEffect(() => {
    if (activeItemRef.current && mounted) {
      setTimeout(() => {
        activeItemRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 100)
    }
  }, [pathname, mounted])

  const toggleSection = (id: string) => {
    const newExpanded = expandedSections.includes(id) ? [] : [id]
    setExpandedSections(newExpanded)
    localStorage.setItem("docs-expanded-sections", JSON.stringify(newExpanded))
  }

  const filteredSections = docSections.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
  }))

  if (!mounted) return null

    return (
      <aside className="bg-[var(--panel-bg)] border-r border-[var(--border-subtle)] min-h-screen h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Search docs…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 py-2 bg-[var(--section-bg)] border-[var(--border-subtle)] text-text-high placeholder:text-text-muted focus:border-[var(--rlock-blue)] focus:ring-1 focus:ring-[var(--rlock-blue)] text-sm w-full"
          />
        </div>
      </div>

        <nav 
          className="flex-1 overflow-y-hidden hover:overflow-y-auto space-y-1.5 px-3 py-4" 
          style={{ maxHeight: 'calc(100vh - 56px)' }}
          role="tree"
          tabIndex={0}
          aria-label="Documentation navigation"
        >
        {filteredSections.map((section) => (
          <div key={section.id} className="space-y-1">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-text-mid hover:text-text-high hover:bg-[var(--section-bg)] transition-colors group"
              role="treeitem"
              aria-expanded={expandedSections.includes(section.id)}
            >
              <span className="text-[var(--rlock-blue)] flex-shrink-0 w-4 h-4">{section.icon}</span>
              <span className="flex-1 text-left font-semibold text-sm tracking-wide uppercase">{section.title}</span>
              <motion.div
                animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-high" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 pl-6 py-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.id}
                          ref={isActive ? activeItemRef : null}
                          href={item.href}
                          className={`block px-3 py-2 rounded text-sm transition-all leading-relaxed ${
                            isActive
                              ? "text-[var(--rlock-blue)] bg-[var(--section-bg)] font-medium border-l-2 border-[var(--rlock-blue)] pl-[10px]"
                              : "text-text-muted hover:text-text-high hover:bg-[var(--section-bg)]"
                          }`}
                          role="treeitem"
                        >
                          {item.title}
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  )
}
