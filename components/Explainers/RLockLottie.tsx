"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import placeholderAnimation from "./placeholder.json"

interface CaptionStep {
  title: string
  subtitle: string
}

const captions: Record<string, CaptionStep> = {
  overview: { title: "RLock Pipeline", subtitle: "Watch the transaction flow through all stages." },
  intents: { title: "Intents", subtitle: "UserIntent[]: what the user wants." },
  dag: { title: "DAG Build", subtitle: "Detect conflicts; order by priority/index." },
  layers: { title: "Topological Layers", subtitle: "Parallelizable sets." },
  chunking: { title: "Chunking per Layer", subtitle: "Bytes/instr/CU budgets; optional ALT pre-plan." },
  occ: { title: "OCC Capture", subtitle: "Fetch + hash account state; max slot drift; retries." },
  er_branch: { title: "ER (MagicBlock)", subtitle: "Router + session → execute off-chain → compact settlement." },
  fee: { title: "Fee Plan + Serialize", subtitle: "ComputeBudget, LUTs (v0), message size." },
  simulate: { title: "Simulate", subtitle: "Preflight." },
  tighten: { title: "Tighten CU Limit", subtitle: "Safety + clamp." },
  send: { title: "Sign & Send", subtitle: "is_blockhash_valid? → submit." },
  final_metrics: { title: "Final Metrics", subtitle: "Success 95–99%, CU savings 30–60%." },
}

export function RLockLottie() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [erEnabled, setErEnabled] = useState(true)
  const [currentCaption, setCurrentCaption] = useState<CaptionStep>(captions.overview)
  const [isPlaceholder, setIsPlaceholder] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Initialize Lottie
  useEffect(() => {
    const initLottie = async () => {
      const lottie = (await import("lottie-web")).default

      if (!containerRef.current) return

      // Try to load real animations first
      let animationData = placeholderAnimation
      let usingPlaceholder = true

      try {
        const response = erEnabled
          ? await fetch("/animations/rlock-flow.json")
          : await fetch("/animations/rlock-flow-no-er.json")

        if (response.ok) {
          animationData = await response.json()
          usingPlaceholder = false
          setIsPlaceholder(false)
        }
      } catch (e) {
        console.log("[v0] Using placeholder animation")
      }

      // Destroy previous instance
      if (lottieRef.current) {
        lottieRef.current.destroy()
      }

      // Create new instance
      lottieRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: !prefersReducedMotion && isPlaying,
        animationData,
      })

      // Handle marker events for captions
      lottieRef.current.addEventListener("enterFrame", () => {
        if (lottieRef.current?.currentFrame) {
          const markers = animationData.markers || []
          for (const marker of markers) {
            const frameInRange =
              lottieRef.current.currentFrame >= marker.tm &&
              lottieRef.current.currentFrame < marker.tm + (marker.dr || 60)

            if (frameInRange && captions[marker.cm]) {
              setCurrentCaption(captions[marker.cm])
              break
            }
          }
        }
      })
    }

    initLottie()

    return () => {
      if (lottieRef.current) {
        lottieRef.current.destroy()
      }
    }
  }, [erEnabled, prefersReducedMotion])

  // Handle play/pause
  useEffect(() => {
    if (lottieRef.current) {
      if (isPlaying && !prefersReducedMotion) {
        lottieRef.current.play()
      } else {
        lottieRef.current.pause()
      }
    }
  }, [isPlaying, prefersReducedMotion])

  // Handle ER toggle
  const handleERToggle = () => {
    setErEnabled(!erEnabled)
  }

  // Handle restart
  const handleRestart = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0, true)
      setIsPlaying(true)
    }
  }

  // IntersectionObserver for auto-play
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!prefersReducedMotion) {
            setIsPlaying(true)
          }
        } else {
          setIsPlaying(false)
        }
      },
      { threshold: 0.35 },
    )

    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <div className="w-full">
      {/* Player Container */}
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-[var(--section-bg)] border border-[var(--border-subtle)]">
        {/* Placeholder Badge */}
        {isPlaceholder && (
          <div className="absolute top-3 left-3 z-20 bg-[var(--neon-warn)] text-black px-2 py-1 rounded text-xs font-semibold">
            Placeholder
          </div>
        )}

        {/* Lottie Container */}
        <div
          ref={containerRef}
          className="w-full"
          style={{
            aspectRatio: "16 / 9",
            maxHeight: "640px",
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between mb-8">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isPlaying ? "default" : "outline"}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
            className="bg-[var(--rlock-blue)] hover:bg-[var(--rlock-blue)]/90 text-white"
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRestart}
            aria-label="Restart animation"
            className="border-[var(--border-hover)] text-text-high hover:bg-[var(--section-bg)] bg-transparent"
          >
            Restart
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-text-mid">Ephemeral Rollups:</span>
          <Button
            size="sm"
            variant={erEnabled ? "default" : "outline"}
            onClick={handleERToggle}
            aria-label={erEnabled ? "Disable ER" : "Enable ER"}
            className={erEnabled ? "bg-[var(--neon-success)] hover:bg-[var(--neon-success)]/90 text-black" : ""}
          >
            {erEnabled ? "ON" : "OFF"}
          </Button>
        </div>
      </div>

      {/* Captions Card */}
      <motion.div
        key={currentCaption.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6 rounded-xl bg-[var(--section-bg)] border border-[var(--border-subtle)]"
      >
        <h3 className="text-lg font-bold text-text-high mb-2">{currentCaption.title}</h3>
        <p className="text-sm text-text-mid">{currentCaption.subtitle}</p>
      </motion.div>
    </div>
  )
}
