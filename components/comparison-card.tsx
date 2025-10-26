"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComparisonCardProps {
  title: string
  isRLock: boolean
  isRunning: boolean
}

export function ComparisonCard({ title, isRLock, isRunning }: ComparisonCardProps) {
  const [showER, setShowER] = useState(true)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const events = [
    { id: "1", type: "HOT_ACCOUNT_LOCKED", phase: "Build", color: "text-[var(--neon-error)]" },
    { id: "2", type: "BLOCKHASH_EXPIRED", phase: "Send", color: "text-[var(--neon-warn)]" },
    { id: "3", type: "LANE_DECISION", phase: "Simulate", color: "text-[var(--neon-info)]" },
  ]

  const phases = [
    { name: "Build", progress: 100 },
    { name: "Simulate", progress: 75 },
    { name: "Send", progress: 50 },
    { name: "Confirm", progress: 25 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="gradient-border rounded-2xl p-6 md:p-8 space-y-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-text-high">{title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider bg-[var(--panel-bg)] px-2 py-1 rounded">
              Devnet
            </span>
            {isRLock && (
              <button
                onClick={() => setShowER(!showER)}
                className="text-xs font-semibold text-[var(--rlock-blue)] uppercase tracking-wider hover:text-[var(--neon-info)] transition-colors"
              >
                ER: {showER ? "On" : "Off"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Phases</div>
        <div className="space-y-2">
          {phases.map((phase) => (
            <div key={phase.name} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-mid font-semibold">{phase.name}</span>
                <span className="text-text-muted font-mono">{phase.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--panel-bg)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)]"
                  initial={{ width: 0 }}
                  animate={{ width: isRunning ? `${phase.progress}%` : 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Events */}
      <div className="space-y-3 flex-1">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Live Events</div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events.map((event) => (
            <motion.button
              key={event.id}
              onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`w-full text-left px-3 py-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all duration-200 ${
                expandedEvent === event.id ? "border-[var(--rlock-blue)]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${event.color}`} />
                  <span className={`text-xs font-mono font-semibold ${event.color}`}>{event.type}</span>
                  <span className="text-xs text-text-muted">{event.phase}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform ${
                    expandedEvent === event.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              {expandedEvent === event.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 pt-2 border-t border-[var(--border-subtle)] text-xs text-text-muted font-mono"
                >
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify({ event: event.type, phase: event.phase, timestamp: Date.now() }, null, 2)}
                  </pre>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-[var(--border-subtle)] pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-mid">Success Rate</span>
          <span className="font-mono font-bold text-[var(--neon-success)]">✅ 98 / ❌ 2</span>
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
          <ExternalLink className="w-3 h-3 mr-2" />
          Open in Explorer
        </Button>
      </div>
    </motion.div>
  )
}
