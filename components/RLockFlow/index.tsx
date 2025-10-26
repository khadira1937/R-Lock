"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"
import { graphConfig } from "./graph"
import "./styles.css"

interface NodeState {
  id: string
  active: boolean
  scale: number
  opacity: number
}

interface ParticleState {
  nodeId: string
  progress: number
  lane: string
}

export default function RLockFlow({ autoplay = true }: { autoplay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [erEnabled, setErEnabled] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [nodeStates, setNodeStates] = useState<Record<string, NodeState>>({})
  const [particleState, setParticleState] = useState<ParticleState>({
    nodeId: "intents",
    progress: 0,
    lane: "planning",
  })
  const [metrics, setMetrics] = useState({ success: "", cuSavings: "" })
  const [showCounters, setShowCounters] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Initialize node states
  useEffect(() => {
    const states: Record<string, NodeState> = {}
    graphConfig.lanes.forEach((lane) => {
      lane.nodes.forEach((node) => {
        states[node.id] = { id: node.id, active: false, scale: 1, opacity: 0.6 }
      })
    })
    setNodeStates(states)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return

    const allNodes = graphConfig.lanes.flatMap((lane) => lane.nodes)
    const totalSteps = erEnabled ? 17 : 13

    const animate = () => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % totalSteps
        if (next === 0) setShowCounters(false)
        return next
      })
    }

    animationRef.current = setInterval(animate, 800)
    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [isPlaying, erEnabled, prefersReducedMotion])

  // Update particle and node states based on current step
  useEffect(() => {
    const allNodes = graphConfig.lanes.flatMap((lane) => lane.nodes)
    const nodeSequence = erEnabled
      ? [
          "intents",
          "dag",
          "layers",
          "chunk",
          "occ",
          "router",
          "session",
          "execute",
          "compact",
          "fee",
          "simulate",
          "tighten",
          "send",
        ]
      : ["intents", "dag", "layers", "chunk", "occ", "fee", "simulate", "tighten", "send"]

    const activeNodeId = nodeSequence[currentStep] || "intents"
    const activeNode = allNodes.find((n) => n.id === activeNodeId)

    if (activeNode) {
      setParticleState({
        nodeId: activeNodeId,
        progress: currentStep / nodeSequence.length,
        lane: graphConfig.lanes.find((l) => l.nodes.some((n) => n.id === activeNodeId))?.id || "planning",
      })

      if (activeNodeId === "execute" && erEnabled) {
        setMetrics({ success: "95–99%", cuSavings: "30–60%" })
      } else if (activeNodeId === "send") {
        setMetrics({ success: "95–99%", cuSavings: "" })
      }

      if (activeNodeId === "compact") {
        setShowCounters(true)
      }

      const newStates = { ...nodeStates }
      Object.keys(newStates).forEach((id) => {
        newStates[id] = {
          ...newStates[id],
          active: id === activeNodeId,
          scale: id === activeNodeId ? 1.04 : 1,
          opacity: id === activeNodeId ? 1 : 0.6,
        }
      })
      setNodeStates(newStates)
    }
  }, [currentStep, erEnabled, nodeStates])

  const handleStep = () => {
    setCurrentStep((prev) => (prev + 1) % (erEnabled ? 17 : 13))
  }

  const handleReset = () => {
    setCurrentStep(0)
    setMetrics({ success: "", cuSavings: "" })
    setShowCounters(false)
  }

  const handleToggleER = () => {
    setErEnabled(!erEnabled)
    handleReset()
  }

  return (
    <>
      {/* SVG Pipeline */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 600"
        className="w-full h-auto mb-8 rlock-flow-svg"
        role="img"
        aria-label="RLock transaction pipeline visualization"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Planning Lane */}
        <g className="planning-lane">
          <line x1="50" y1="100" x2="1150" y2="100" stroke="rgba(44, 107, 255, 0.2)" strokeWidth="2" />
          {graphConfig.lanes[0].nodes.map((node, idx) => (
            <g key={node.id} transform={`translate(${100 + idx * 220}, 100)`}>
              <circle
                cx="0"
                cy="0"
                r="24"
                fill={nodeStates[node.id]?.active ? "rgba(44, 107, 255, 0.8)" : "rgba(44, 107, 255, 0.3)"}
                className={`node-circle ${nodeStates[node.id]?.active ? "active" : ""}`}
              />
              <text x="0" y="50" textAnchor="middle" className="node-label">
                {node.label}
              </text>
              <text x="0" y="68" textAnchor="middle" className="node-sub">
                {node.sub}
              </text>
            </g>
          ))}
        </g>

        {/* ER Lane (conditional) */}
        {erEnabled && (
          <g className="er-lane">
            <line x1="50" y1="300" x2="1150" y2="300" stroke="rgba(153, 69, 255, 0.2)" strokeWidth="2" />
            {graphConfig.lanes[1].nodes.map((node, idx) => (
              <g key={node.id} transform={`translate(${320 + idx * 220}, 300)`}>
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill={nodeStates[node.id]?.active ? "rgba(153, 69, 255, 0.8)" : "rgba(153, 69, 255, 0.3)"}
                  className={`node-circle ${nodeStates[node.id]?.active ? "active" : ""}`}
                />
                <text x="0" y="50" textAnchor="middle" className="node-label">
                  {node.label}
                </text>
                <text x="0" y="68" textAnchor="middle" className="node-sub">
                  {node.sub}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Execution Lane */}
        <g className="execution-lane">
          <line x1="50" y1="500" x2="1150" y2="500" stroke="rgba(20, 241, 149, 0.2)" strokeWidth="2" />
          {graphConfig.lanes[2].nodes.map((node, idx) => (
            <g key={node.id} transform={`translate(${100 + idx * 280}, 500)`}>
              <circle
                cx="0"
                cy="0"
                r="24"
                fill={nodeStates[node.id]?.active ? "rgba(20, 241, 149, 0.8)" : "rgba(20, 241, 149, 0.3)"}
                className={`node-circle ${nodeStates[node.id]?.active ? "active" : ""}`}
              />
              <text x="0" y="50" textAnchor="middle" className="node-label">
                {node.label}
              </text>
              <text x="0" y="68" textAnchor="middle" className="node-sub">
                {node.sub}
              </text>
            </g>
          ))}
        </g>

        {/* Particle */}
        <circle
          cx={100 + (currentStep % 5) * 220}
          cy={particleState.lane === "planning" ? 100 : particleState.lane === "er" ? 300 : 500}
          r="8"
          fill="rgba(89, 208, 255, 0.9)"
          className="particle"
          filter="url(#particle-glow)"
        />

        {/* Glow filter */}
        <defs>
          <filter id="particle-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Counters at Compact */}
      <AnimatePresence>
        {showCounters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-4 justify-center mb-8"
          >
            {["Instr ↓", "Bytes ↓", "Fees ↓"].map((label, idx) => (
              <motion.div
                key={label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--rlock-blue)] text-[var(--rlock-blue)] font-semibold text-sm"
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Strip */}
      {(metrics.success || metrics.cuSavings) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-8 justify-center mb-8 text-center"
        >
          {metrics.success && (
            <div>
              <p className="text-sm text-text-mid">Success Rate</p>
              <p className="text-2xl font-bold text-[var(--neon-success)]">{metrics.success}</p>
            </div>
          )}
          {metrics.cuSavings && (
            <div>
              <p className="text-sm text-text-mid">CU Savings</p>
              <p className="text-2xl font-bold text-[var(--rlock-blue)]">{metrics.cuSavings}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={handleStep}
          className="p-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all"
          aria-label="Step to next node"
        >
          <SkipForward size={20} />
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-[var(--panel-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all"
          aria-label="Reset animation"
        >
          <RotateCcw size={20} />
        </button>

        <div className="flex items-center gap-3 ml-4">
          <label className="text-sm text-text-mid">ER Enabled</label>
          <button
            onClick={handleToggleER}
            className={`relative w-12 h-6 rounded-full transition-all ${
              erEnabled ? "bg-[var(--rlock-blue)]" : "bg-[var(--panel-bg)]"
            } border border-[var(--border-subtle)]`}
            aria-label="Toggle Ephemeral Rollups"
            aria-pressed={erEnabled}
          >
            <motion.div
              layout
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
              animate={{ x: erEnabled ? 24 : 0 }}
            />
          </button>
        </div>
      </div>

      {/* Debug label */}
      <div className="absolute left-2 bottom-2 text-[10px] text-white/50 select-none pointer-events-none">
        RLockFlow mounted
      </div>
    </>
  )
}
