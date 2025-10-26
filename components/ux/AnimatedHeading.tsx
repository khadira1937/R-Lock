"use client"

import { motion } from "framer-motion"
import { useAnimatedText } from "@/hooks/use-animated-text"
import { useEffect, useState } from "react"

interface AnimatedHeadingProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  charDelay?: number
  wordDelay?: number
  animateOnView?: boolean
  immediateOnMount?: boolean
}

export function AnimatedHeading({
  children,
  className = "",
  as: Component = "h2",
  charDelay = 0.035,
  wordDelay = 0.14,
  animateOnView = true,
  immediateOnMount = false,
}: AnimatedHeadingProps) {
  const { elementRef, isReady } = useAnimatedText({ type: "chars,words" })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : wordDelay,
      },
    },
  }

  // Word variants
  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : charDelay,
      },
    },
  }

  // Character variants
  const charVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.3 }}
      >
        <Component className={className}>{children}</Component>
      </motion.div>
    )
  }

  return (
    <Component ref={elementRef as any} className={className}>
      {isReady && elementRef.current ? (
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate={immediateOnMount ? "visible" : undefined}
          whileInView={animateOnView && !immediateOnMount ? "visible" : undefined}
          viewport={{ once: false, margin: "-80px" }}
          className="block"
        >
          {Array.from(elementRef.current.querySelectorAll(".word")).map((wordEl, wordIdx) => (
            <motion.span key={wordIdx} variants={wordVariants} className="inline-block mr-[0.25em]">
              {Array.from(wordEl.querySelectorAll(".char")).map((charEl, charIdx) => (
                <motion.span key={charIdx} variants={charVariants} className="inline-block">
                  {charEl.textContent}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        children
      )}
    </Component>
  )
}
