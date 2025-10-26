"use client"

import { motion } from "framer-motion"
import { AnimatedHeading } from "./AnimatedHeading"
import { GlowDivider } from "./GlowDivider"
import { useEffect, useState } from "react"

interface SectionIntroProps {
  title: string
  description?: string
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  showDivider?: boolean
}

export function SectionIntro({
  title,
  description,
  titleAs = "h2",
  className = "",
  showDivider = true,
}: SectionIntroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      {showDivider && <GlowDivider />}
      
      <div className="space-y-4">
        <AnimatedHeading as={titleAs} className="text-fluid-h2 font-bold text-text-high">
          {title}
        </AnimatedHeading>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg text-text-mid max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}
