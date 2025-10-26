"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Mail, Zap, Layers, Rocket, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AboutAurora } from "@/components/about-aurora"
import { FooterSection } from "@/components/footer-section"

export default function AboutPage() {
  const steps = [
    { step: "Intent", desc: "Declare what you want to do", icon: Zap },
    { step: "Plan", desc: "Conflict-aware execution path", icon: Layers },
    { step: "Bundle", desc: "Merge flows for efficiency", icon: Rocket },
    { step: "Execute", desc: "Single reliable transaction", icon: CheckCircle },
  ]

  const roadmap = [
    { quarter: "Q1", title: "Devnet pilots with partner protocols" },
    { quarter: "Q2", title: "Mainnet beta + SDK v1" },
    { quarter: "Q3", title: "Advanced routing & additional scenarios" },
  ]

  return (
    <main className="relative min-h-screen bg-page text-text-high overflow-hidden">
      <AboutAurora />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="vignette" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-20">
        {/* Hero */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold text-[var(--rlock-blue)] uppercase tracking-wider">About RLock</p>
              <h1 className="text-5xl md:text-6xl font-bold text-text-high leading-tight">
                Making complex DeFi just work.
              </h1>
              <p className="text-xl text-text-mid max-w-2xl leading-relaxed">
                A rollup-informed execution layer that turns multi-step Solana workflows into one reliable flow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What We're Building */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6 border-t border-[var(--border-subtle)] pt-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-high">What We're Building</h2>
              <p className="text-lg text-text-mid leading-relaxed" style={{ maxWidth: "860px" }}>
                RLock fixes Solana DeFi's biggest headache—failed multi-step transactions and wasted fees—by planning,
                bundling, and executing intents as a single optimized flow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Now */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-high">Why Now</h2>
              <p className="text-lg text-text-mid leading-relaxed" style={{ maxWidth: "860px" }}>
                Solana DeFi is booming but infra hasn't caught up; users lose millions to failures. RLock repairs the
                foundation with conflict-aware planning and compact settlement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-high">How It Works</h2>
            </motion.div>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
              {steps.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-6 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--rlock-blue)]/20"
                  >
                    <Icon className="w-6 h-6 text-[var(--rlock-blue)] mb-3" />
                    <div className="text-2xl font-bold text-[var(--rlock-blue)] mb-3">{item.step}</div>
                    <p className="text-text-mid text-sm">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Proof & Targets */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-high">Proof & Targets</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { metric: "95–99%", desc: "success vs 70–85% today" },
                { metric: "30–60%", desc: "CU savings; 2–5× fewer instructions" },
                { metric: "< 2s", desc: "confirmation goals" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] text-center hover:border-[var(--neon-success)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--neon-success)]/20"
                >
                  <div className="text-4xl font-bold text-[var(--rlock-blue)] mb-2">{item.metric}</div>
                  <p className="text-text-mid">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Developers / Protocols */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-text-high">For Developers</h3>
                <p className="text-text-mid leading-relaxed">SDK for bundled operations. Quickstart in Docs.</p>
                <Link href="/docs">
                  <Button className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0">
                    Read the Docs
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-text-high">For Protocols</h3>
                <p className="text-text-mid leading-relaxed">White-label routing & ER options.</p>
                <a href="mailto:hello@rlock.dev">
                  <Button className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0">
                    Talk to us
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ER Section */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--neon-info)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--neon-info)]/20 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--solana-purple)] via-[var(--solana-cyan)] to-[var(--solana-green)]" />
              <h3 className="text-2xl font-bold text-text-high mb-4">Ephemeral Rollups & Compact Settlement</h3>
              <p className="text-text-mid leading-relaxed">
                RLock taps MagicBlock's Ephemeral Rollups to execute intents off-chain and anchor a compact settlement
                transaction on Solana. Enable the ER path with{" "}
                <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-sm font-mono">--er-enabled</code> to bundle
                compute-heavy flows into a single, low-cost settlement proof.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-high">Roadmap</h2>
            </motion.div>

            <div className="space-y-4">
              {roadmap.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] hover:border-[var(--rlock-blue)] transition-all duration-300 flex gap-4"
                >
                  <div className="text-lg font-bold text-[var(--rlock-blue)] min-w-fit">{item.quarter}</div>
                  <p className="text-text-mid">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-4 md:px-8 py-24 md:py-32 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-high mb-4">Get in Touch</h2>
                <p className="text-lg text-text-mid">Questions? We'd love to hear from you.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@rlock.dev">
                  <Button className="bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white border-0">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-[var(--border-subtle)] text-text-high hover:bg-[var(--section-bg)] bg-transparent"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-[var(--border-subtle)] text-text-high hover:bg-[var(--section-bg)] bg-transparent"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    X/Twitter
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </main>
  )
}
