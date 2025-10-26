"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { KPIPill } from "./kpi-pill"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false)

  const kpis = [
    { label: "Success %", value: "98.5", delta: "+2.3%", positive: true },
    { label: "P50 Latency", value: "245ms", delta: "-18%", positive: true },
    { label: "P90 Latency", value: "892ms", delta: "-31%", positive: true },
    { label: "CU / tx", value: "4,250", delta: "-38%", positive: true },
    { label: "Retries", value: "12", delta: "-67%", positive: true },
    { label: "Savings", value: "$2.4K", delta: "+156%", positive: true },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-24 md:py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #9945FF, #59D0FF)",
          }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #59D0FF, #14F195)",
          }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-balance font-bold text-text-high">
              RLock vs Baseline — real contention, live results.
            </h1>
            <p className="text-lg text-text-mid max-w-md">
              Conflict-aware lanes, OCC DAG execution, and ER for faster, cheaper settlement on Solana devnet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#9945FF] via-[#59D0FF] to-[#14F195] text-white font-semibold hover:shadow-lg hover:shadow-[#2C6BFF]/50 transition-all duration-300"
              onClick={() => setIsLoading(true)}
            >
              Run AMM Hot-Pool Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--border-hover)] text-text-high hover:bg-[var(--section-bg)] transition-all duration-300 bg-transparent"
            >
              Try Airdrop Crowd
            </Button>
          </div>
        </motion.div>

        {/* Right: KPI Pills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <KPIPill {...kpi} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
