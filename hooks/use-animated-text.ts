"use client"

import { useEffect, useRef, useState } from "react"
import SplitType from "split-type"

interface UseAnimatedTextOptions {
  type?: "chars" | "words" | "lines" | "chars,words"
  disabled?: boolean
}

export function useAnimatedText({ type = "chars", disabled = false }: UseAnimatedTextOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const splitInstanceRef = useRef<SplitType | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (disabled || !elementRef.current) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    
    if (prefersReducedMotion) {
      setIsReady(true)
      return
    }

    // Split the text
    const split = new SplitType(elementRef.current, {
      types: type,
      tagName: "span",
    })

    splitInstanceRef.current = split
    setIsReady(true)

    // Cleanup
    return () => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
      }
    }
  }, [type, disabled])

  return { elementRef, isReady, split: splitInstanceRef.current }
}
