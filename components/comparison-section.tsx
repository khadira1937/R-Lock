"use client"

import { motion } from "framer-motion"
import { ComparisonCard } from "./comparison-card"
import { DiffBanner } from "./diff-banner"

interface ComparisonSectionProps {
  isRunning: boolean
}

export function ComparisonSection({ isRunning }: ComparisonSectionProps) {
  return (
    <section className="relative px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-high">Head-to-Head Comparison</h2>
          <p className="text-text-mid max-w-2xl">
            Watch how RLock's conflict-aware lanes and OCC DAG execution outperform plain Solana under contention.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonCard title="Baseline (Plain Solana)" isRLock={false} isRunning={isRunning} />
          <ComparisonCard title="RLock (Lanes + OCC + ER)" isRLock={true} isRunning={isRunning} />
        </div>

        {/* Diff Banner */}
        <DiffBanner />
      </div>
    </section>
  )
}
