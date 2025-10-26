"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Stage {
  id: string
  label: string
  breadcrumb: string
  caption: string
  subtitle?: string
  x: number
  y: number
  startTime: number
  duration: number
  isER: boolean
}

const STAGES: Stage[] = [
  { id: "intents", label: "Intents", breadcrumb: "Intents", caption: "Users express swaps, liquidity, staking—bundled together.", x: 120, y: 380, startTime: 0, duration: 1.6, isER: false },
  { id: "dag", label: "DAG Build", breadcrumb: "DAG", caption: "We map dependencies and avoid conflicts.", x: 240, y: 380, startTime: 1.6, duration: 1.4, isER: false },
  { id: "layers", label: "Topological Layers", breadcrumb: "Layers", caption: "Independent steps are layered to run in parallel.", subtitle: "parallel batches", x: 360, y: 380, startTime: 3, duration: 1.4, isER: false },
  { id: "chunk", label: "Chunking per Layer", breadcrumb: "Chunking", caption: "We pack operations to fit Solana limits—bytes, CU, instructions.", subtitle: "bytes • CU • instr", x: 480, y: 380, startTime: 4.4, duration: 1.6, isER: false },
  { id: "occ", label: "OCC Capture", breadcrumb: "OCC", caption: "We capture the account state safely and deterministically.", subtitle: "account snapshots", x: 600, y: 380, startTime: 6, duration: 1.5, isER: false },
  { id: "er_route", label: "ER Router Discovery", breadcrumb: "ER", caption: "MagicBlock selects the best route for this run.", subtitle: "MagicBlock routing", x: 720, y: 520, startTime: 7.5, duration: 1.5, isER: true },
  { id: "er_session", label: "ER Session", breadcrumb: "ER", caption: "Guards, caching, and merging prepare efficient execution.", subtitle: "guards + cache", x: 840, y: 520, startTime: 9, duration: 1.5, isER: true },
  { id: "er_execute", label: "ER Execute", breadcrumb: "ER", caption: "Chunks run off-chain—fast and conflict-aware.", subtitle: "~214ms off-chain", x: 960, y: 520, startTime: 10.5, duration: 1.8, isER: true },
  { id: "compact", label: "Compact Settlement", breadcrumb: "Compact", caption: "We anchor a single compact settlement on Solana.", subtitle: "instr↓ bytes↓ fees↓", x: 1080, y: 380, startTime: 12.3, duration: 1.8, isER: false },
  { id: "fee", label: "Fee Plan + Serialize", breadcrumb: "Fee", caption: "Budgets finalized; message serialized.", x: 1170, y: 380, startTime: 14.1, duration: 1.3, isER: false },
  { id: "simulate", label: "Simulate", breadcrumb: "Simulate", caption: "Preflight checks pass.", x: 1245, y: 380, startTime: 15.4, duration: 1.2, isER: false },
  { id: "tighten", label: "Tighten CU", breadcrumb: "Tighten", caption: "CU limit clamps for safety and cost.", x: 1305, y: 380, startTime: 16.6, duration: 1.2, isER: false },
  { id: "send", label: "Sign & Send", breadcrumb: "Send", caption: "Blockhash valid → submit to Solana.", x: 1365, y: 380, startTime: 17.8, duration: 1.5, isER: false },
]

const TOTAL_DURATION = 25 // seconds
const FINALE_START = 19.3

// Smart label positioning - adapts to edge proximity to prevent clipping
const getLabelPositionOverride = (stageIndex: number, baseX: number) => {
  const viewBoxWidth = 1440
  const edgeThreshold = 48
  
  // Steps 0 and 1: Always anchor to the right of node
  if (stageIndex === 0 || stageIndex === 1) {
    return {
      x: baseX + 20,
      textAnchor: "start" as const,
    }
  }
  
  // Near right edge: Anchor to end (label appears left of node)
  if (baseX > viewBoxWidth - edgeThreshold - 200) {
    return {
      x: baseX - 16,
      textAnchor: "end" as const,
    }
  }
  
  // Near left edge: Anchor to start (label appears right of node)
  if (baseX < edgeThreshold + 200) {
    return {
      x: baseX + 16,
      textAnchor: "start" as const,
    }
  }
  
  // Middle: Default centered behavior
  return {
    x: baseX,
    textAnchor: "middle" as const,
  }
}

// Design system constants for unified scaling - MAXIMIZED VERSION
const DESIGN = {
  // Diagram scale factor (mobile → desktop) - PUSHED TO MAXIMUM
  diagramScale: {
    mobile: 1.25,    // SM ≤640px
    tablet: 1.45,    // MD ≥1024px  
    laptop: 1.55,    // LG ≥1280px
    desktop: 1.65,   // XL ≥1536px (+65% vs original!)
  },
  // Visual dimensions (base values, scaled by diagramScale)
  railStroke: 7,
  nodeRadius: { main: 19, er: 20 },      // 38-40px diameter → 63-66px at desktop!
  particleRadius: { core: 11, glow: 18 }, // 22px core, 36px glow
  // Typography (responsive px values) - ALL ENLARGED
  fontSize: {
    nodeTitle: { mobile: 22, tablet: 26, desktop: 28 },
    nodeSubtitle: { mobile: 17, tablet: 19, desktop: 21 },
    chip: { mobile: 15, tablet: 17, desktop: 18 },
    finaleBadge: { mobile: 18, tablet: 22, desktop: 24 },
    caption: { mobile: 20, tablet: 22, desktop: 26 },
  },
  // Layout dimensions
  chip: { height: 36, minWidth: 88, padding: 16 },
  finaleBadge: { height: 50, verticalOffset: -64 }, // Moved up 64px
}

export function EnhancedPipelineAnimation() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [showFinale, setShowFinale] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(0)
  const elapsedTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return

    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp
        startTimeRef.current = timestamp - (elapsedTimeRef.current * 1000)
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000
      elapsedTimeRef.current = elapsed % TOTAL_DURATION

      // Check if we're in finale
      if (elapsedTimeRef.current >= FINALE_START) {
        if (!showFinale) setShowFinale(true)
      } else {
        if (showFinale) setShowFinale(false)
        // Find current stage
        const stageIndex = STAGES.findIndex((stage, idx) => {
          const nextStage = STAGES[idx + 1]
          return (
            elapsedTimeRef.current >= stage.startTime &&
            (nextStage ? elapsedTimeRef.current < nextStage.startTime : elapsedTimeRef.current < FINALE_START)
          )
        })
        if (stageIndex !== -1 && stageIndex !== currentStageIndex) {
          setCurrentStageIndex(stageIndex)
        }
      }

      lastTimestamp = timestamp
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, prefersReducedMotion, currentStageIndex, showFinale])

  // IntersectionObserver for auto-play/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setIsPlaying(true)
        } else {
          setIsPlaying(false)
        }
      },
      { threshold: [0, 0.3, 0.5, 1] },
    )

    const container = containerRef.current
    if (container) {
      observer.observe(container)
    }

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [])

  // Calculate particle position with smooth easing
  const getParticlePosition = () => {
    const time = elapsedTimeRef.current

    if (time >= FINALE_START) {
      return { x: 50, y: 45, isER: false, progress: 1 }
    }

    // Find current and next stage
    let currentStage = STAGES[0]
    let nextStage = STAGES[1]
    let progress = 0

    for (let i = 0; i < STAGES.length - 1; i++) {
      if (time >= STAGES[i].startTime && time < STAGES[i + 1].startTime) {
        currentStage = STAGES[i]
        nextStage = STAGES[i + 1]
        progress = (time - currentStage.startTime) / (nextStage.startTime - currentStage.startTime)
        break
      }
    }

    // Smooth easeInOut easing
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

    return {
      x: currentStage.x + (nextStage.x - currentStage.x) * eased,
      y: currentStage.y + (nextStage.y - currentStage.y) * eased,
      isER: nextStage.isER || currentStage.isER,
      progress: eased,
    }
  }

  const particlePos = isPlaying ? getParticlePosition() : { x: 10, y: 45, isER: false, progress: 0 }
  const currentStage = STAGES[currentStageIndex]
  const currentCaption = showFinale
    ? "High success. Lower compute. One compact settlement."
    : currentStage?.caption || STAGES[0].caption

  // Precomputed label widths for each stage (approximate in pixels at desktop scale)
  const labelWidths: Record<string, number> = {
    "intents": 90,
    "dag": 115,
    "layers": 220,
    "chunk": 240,
    "occ": 140,
    "er_route": 240,
    "er_session": 140,
    "er_execute": 140,
    "compact": 240,
    "fee": 260,
    "simulate": 110,
    "tighten": 130,
    "send": 150,
  }

  // Smart auto-pan - keeps active node + label fully visible with comfortable margins
  const calculateCameraPan = () => {
    if (showFinale) return 0
    
    const viewBoxWidth = 1440
    const safeLeftMargin = 40
    const safeRightMargin = 240 // Large margin to account for caption panel taking 40% width
    const activeX = currentStage?.x || 120
    const labelWidth = labelWidths[currentStage?.id || "intents"] || 150
    
    // Calculate label bounds (centered above node by default, unless overridden for steps 0-1)
    const isEdgeStep = currentStageIndex === 0 || currentStageIndex === 1
    const labelLeftEdge = isEdgeStep ? activeX : activeX - (labelWidth / 2)
    const labelRightEdge = isEdgeStep ? activeX + labelWidth + 20 : activeX + (labelWidth / 2)
    
    // Professional panning behavior:
    // Steps 0-4: Stay on the left to show early steps clearly
    // Steps 5+: Start following the dot to the right
    let targetPan = 0
    
    if (currentStageIndex <= 4) {
      // First 5 steps (Intents, DAG, Layers, Chunking, OCC): 
      // Keep camera on the left side, showing start of pipeline clearly
      targetPan = 150  // Start much further left to show full "DAG Build" title
    } else {
      // Steps 5+ (ER phases, Compact, Fee, Simulate, Tighten, Send):
      // Follow the dot as it moves right
      const viewportCenter = activeX > 1100 
        ? viewBoxWidth * 0.45  // Far right steps: keep centered to avoid caption
        : viewBoxWidth * 0.35  // Middle-right steps: comfortable position
      
      targetPan = viewportCenter - activeX
    }
    
    // Extra safety: ensure label never clips
    const projectedLabelRight = labelRightEdge + targetPan
    const projectedLabelLeft = labelLeftEdge + targetPan
    
    if (projectedLabelRight > viewBoxWidth - safeRightMargin) {
      // Label too far right, pan more to left
      targetPan = (viewBoxWidth - safeRightMargin) - labelRightEdge - 20
    } else if (projectedLabelLeft < safeLeftMargin) {
      // Label too far left, pan to right
      targetPan = safeLeftMargin - labelLeftEdge
    }
    
    // Clamp pan to content boundaries (never show empty space beyond rail)
    // Rail extends from x=90 to x=1395
    const maxPanRight = 150  // Allow more room to show the very start clearly
    const maxPanLeft = (viewBoxWidth - safeRightMargin) - 1395  // Don't pan past rail end
    
    return Math.max(maxPanLeft, Math.min(maxPanRight, targetPan))
  }

  const cameraPan = calculateCameraPan()

  // Reduced motion mode
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className="w-full mx-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--section-bg)] overflow-hidden min-h-[50vh] lg:min-h-[48vh]">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Static view - 60% on desktop */}
          <div className="w-full lg:w-[60%] relative overflow-hidden min-h-[50vh] lg:min-h-[48vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#051028] via-[#0a1a30] to-[#051028] p-4 sm:p-5 lg:p-6 xl:p-8">
              <svg 
                viewBox="0 0 1440 810" 
                className="w-full h-full" 
                style={{ 
                  shapeRendering: "geometricPrecision", 
                  transform: `scale(${DESIGN.diagramScale.desktop})`,
                  transformOrigin: "center"
                }}
              >
                {/* Background glow */}
                <defs>
                  <radialGradient id="staticGlow1" cx="25%" cy="35%">
                    <stop offset="0%" stopColor="rgba(0, 194, 255, 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="staticGlow2" cx="70%" cy="40%">
                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.18)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <ellipse cx="360" cy="280" rx="420" ry="260" fill="url(#staticGlow1)" opacity="0.7" />
                <ellipse cx="1000" cy="350" rx="460" ry="300" fill="url(#staticGlow2)" opacity="0.6" />

                {/* Main rail - using design system */}
                <path
                  d="M 90 380 L 600 380"
                  stroke="#00C2FF"
                  strokeWidth={DESIGN.railStroke}
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* ER branch - using design system */}
                <path
                  d="M 600 380 Q 640 440, 720 520 L 960 520 Q 1020 440, 1080 380"
                  stroke="#A855F7"
                  strokeWidth={DESIGN.railStroke}
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                {/* Return to main */}
                <path
                  d="M 1080 380 L 1395 380"
                  stroke="#00C2FF"
                  strokeWidth={DESIGN.railStroke}
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* All nodes visible - BIGGER with design system */}
                {STAGES.map((stage) => (
                  <g key={stage.id}>
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r={stage.isER ? DESIGN.nodeRadius.er : DESIGN.nodeRadius.main}
                      fill="rgba(0, 194, 255, 0.35)"
                      stroke={stage.isER ? "#A855F7" : "#00C2FF"}
                      strokeWidth="5"
                      opacity="0.95"
                    />
                    <text
                      x={stage.x}
                      y={stage.y + 56}
                      fontSize={DESIGN.fontSize.nodeTitle.desktop}
                      fill="rgba(230, 240, 255, 0.98)"
                      textAnchor="middle"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="600"
                      filter="url(#textGlow)"
                      stroke="rgba(5, 16, 40, 0.4)"
                      strokeWidth="1.5"
                      paintOrder="stroke fill"
                    >
                      {stage.breadcrumb}
                    </text>
                  </g>
                ))}

                {/* Bottom step chips - using design system */}
                <g transform="translate(0, 680)">
                  {STAGES.map((stage, idx) => {
                    const chipX = 120 + idx * 102
                    const halfWidth = DESIGN.chip.minWidth / 2
                    const halfHeight = DESIGN.chip.height / 2
                    return (
                      <g key={stage.id}>
                        {/* Chip capsule */}
                        <rect
                          x={chipX - halfWidth}
                          y={-halfHeight}
                          width={DESIGN.chip.minWidth}
                          height={DESIGN.chip.height}
                          rx={halfHeight}
                          fill="rgba(20, 30, 48, 0.55)"
                          filter="url(#blur)"
                        />
                        <text
                          x={chipX}
                          y="6"
                          fontSize={DESIGN.fontSize.chip.desktop}
                          fill="#E6F0FF"
                          textAnchor="middle"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          fontWeight="500"
                          opacity="0.78"
                        >
                          {stage.breadcrumb}
                        </text>
                      </g>
                    )
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* Caption - 40% on desktop */}
          <div className="w-full lg:w-[40%] p-8 md:p-10 xl:p-12 flex flex-col justify-center bg-[var(--section-bg)] min-h-[280px] lg:pl-10 xl:pl-12">
            <p 
              className="text-text-high text-[20px] md:text-[22px] leading-[1.5] max-w-[45ch]" 
              style={{ opacity: 0.93 }}
            >
              {currentCaption}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Normal animated mode
  return (
    <div ref={containerRef} className="w-full mx-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--section-bg)] overflow-hidden shadow-2xl min-h-[50vh] lg:min-h-[48vh]">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Animation (60% on desktop) */}
        <div className="w-full lg:w-[60%] relative overflow-hidden min-h-[50vh] lg:min-h-[48vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#051028] via-[#0a1a30] to-[#051028] p-4 sm:p-5 lg:p-6 xl:p-8">
            <motion.svg
              viewBox="0 0 1440 810"
              className="w-full h-full"
              style={{ 
                shapeRendering: "geometricPrecision",
              }}
              animate={{
                scale: DESIGN.diagramScale.desktop,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <defs>
                {/* Gradient definitions */}
                <radialGradient id="bgGlow1" cx="25%" cy="35%">
                  <stop offset="0%" stopColor="rgba(0, 194, 255, 0.18)" />
                  <stop offset="50%" stopColor="rgba(44, 107, 255, 0.1)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="bgGlow2" cx="70%" cy="40%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
                  <stop offset="50%" stopColor="rgba(124, 92, 255, 0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="bgGlow3" cx="50%" cy="70%">
                  <stop offset="0%" stopColor="rgba(20, 241, 149, 0.1)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.06)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Spotlight behind active node */}
                <radialGradient id="spotlight">
                  <stop offset="0%" stopColor="rgba(0, 194, 255, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Particle glow */}
                <radialGradient id="particleGlow">
                  <stop offset="0%" stopColor={particlePos.isER ? "#A855F7" : "#00C2FF"} />
                  <stop offset="40%" stopColor={particlePos.isER ? "rgba(168, 85, 247, 0.6)" : "rgba(0, 194, 255, 0.6)"} />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                {/* Trail gradient */}
                <linearGradient id="particleTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={particlePos.isER ? "rgba(168, 85, 247, 0)" : "rgba(0, 194, 255, 0)"} />
                  <stop offset="100%" stopColor={particlePos.isER ? "rgba(168, 85, 247, 0.4)" : "rgba(0, 194, 255, 0.4)"} />
                </linearGradient>

                {/* Filter for moderate glow */}
                <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Strong glow for ER nodes */}
                <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Text glow for active labels */}
                <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Subtle blur for capsule backgrounds */}
                <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>

              {/* Background glows with subtle parallax */}
              <motion.ellipse
                cx="360"
                cy="280"
                rx="380"
                ry="240"
                fill="url(#bgGlow1)"
                opacity="0.7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8 }}
              />
              <motion.ellipse
                cx="1000"
                cy="350"
                rx="420"
                ry="280"
                fill="url(#bgGlow2)"
                opacity="0.6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8 }}
              />
              <motion.ellipse
                cx="720"
                cy="580"
                rx="380"
                ry="220"
                fill="url(#bgGlow3)"
                opacity="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8 }}
              />

              {/* Spotlight behind active node */}
              {!showFinale && (
                <motion.ellipse
                  cx={currentStage.x}
                  cy={currentStage.y}
                  rx="140"
                  ry="100"
                  fill="url(#spotlight)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Internal camera group - smart auto-pan keeps labels fully visible */}
              <motion.g
                animate={{
                  x: prefersReducedMotion ? cameraPan : cameraPan,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1], // Fast out, slow in
                      }
                }
              >
                {/* Main rail - using design system */}
                <motion.path
                  d="M 90 380 L 600 380"
                  stroke="#00C2FF"
                  strokeWidth={DESIGN.railStroke}
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

              {/* ER branch - using design system */}
              <motion.path
                d="M 600 380 Q 640 440, 720 520 L 960 520 Q 1020 440, 1080 380"
                stroke="#A855F7"
                strokeWidth={DESIGN.railStroke}
                fill="none"
                strokeLinecap="round"
                filter="url(#strongGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />

              {/* Return to main rail */}
              <motion.path
                d="M 1080 380 L 1395 380"
                stroke="#00C2FF"
                strokeWidth={DESIGN.railStroke}
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              />

              {/* Nodes - using design system (32-34px diameter) */}
              {STAGES.map((stage, idx) => {
                const isActive = currentStageIndex === idx && !showFinale
                const isPast = currentStageIndex > idx && !showFinale
                const nodeSize = stage.isER ? DESIGN.nodeRadius.er : DESIGN.nodeRadius.main

                return (
                  <g key={stage.id}>
                    {/* Bright pulse ring with neon glow */}
                    {isActive && (
                      <motion.circle
                        cx={stage.x}
                        cy={stage.y}
                        r={nodeSize}
                        fill="none"
                        stroke={stage.isER ? "#A855F7" : "#00C2FF"}
                        strokeWidth="5"
                        filter="url(#strongGlow)"
                        initial={{ r: nodeSize, opacity: 1 }}
                        animate={{ r: nodeSize + 15, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}

                    {/* Node circle - larger, more prominent */}
                    <motion.circle
                      cx={stage.x}
                      cy={stage.y}
                      r={nodeSize}
                      fill={isPast || isActive ? (stage.isER ? "rgba(168, 85, 247, 0.45)" : "rgba(0, 194, 255, 0.45)") : "rgba(0, 194, 255, 0.24)"}
                      stroke={stage.isER ? "#A855F7" : "#00C2FF"}
                      strokeWidth="5"
                      filter={stage.isER ? "url(#strongGlow)" : "url(#glow)"}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? [1, 1.08, 1.03] : 1, 
                        opacity: 1 
                      }}
                      transition={{ 
                        scale: { duration: 0.6, times: [0, 0.5, 1] },
                        opacity: { delay: idx * 0.06, duration: 0.4 }
                      }}
                    />

                    {/* Labels - using design system with responsive sizing */}
                    <AnimatePresence mode="wait">
                      {isActive && (() => {
                        const labelPos = getLabelPositionOverride(idx, stage.x)
                        return (
                          <motion.g
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.1 }}
                            style={{ overflow: "visible" }}
                          >
                            {/* Title with soft glow and inner stroke - BIGGER */}
                            <text
                              x={labelPos.x}
                              y={stage.y - 50}
                              fontSize={DESIGN.fontSize.nodeTitle.desktop}
                              fill="#E6F0FF"
                              textAnchor={labelPos.textAnchor}
                              fontFamily="system-ui, -apple-system, sans-serif"
                              fontWeight="600"
                              opacity="0.98"
                              filter="url(#textGlow)"
                              stroke="rgba(5, 16, 40, 0.5)"
                              strokeWidth="2"
                              paintOrder="stroke fill"
                            >
                              {stage.label}
                            </text>
                            {/* Subtitle with design system sizing - BIGGER */}
                            {stage.subtitle && (
                              <text
                                x={labelPos.x}
                                y={stage.y - 24}
                                fontSize={DESIGN.fontSize.nodeSubtitle.desktop}
                                fill="#E6F0FF"
                                textAnchor={labelPos.textAnchor}
                                fontFamily="system-ui, -apple-system, sans-serif"
                                fontWeight="500"
                                opacity="0.90"
                                stroke="rgba(5, 16, 40, 0.35)"
                                strokeWidth="1.2"
                                paintOrder="stroke fill"
                              >
                                {stage.subtitle}
                              </text>
                            )}
                          </motion.g>
                        )
                      })()}
                    </AnimatePresence>
                  </g>
                )
              })}

              {/* Bottom chips - using design system */}
              <g transform="translate(0, 660)">
                {STAGES.map((stage, idx) => {
                  const isActive = currentStageIndex === idx && !showFinale
                  const chipX = 120 + idx * 102
                  const halfWidth = DESIGN.chip.minWidth / 2
                  const halfHeight = DESIGN.chip.height / 2
                  
                  return (
                    <motion.g
                      key={stage.id}
                      animate={{ 
                        opacity: isActive ? 1 : 0.65,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Chip capsule with bright accent ring */}
                      <motion.rect
                        x={chipX - halfWidth}
                        y={-halfHeight}
                        width={DESIGN.chip.minWidth}
                        height={DESIGN.chip.height}
                        rx={halfHeight}
                        fill="rgba(20, 30, 48, 0.6)"
                        stroke={isActive ? "#00C2FF" : "transparent"}
                        strokeWidth={isActive ? "3" : "0"}
                        filter={isActive ? "url(#strongGlow)" : "url(#blur)"}
                        animate={{
                          fill: isActive ? "rgba(0, 194, 255, 0.22)" : "rgba(20, 30, 48, 0.5)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <text
                        x={chipX}
                        y="7"
                        fontSize={DESIGN.fontSize.chip.desktop}
                        fill="#E6F0FF"
                        textAnchor="middle"
                        fontFamily="system-ui, -apple-system, sans-serif"
                        fontWeight={isActive ? "700" : "500"}
                        opacity={isActive ? "1" : "0.78"}
                      >
                        {stage.breadcrumb}
                      </text>
                    </motion.g>
                  )
                })}
              </g>

              {/* Traveling particle - using design system (18px core, 30px glow) */}
              {!showFinale && (
                <motion.g
                  animate={{
                    x: particlePos.x,
                    y: particlePos.y,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {/* Bright trail - MUCH longer for larger scale */}
                  <motion.line
                    x1="-60"
                    y1="0"
                    x2="0"
                    y2="0"
                    stroke="url(#particleTrail)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.62"
                    filter="url(#glow)"
                  />
                  {/* Particle glow - 36px diameter */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={DESIGN.particleRadius.glow} 
                    fill="url(#particleGlow)" 
                    opacity="0.98" 
                    filter="url(#strongGlow)" 
                  />
                  {/* Particle core - 22px diameter */}
                  <circle
                    cx="0"
                    cy="0"
                    r={DESIGN.particleRadius.core}
                    fill={particlePos.isER ? "#A855F7" : "#00C2FF"}
                    opacity="1"
                  />
                </motion.g>
              )}
              </motion.g>
              {/* End of internal camera group */}

              {/* Finale overlay - using design system, badges moved up 56px */}
              <AnimatePresence>
                {showFinale && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Full rail glow - brighter */}
                    <path
                      d="M 90 380 L 600 380 M 600 380 Q 640 440, 720 520 L 960 520 Q 1020 440, 1080 380 M 1080 380 L 1395 380"
                      stroke="#00C2FF"
                      strokeWidth={DESIGN.railStroke}
                      fill="none"
                      strokeLinecap="round"
                      filter="url(#strongGlow)"
                      opacity="0.92"
                    />

                    {/* Metric badges - repositioned higher, using design system */}
                    <g transform={`translate(720, ${240 + DESIGN.finaleBadge.verticalOffset})`}>
                      {/* Success badge */}
                      <g>
                        <rect 
                          x="-280" 
                          y={-DESIGN.finaleBadge.height / 2} 
                          width="560" 
                          height={DESIGN.finaleBadge.height} 
                          rx="20" 
                          fill="rgba(20, 241, 149, 0.32)" 
                          stroke="rgba(20, 241, 149, 0.8)" 
                          strokeWidth="3"
                          filter="url(#strongGlow)"
                        />
                        <text 
                          x="0" 
                          y="8" 
                          fontSize={DESIGN.fontSize.finaleBadge.desktop} 
                          fill="rgba(20, 241, 149, 1)" 
                          textAnchor="middle" 
                          fontFamily="system-ui, -apple-system, sans-serif" 
                          fontWeight="600"
                          filter="url(#textGlow)"
                        >
                          Success 95–99%
                        </text>
                      </g>

                      {/* CU savings badge - 14px gap below */}
                      <g transform={`translate(0, ${DESIGN.finaleBadge.height + 14})`}>
                        <rect 
                          x="-280" 
                          y={-DESIGN.finaleBadge.height / 2} 
                          width="560" 
                          height={DESIGN.finaleBadge.height} 
                          rx="20" 
                          fill="rgba(0, 194, 255, 0.32)" 
                          stroke="rgba(0, 194, 255, 0.8)" 
                          strokeWidth="3"
                          filter="url(#strongGlow)"
                        />
                        <text 
                          x="0" 
                          y="8" 
                          fontSize={DESIGN.fontSize.finaleBadge.desktop} 
                          fill="rgba(0, 194, 255, 1)" 
                          textAnchor="middle" 
                          fontFamily="system-ui, -apple-system, sans-serif" 
                          fontWeight="600"
                          filter="url(#textGlow)"
                        >
                          CU savings 30–60%
                        </text>
                      </g>
                    </g>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>
          </div>
        </div>

        {/* Caption panel (40% on desktop) - using design system */}
        <div className="w-full lg:w-[40%] p-8 md:p-10 xl:p-12 flex flex-col justify-center bg-[var(--section-bg)] min-h-[300px] lg:pl-10 xl:pl-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentCaption}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 0.93, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="text-text-high leading-[1.5] max-w-[45ch]"
              style={{ 
                fontSize: `${DESIGN.fontSize.caption.desktop}px`,
              }}
            >
              {currentCaption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
