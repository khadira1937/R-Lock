"use client"

import { motion } from "framer-motion"
import { AnimatedHeading } from "./AnimatedHeading"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Optional eyebrow text above the title */
  eyebrow?: string
  /** Main section title */
  title: string
  /** Optional subtitle/description below the title */
  subtitle?: string
  /** Heading level for the title */
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  /** Text alignment */
  align?: "left" | "center"
  /** Additional className for the container */
  className?: string
  /** Custom title className (overrides default fluid typography) */
  titleClassName?: string
  /** Custom subtitle className */
  subtitleClassName?: string
}

/**
 * Reusable heading block for sections with optional eyebrow, title, and subtitle.
 * Headings re-trigger animation on every viewport entry and remain visible after.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  titleAs = "h2",
  align = "left",
  className = "",
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const alignmentClass = align === "center" ? "text-center items-center" : "text-left items-start"
  const maxWidthClass = align === "center" ? "max-w-3xl mx-auto" : "max-w-none"
  
  // Default title classes based on heading level
  const defaultTitleClass = titleAs === "h1" 
    ? "text-fluid-hero" 
    : "text-fluid-h2"

  return (
    <div className={cn("flex flex-col gap-6", alignmentClass, maxWidthClass, className)}>
      {/* Eyebrow */}
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-xs md:text-sm font-semibold text-[var(--rlock-blue)] uppercase tracking-[0.15em]"
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Title */}
      <AnimatedHeading
        as={titleAs}
        className={cn(
          "font-bold text-text-high leading-[1.1]",
          titleClassName || defaultTitleClass
        )}
        charDelay={0.025}
        wordDelay={0.08}
      >
        {title}
      </AnimatedHeading>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "text-text-mid leading-relaxed",
            align === "center" ? "max-w-2xl" : "max-w-xl",
            subtitleClassName || "text-lg md:text-xl"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
