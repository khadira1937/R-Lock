"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KPIPill } from "@/components/kpi-pill"
import { AuroraBackground } from "@/components/aurora-background"
import { FooterSection } from "@/components/footer-section"
import { StaticComparison } from "@/components/static-comparison"
import Partners from "@/components/sections/Partners"
import { Section } from "@/components/ux/Section"
import { SectionHeading } from "@/components/ux/SectionHeading"
import { SectionSeparator } from "@/components/ux/SectionSeparator"
import { AnimatedVerticalDivider } from "@/components/ux/AnimatedVerticalDivider"
import { ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const CinematicRLockExplainer = dynamic(
  () =>
    import("@/components/Explainers/CinematicRLockExplainer").then((mod) => ({
      default: mod.CinematicRLockExplainer,
    })),
  { ssr: false },
)

export default function Home() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const kpis = [
    { label: "Success %", value: "100", delta: "", positive: true },
    { label: "P50 Latency", value: "245ms", delta: "", positive: true },
    { label: "P90 Latency", value: "892ms", delta: "", positive: true },
    { label: "CU / tx", value: "4,250", delta: "", positive: true },
    { label: "Retention", value: "12%", delta: "", positive: true },
    { label: "Savings", value: "$2.4K", delta: "", positive: true },
  ]

  return (
    <main className="relative min-h-screen bg-page text-text-high overflow-hidden">
      <AuroraBackground intensity="medium-high" parallax={true} maskToFooter={true} />

      <div className="fixed inset-0 pointer-events-none">
        <div className="vignette" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <Section variant="hero" className="overflow-hidden" verticalPadding="py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-center">
            {/* Left: Copy & CTAs */}
            <div className="space-y-10 lg:space-y-12">
              <SectionHeading
                eyebrow="RLock"
                title="Smarter DeFi transactions on Solana."
                subtitle="Bundle complex intents into one reliable flow—faster, cheaper, and conflict-aware."
                titleAs="h1"
                align="left"
                titleClassName="text-fluid-hero"
                subtitleClassName="text-fluid-body-large"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/docs" className="no-underline-effect">
                  <motion.div
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.03, y: prefersReducedMotion ? 0 : -2 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#9945FF] via-[#59D0FF] to-[#14F195] text-white font-semibold hover:shadow-2xl hover:shadow-[#2C6BFF]/70 transition-all duration-300 text-base px-8 py-6"
                    >
                      Run the Live Demo
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/docs" className="no-underline-effect">
                  <motion.div
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.03, y: prefersReducedMotion ? 0 : -2 }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[var(--border-hover)] text-text-high hover:bg-[var(--section-bg)] hover:shadow-xl hover:shadow-[var(--rlock-blue)]/30 transition-all duration-300 bg-transparent text-base px-8 py-6"
                    >
                      Read the Docs
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right: KPI Pills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="grid grid-cols-2 gap-3 lg:gap-4"
            >
              {kpis.map((kpi, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{
                    scale: prefersReducedMotion ? 1 : 1.05,
                    y: prefersReducedMotion ? 0 : -4,
                    boxShadow: prefersReducedMotion
                      ? "none"
                      : "0 0 30px rgba(44, 107, 255, 0.4), 0 15px 50px rgba(0, 0, 0, 0.4)",
                  }}
                  transition={{
                    duration: 0.15,
                    delay: 0.6 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <KPIPill {...kpi} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Problem Section */}
        <Section className="pt-24 md:pt-32 lg:pt-40">
          <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />
          
          <SectionHeading
            title="What's breaking DeFi UX today"
            align="left"
            className="mb-20 lg:mb-24"
            titleClassName="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          />

          <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 lg:gap-20">
            {/* Reality Today - Left Lane */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, margin: "-100px" }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-high">
                Reality Today
              </h3>
              <ul className="space-y-5">
                {[
                  "15–25% of complex DeFi transactions fail during busy periods",
                  "Users lose $21M monthly in wasted fees",
                  "40% abandon after the first failed transaction",
                  "Multi-step operations can cost up to 4× more",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.3 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.08,
                    }}
                    viewport={{ once: false }}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-[var(--neon-error)] font-bold text-xl mt-1">•</span>
                    <span className="text-text-mid text-base md:text-lg leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Animated Divider */}
            <div className="hidden md:block w-px relative">
              <AnimatedVerticalDivider />
            </div>

            {/* Why It Happens - Right Lane */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.5 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: false, margin: "-100px" }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-high">
                Why It Happens
              </h3>
              <ul className="space-y-5">
                {[
                  "Network congestion during trading spikes",
                  "Compute limits on complex flows",
                  "Hot pools/accounts become locked",
                  "Each step can fail independently",
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.3 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.08,
                    }}
                    viewport={{ once: false }}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-[var(--neon-warn)] font-bold text-xl mt-1">•</span>
                    <span className="text-text-mid text-base md:text-lg leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* Meet RLock Section */}
        <Section className="pt-24 md:pt-32 lg:pt-40">
          <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />
          
          <SectionHeading
            title="Meet RLock"
            subtitle="RLock plans, bundles, and executes your intents as a single optimized transaction on Solana for much higher reliability and lower cost."
            align="left"
            className="mb-20 lg:mb-24"
            titleClassName="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          />

          {/* Animation */}
          <div className="max-w-[1280px] mx-auto">
            <CinematicRLockExplainer />
          </div>
        </Section>

        {/* Head-to-Head Comparison Section */}
        <Section className="pt-24 md:pt-32 lg:pt-40">
          <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />
          
          <SectionHeading
            title="Head-to-Head Comparison"
            subtitle="Watch how RLock's conflict-aware lanes and OCC DAG execution outperform plain Solana under contention."
            align="center"
            className="mb-20 lg:mb-24 max-w-4xl mx-auto"
            titleClassName="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          />
          
          <StaticComparison />
        </Section>

        {/* Target Metrics Section */}
        <Section className="pt-24 md:pt-32 lg:pt-40">
          <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />
          
          <SectionHeading
            title="Target Metrics"
            align="left"
            className="mb-20 lg:mb-24"
            titleClassName="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { metric: "95%+", desc: "success rate for bundled operations (Achieved: 100% in demos)" },
              { metric: "30–60%", desc: "compute unit savings (Achieved: 4% in 41-intent test; scales with ALTs)" },
              { metric: "< 2s", desc: "confirmation times (Achieved: P50 4.3s total / 535ms exec)" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                }}
                viewport={{ once: false }}
                className="p-8 lg:p-10 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-[var(--rlock-blue)] mb-3">{item.metric}</div>
                <p className="text-text-mid text-base md:text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Partners />

        {/* Getting Started Section */}
        <Section className="pt-24 md:pt-32 lg:pt-40">
          <SectionSeparator className="mb-24 md:mb-32 lg:mb-40" />
          
          <SectionHeading
            title="Getting Started"
            align="left"
            className="mb-20 lg:mb-24"
            titleClassName="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "For Developers",
                desc: "Integrate the SDK for bundled operations. Install: npm i @cpsr/sdk @solana/web3.js",
                cta: "Read the Docs",
                href: "/docs",
              },
              {
                title: "For Protocols",
                desc: "White-label bundling solutions and design-partner pilots.",
                cta: "Contact",
                href: "/about",
              },
              {
                title: "For Users",
                desc: "Try it live on devnet (funded test wallets; non-production).",
                cta: "Run the Demo",
                href: "/docs",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                }}
                viewport={{ once: false }}
                className="p-8 lg:p-10 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-text-high mb-3">{item.title}</h3>
                  <p className="text-text-mid mb-6 text-base md:text-lg">{item.desc}</p>
                </div>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.02,
                      boxShadow: prefersReducedMotion
                        ? "none"
                        : "0 0 30px rgba(89, 208, 255, 0.4), 0 10px 40px rgba(0, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0">
                      {item.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>

        <FooterSection />
      </div>
    </main>
  )
}
