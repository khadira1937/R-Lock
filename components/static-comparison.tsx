"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface StaticComparisonProps {
  className?: string
}

export function StaticComparison({ className = "" }: StaticComparisonProps) {
  const [hasPlayed, setHasPlayed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll-linked progress for progress bars
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"],
  })

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (hasPlayed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed && entry.intersectionRatio >= 0.5) {
            setHasPlayed(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasPlayed])

  const baselineMetrics = {
    transactions: 41,
    totalFee: 205712,
    avgFee: 5017,
    latencyP50: 300,
    latencyP95: 397,
    successRate: "—",
    notes: "Blockhash fallbacks used: 41"
  }

  const rlockMetrics = {
    intents: 41,
    chunks: 2,
    erSessions: 2,
    erSuccessRate: "100%",
    erFallback: "0%",
    route: "devnet-as.magicblock.app",
    totalFee: 10048,
    avgFee: 5024,
    planCoverage: "100%",
    latencyP50: 214,
    latencyP95: 222,
    feeVsBaseline: 195664,
    feeSavingsPercent: 95.12
  }

  const phases = [
    { name: "Build", progress: 100 },
    { name: "Simulate", progress: 75 },
    { name: "Send", progress: 50 },
    { name: "Confirm", progress: 25 },
  ]

  // Create scroll-linked progress transforms for each phase
  const phase0Width = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const phase1Width = useTransform(scrollYProgress, [0, 0.4], [0, 75])
  const phase2Width = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  const phase3Width = useTransform(scrollYProgress, [0, 0.6], [0, 25])
  
  const phaseWidths = [phase0Width, phase1Width, phase2Width, phase3Width]

  return (
    <div ref={sectionRef} className={`${className}`}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Baseline Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="gradient-border rounded-2xl p-6 md:p-8 space-y-6"
        >
          {/* Header */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-text-high">Baseline (Plain Solana)</h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider bg-[var(--panel-bg)] px-2 py-1 rounded">
                Devnet
              </span>
            </div>
          </div>

          {/* Phase Timeline */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Phases</div>
            <div className="space-y-2">
              {phases.map((phase, idx) => (
                <div key={phase.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-mid font-semibold">{phase.name}</span>
                    <span className="text-text-muted font-mono">{phase.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--panel-bg)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)]"
                      style={{
                        width: prefersReducedMotion ? `${phase.progress}%` : useTransform(phaseWidths[idx], (v) => `${v}%`),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Metrics</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Transactions</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {hasPlayed ? baselineMetrics.transactions : 0}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Total fee</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {hasPlayed ? baselineMetrics.totalFee.toLocaleString() : 0} lamports
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Avg fee</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {hasPlayed ? baselineMetrics.avgFee.toLocaleString() : 0} lamports
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Latency p50 / p95</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  {hasPlayed ? `${baselineMetrics.latencyP50} ms / ${baselineMetrics.latencyP95} ms` : "0 ms / 0 ms"}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Success rate</span>
                <motion.span
                  className="font-mono font-semibold text-text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  {baselineMetrics.successRate}
                </motion.span>
              </div>
            </div>
            <div className="text-xs text-text-muted italic pt-2 border-t border-[var(--border-subtle)]">
              {baselineMetrics.notes}
            </div>
          </div>
        </motion.div>

        {/* RLock Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="gradient-border rounded-2xl p-6 md:p-8 space-y-6"
        >
          {/* Header */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-text-high">RLock (Lanes + OCC + ER)</h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider bg-[var(--panel-bg)] px-2 py-1 rounded">
                Devnet
              </span>
              <span className="text-xs font-semibold text-[var(--neon-success)] uppercase tracking-wider bg-[var(--panel-bg)] px-2 py-1 rounded">
                ER: On
              </span>
            </div>
          </div>

          {/* Phase Timeline */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Phases</div>
            <div className="space-y-2">
              {phases.map((phase, idx) => (
                <div key={phase.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-mid font-semibold">{phase.name}</span>
                    <span className="text-text-muted font-mono">{phase.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--panel-bg)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#14F195] to-[#59D0FF]"
                      style={{
                        width: prefersReducedMotion ? `${phase.progress}%` : useTransform(phaseWidths[idx], (v) => `${v}%`),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Metrics</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Intents</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {hasPlayed ? rlockMetrics.intents : 0}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Chunks executed (ER)</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                >
                  {hasPlayed ? rlockMetrics.chunks : 0}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">ER sessions</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {hasPlayed ? rlockMetrics.erSessions : 0}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">ER success / fallback</span>
                <motion.span
                  className="font-mono font-semibold text-[var(--neon-success)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  {hasPlayed ? `${rlockMetrics.erSuccessRate} / ${rlockMetrics.erFallback}` : "0% / 0%"}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Route</span>
                <motion.span
                  className="font-mono text-xs text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {rlockMetrics.route}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Total fee</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                >
                  {hasPlayed ? rlockMetrics.totalFee.toLocaleString() : 0} lamports
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Avg fee</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  {hasPlayed ? rlockMetrics.avgFee.toLocaleString() : 0} lamports
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Plan coverage</span>
                <motion.span
                  className="font-mono font-semibold text-[var(--neon-success)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.95 }}
                >
                  {hasPlayed ? rlockMetrics.planCoverage : "0%"}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-mid">Latency (ER execute p50 / p95)</span>
                <motion.span
                  className="font-mono font-semibold text-text-high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  {hasPlayed ? `${rlockMetrics.latencyP50} ms / ${rlockMetrics.latencyP95} ms` : "0 ms / 0 ms"}
                </motion.span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-text-mid font-semibold">Savings vs baseline (fee)</span>
                <motion.span
                  className="font-mono font-bold text-[var(--neon-success)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hasPlayed ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1.05 }}
                >
                  {hasPlayed ? `${rlockMetrics.feeVsBaseline.toLocaleString()} lamports (${rlockMetrics.feeSavingsPercent}%)` : "0 lamports (0%)"}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
