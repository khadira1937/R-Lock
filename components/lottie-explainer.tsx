"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Caption {
  title: string
  subtitle: string
}

const CAPTIONS: Record<string, Caption> = {
  overview: {
    title: "RLock Pipeline",
    subtitle: "Intents → DAG → Layers → Chunking → OCC → ER → Fee Plan → Simulate → Tighten CU → Sign & Send",
  },
  intents: { title: "Intents", subtitle: "UserIntent[]: what the user wants." },
  dag: { title: "DAG Build", subtitle: "Detect conflicts; order by priority/index." },
  layers: { title: "Topological Layers", subtitle: "Parallelizable sets." },
  chunking: { title: "Chunking per Layer", subtitle: "Bytes/instr/CU budgets; optional ALT pre-plan." },
  occ: { title: "OCC Capture", subtitle: "Fetch + hash account state; max slot drift; retries." },
  er_branch: { title: "ER (MagicBlock)", subtitle: "Router discovery & session." },
  fee: { title: "Fee Plan + Serialize", subtitle: "ComputeBudget, LUTs (v0), message size." },
  simulate: { title: "Simulate", subtitle: "Preflight." },
  tighten: { title: "Tighten CU Limit", subtitle: "Safety + clamp." },
  send: { title: "Sign & Send", subtitle: "is_blockhash_valid? → submit." },
  final_metrics: { title: "Results", subtitle: "Success 95–99% • CU savings 30–60%" },
}

export function LottieExplainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [erEnabled, setErEnabled] = useState(true)
  const [currentCaption, setCurrentCaption] = useState<Caption>(CAPTIONS.overview)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Load Lottie animation
  useEffect(() => {
    const loadLottie = async () => {
      const lottieWeb = await import("lottie-web")
      const animationFile = erEnabled ? "/animations/rlock-flow.json" : "/animations/rlock-flow-no-er.json"

      if (containerRef.current && !lottieRef.current) {
        lottieRef.current = lottieWeb.default.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: animationFile,
        })

        // Listen for marker events to update captions
        lottieRef.current.addEventListener("enterFrame", () => {
          const markers = lottieRef.current.markers || []
          for (const marker of markers) {
            const currentFrame = lottieRef.current.currentFrame
            if (currentFrame >= marker.time && currentFrame < marker.time + 1) {
              const caption = CAPTIONS[marker.name] || CAPTIONS.overview
              setCurrentCaption(caption)
              break
            }
          }
        })
      }
    }

    if (!prefersReducedMotion) {
      loadLottie()
    }

    return () => {
      if (lottieRef.current) {
        lottieRef.current.destroy()
        lottieRef.current = null
      }
    }
  }, [erEnabled, prefersReducedMotion])

  // IntersectionObserver for auto-play
  useEffect(() => {
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (lottieRef.current && !isPlaying) {
            lottieRef.current.play()
            setIsPlaying(true)
          }
        } else {
          if (lottieRef.current && isPlaying) {
            lottieRef.current.pause()
            setIsPlaying(false)
          }
        }
      },
      { threshold: 0.6 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isPlaying, prefersReducedMotion])

  const handlePlayPause = () => {
    if (!lottieRef.current) return
    if (isPlaying) {
      lottieRef.current.pause()
    } else {
      lottieRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    if (!lottieRef.current) return
    lottieRef.current.goToAndStop(0, true)
    setIsPlaying(false)
    setCurrentCaption(CAPTIONS.overview)
  }

  const handleERToggle = () => {
    if (lottieRef.current) {
      lottieRef.current.destroy()
      lottieRef.current = null
    }
    setErEnabled(!erEnabled)
    setIsPlaying(false)
    setCurrentCaption(CAPTIONS.overview)
  }

  if (prefersReducedMotion) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)]">
            <h3 className="text-lg font-bold text-text-high mb-4">Pipeline Steps</h3>
            <ul className="space-y-3 text-sm text-text-mid">
              {Object.entries(CAPTIONS).map(([key, caption]) => (
                <li key={key} className="flex gap-2">
                  <span className="text-[var(--rlock-blue)]">→</span>
                  <div>
                    <p className="font-semibold text-text-high">{caption.title}</p>
                    <p className="text-xs">{caption.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-high mb-2">Results</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-3xl font-bold text-[var(--rlock-blue)]">95–99%</p>
                  <p className="text-sm text-text-mid">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[var(--neon-success)]">30–60%</p>
                  <p className="text-sm text-text-mid">CU Savings</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="/demo" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#9945FF] via-[#59D0FF] to-[#14F195] text-white font-semibold">
                  Run the Demo
                </Button>
              </Link>
              <Link href="/docs" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Container */}
      <div className="rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
        <div className="grid md:grid-cols-[60%_40%] gap-0 min-h-[360px] md:min-h-[520px] lg:min-h-[640px]">
          {/* Animation */}
          <div
            ref={containerRef}
            className="w-full h-full bg-gradient-to-br from-black/40 to-black/20 flex items-center justify-center"
            style={{ aspectRatio: "16/9" }}
          />

          {/* Captions Card */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-[var(--section-bg)] border-l border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCaption.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-text-high">{currentCaption.title}</h3>
                <p className="text-text-mid leading-relaxed">{currentCaption.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="space-y-4 mt-8">
              <div className="flex gap-2">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent"
                  aria-label={isPlaying ? "Pause animation" : "Play animation"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent"
                  aria-label="Reset animation"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              <Button
                onClick={handleERToggle}
                variant={erEnabled ? "default" : "outline"}
                size="sm"
                className="w-full"
                aria-label={erEnabled ? "Disable ER branch" : "Enable ER branch"}
              >
                {erEnabled ? "✓ ER Enabled" : "ER Disabled"}
              </Button>
            </div>

            {/* CTAs */}
            <div className="flex gap-2 mt-6">
              <Link href="/demo" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#9945FF] via-[#59D0FF] to-[#14F195] text-white font-semibold text-sm">
                  Run Demo
                </Button>
              </Link>
              <Link href="/docs" className="flex-1">
                <Button variant="outline" className="w-full text-sm bg-transparent">
                  Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
