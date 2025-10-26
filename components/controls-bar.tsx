"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Lock, Play, Square } from "lucide-react"

interface ControlsBarProps {
  onRun: () => void
  isRunning: boolean
}

export function ControlsBar({ onRun, isRunning }: ControlsBarProps) {
  const [mode, setMode] = useState<"watch" | "hands-on">("watch")
  const [scenario, setScenario] = useState("amm-hot-pool")
  const [intents, setIntents] = useState(100)
  const [conflict, setConflict] = useState(50)
  const [concurrency, setConcurrency] = useState(20)
  const [tip, setTip] = useState("med")
  const [seed, setSeed] = useState("")

  const scenarios = [
    { id: "amm-hot-pool", name: "AMM Hot-Pool", desc: "Many swaps against one vault" },
    { id: "airdrop-crowd", name: "Airdrop Crowd", desc: "Hundreds of small transfers" },
    { id: "nft-mint", name: "NFT Mint-Style", desc: "Bursts against single authority" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 glass-bg border-b border-[var(--border-subtle)] py-6 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Mode Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-text-mid uppercase tracking-wider">Mode</span>
          <div className="flex gap-2 bg-[var(--panel-bg)] rounded-lg p-1 border border-[var(--border-subtle)]">
            {["watch", "hands-on"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "watch" | "hands-on")}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  mode === m ? "bg-[var(--rlock-blue)] text-white" : "text-text-mid hover:text-text-high"
                }`}
              >
                {m === "watch" ? "Watch Mode" : "Hands-On"}
              </button>
            ))}
          </div>
          {mode === "hands-on" && (
            <Button variant="outline" size="sm" className="ml-auto bg-transparent">
              Connect (Devnet)
            </Button>
          )}
        </div>

        {/* Scenario Selector */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-text-mid uppercase tracking-wider">Scenario</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                disabled={isRunning}
                className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                  scenario === s.id
                    ? "border-[var(--rlock-blue)] bg-[var(--rlock-blue)]/10"
                    : "border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="font-semibold text-text-high text-sm">{s.name}</div>
                <div className="text-xs text-text-muted mt-1">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Intents */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Intents: {intents}</label>
            <input
              type="range"
              min="50"
              max="400"
              value={intents}
              onChange={(e) => setIntents(Number(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-[var(--panel-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--rlock-blue)]"
            />
          </div>

          {/* Conflict % */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Conflict: {conflict}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={conflict}
              onChange={(e) => setConflict(Number(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-[var(--panel-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--rlock-blue)]"
            />
          </div>

          {/* Concurrency */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Concurrency: {concurrency}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-[var(--panel-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--rlock-blue)]"
            />
          </div>

          {/* Tip */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tip</label>
            <div className="flex gap-2">
              {["low", "med", "high"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTip(t)}
                  disabled={isRunning}
                  className={`flex-1 px-2 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    tip === t
                      ? "bg-[var(--rlock-blue)] text-white"
                      : "bg-[var(--panel-bg)] text-text-mid border border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
                  } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seed & Run Button */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Seed (Optional)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Deterministic run"
                disabled={isRunning}
                className="w-full pl-10 pr-4 py-2 bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg text-text-high placeholder-text-muted focus:outline-none focus:border-[var(--rlock-blue)] transition-colors"
              />
            </div>
          </div>

          <Button
            size="lg"
            onClick={onRun}
            disabled={isRunning}
            className="w-full md:w-auto bg-gradient-to-r from-[var(--rlock-blue)] to-[var(--neon-info)] text-white font-semibold hover:shadow-lg hover:shadow-[var(--rlock-blue)]/50 transition-all duration-300"
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Test
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
