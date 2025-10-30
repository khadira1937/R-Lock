"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Section } from "@/components/ux/Section"
import { SectionHeading } from "@/components/ux/SectionHeading"
import { SectionSeparator } from "@/components/ux/SectionSeparator"
import { cn } from "@/lib/utils"

type Partner = {
  name: string
  href: string
  logoSrc: string
  tagline?: string
}

const partners: Partner[] = [
  {
    name: "Triton One",
    href: "https://triton.one",
    logoSrc: "/partners/triton-one.png",
    tagline: "Ultra-fast Solana RPC & infra.",
  },
]

export default function Partners() {
  const prefersReducedMotion = useReducedMotion()

  if (partners.length === 0) {
    return null
  }

  const hoverMotion = prefersReducedMotion
    ? { scale: 1.02, y: -2 }
    : { scale: 1.04, y: -3, rotateX: 2, rotateY: -1.5 }

  return (
    <Section className="pt-24 md:pt-32 lg:pt-40">
      <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />

      <SectionHeading
  title="Partners"
  subtitle="We build with world-class infra."
  align="center"
  className="mb-16 md:mb-20 gap-6 md:gap-8"
  titleClassName="w-full max-w-none text-7xl sm:text-8xl md:text-9xl lg:text-[8.5rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#59D0FF] via-[#9945FF] to-[#14F195] drop-shadow-[0_18px_65px_rgba(89,208,255,0.35)] animate-gradient mb-8 md:mb-12"
  subtitleClassName="text-xl md:text-2xl text-white/80 font-medium tracking-[0.14em] uppercase"
      />

      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex w-full justify-center"
      >
        <motion.ul
          className="flex flex-col items-center gap-12 list-none p-0"
          initial={false}
        >
          {partners.map((partner) => (
            <li key={partner.name}>
              <Link
                href={partner.href}
                aria-label={`Visit ${partner.name}`}
                className="group/logo block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rlock-blue)] focus-visible:ring-offset-0 rounded-2xl"
              >
                <div style={{ perspective: prefersReducedMotion ? undefined : "1200px" }}>
                  <motion.div
                    className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left"
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={hoverMotion}
                    whileFocus={hoverMotion}
                    whileTap={{ scale: 0.98 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="relative flex items-center justify-center">
                      <Image
                        src={partner.logoSrc}
                        alt={`${partner.name} logo`}
                        width={360}
                        height={160}
                        priority
                        sizes="(min-width: 1280px) 144px, (min-width: 768px) 112px, 160px"
                        className="h-20 w-auto md:h-24 lg:h-28 transition-all duration-300 ease-[0.22,1,0.36,1] grayscale-[35%] opacity-95 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-focus-visible/logo:opacity-100 group-focus-visible/logo:grayscale-0"
                      />
                      {!prefersReducedMotion && (
                        <span className="animate-logo-shimmer group-hover/logo:opacity-45 group-hover/logo:[animation-play-state:running] group-focus-visible/logo:opacity-45 group-focus-visible/logo:[animation-play-state:running]" />
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                      <span
                        className={cn(
                          "text-3xl md:text-4xl font-semibold text-text-high transition-all duration-300 ease-[0.22,1,0.36,1]",
                          !prefersReducedMotion &&
                            "group-hover/logo:[text-shadow:0_0_24px_rgba(89,208,255,0.35)] group-focus-visible/logo:[text-shadow:0_0_24px_rgba(89,208,255,0.35)] group-hover/logo:text-white group-focus-visible/logo:text-white",
                        )}
                      >
                        {partner.name}
                      </span>
                      {partner.tagline && (
                        <span className="text-base md:text-lg text-white/70">{partner.tagline}</span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </Link>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </Section>
  )
}
