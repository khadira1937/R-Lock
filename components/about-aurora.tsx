"use client"

import { useEffect, useRef, useState } from "react"

export function AboutAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const drawAurora = () => {
      if (prefersReducedMotion) {
        ctx.fillStyle = "rgba(5, 16, 40, 0.3)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return
      }

      time += 0.0005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Layer 1: Slow cyan-blue gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.sin(time * 0.3) * 50,
        canvas.height * 0.3 + Math.cos(time * 0.25) * 40,
        100,
        canvas.width * 0.2,
        canvas.height * 0.3,
        600,
      )
      gradient1.addColorStop(0, "rgba(89, 208, 255, 0.15)")
      gradient1.addColorStop(0.5, "rgba(44, 107, 255, 0.08)")
      gradient1.addColorStop(1, "rgba(5, 16, 40, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Layer 2: Medium purple-cyan gradient
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.sin(time * 0.2) * 60,
        canvas.height * 0.4 + Math.cos(time * 0.18) * 50,
        120,
        canvas.width * 0.7,
        canvas.height * 0.4,
        700,
      )
      gradient2.addColorStop(0, "rgba(153, 69, 255, 0.12)")
      gradient2.addColorStop(0.5, "rgba(89, 208, 255, 0.06)")
      gradient2.addColorStop(1, "rgba(5, 16, 40, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Layer 3: Slow violet-green gradient
      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.15) * 40,
        canvas.height * 0.6 + Math.cos(time * 0.12) * 60,
        140,
        canvas.width * 0.5,
        canvas.height * 0.6,
        800,
      )
      gradient3.addColorStop(0, "rgba(20, 241, 149, 0.08)")
      gradient3.addColorStop(0.5, "rgba(153, 69, 255, 0.05)")
      gradient3.addColorStop(1, "rgba(5, 16, 40, 0)")
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(drawAurora)
    }

    drawAurora()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [prefersReducedMotion])

  return (
    <>
      {/* Canvas Aurora (primary) */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Fade mask at bottom to prevent overlap with footer */}
      <div className="fixed bottom-0 inset-x-0 h-64 pointer-events-none z-0 bg-gradient-to-t from-[var(--page-bg)] to-transparent" />
    </>
  )
}
