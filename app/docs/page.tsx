"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DocsHomePage() {
  return (
    <div className="py-16 md:py-20 lg:py-24">
      <div className="max-w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-high mb-6">Build smarter flows on Solana.</h1>
          <p className="text-xl md:text-2xl text-text-mid mb-8 leading-relaxed">
            Learn how RLock routes around contention and accelerates your transactions.
          </p>
          <div className="flex gap-4">
            <Link href="/docs/quickstart/install-setup">
              <Button className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0 h-11 px-6 text-base">
                Quickstart
              </Button>
            </Link>
            <Link href="/docs/sdk/rlock-client">
              <Button
                variant="outline"
                className="border-[var(--border-subtle)] text-text-high hover:bg-[var(--section-bg)] bg-transparent h-11 px-6 text-base"
              >
                SDK Reference
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <Link href="/docs/overview/what-is-rlock" className="group">
            <div className="p-8 lg:p-10 rounded-xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all hover:shadow-lg hover:shadow-[var(--rlock-blue)]/10 h-full">
              <h3 className="font-bold text-text-high mb-3 group-hover:text-[var(--rlock-blue)] transition-colors text-xl md:text-2xl">
                What is RLock?
              </h3>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">
                Learn the fundamentals of conflict-aware lanes and OCC DAG execution.
              </p>
            </div>
          </Link>
          <Link href="/docs/quickstart/install-setup" className="group">
            <div className="p-8 lg:p-10 rounded-xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all hover:shadow-lg hover:shadow-[var(--rlock-blue)]/10 h-full">
              <h3 className="font-bold text-text-high mb-3 group-hover:text-[var(--rlock-blue)] transition-colors text-xl md:text-2xl">
                Get Started
              </h3>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">Install the SDK and run your first example in minutes.</p>
            </div>
          </Link>
          <Link href="/docs/concepts/dag-dependencies" className="group">
            <div className="p-8 lg:p-10 rounded-xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all hover:shadow-lg hover:shadow-[var(--rlock-blue)]/10 h-full">
              <h3 className="font-bold text-text-high mb-3 group-hover:text-[var(--rlock-blue)] transition-colors text-xl md:text-2xl">
                Core Concepts
              </h3>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">Understand DAGs, lanes, OCC, and Ephemeral Rollups.</p>
            </div>
          </Link>
          <Link href="/docs/sdk/rlock-client" className="group">
            <div className="p-8 lg:p-10 rounded-xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all hover:shadow-lg hover:shadow-[var(--rlock-blue)]/10 h-full">
              <h3 className="font-bold text-text-high mb-3 group-hover:text-[var(--rlock-blue)] transition-colors text-xl md:text-2xl">
                API Reference
              </h3>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">Complete SDK documentation with examples and error codes.</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
