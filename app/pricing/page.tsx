
"use client"
import { AuroraBackground } from "@/components/aurora-background"
import { FooterSection } from "@/components/footer-section"
import { Section } from "@/components/ux/Section"
import { SectionHeading } from "@/components/ux/SectionHeading"
import { SectionSeparator } from "@/components/ux/SectionSeparator"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import Head from "next/head"

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  // Pricing data
  const plans = [
    {
      name: "Dev (Fre)",
      icon: "🛠️",
      who: "Solo builders, hackathon teams",
      price: "$0",
      priceYearly: "$0",
      overage: null,
      features: [
        "SDK & planner",
        "L1 submitter",
        "100k intents/mo",
        "Community support",
      ],
      cta: "Start free",
      popular: false,
    },
    {
      name: "Builder",
      icon: "🚀",
      who: "Early dApps moving to prod",
      price: "$49/mo",
      priceYearly: "$41/mo",
      overage: "$0.50 / 1k intents overage",
      features: [
        "Everything in Dev",
        "Router submitter",
        "Retries/backoff",
        "Logs",
        "500k intents/mo",
      ],
      cta: "Get Builder",
      popular: true,
    },
    {
      name: "Pro",
      icon: "💎",
      who: "Protocols at scale",
      price: "$299/mo",
      priceYearly: "$249/mo",
      overage: "$0.40 / 1k intents overage",
      features: [
        "Priority support",
        "Advanced OCC/lanes controls",
        "Custom webhooks",
        "MEV revenue share (5%)",
        "5M intents/mo",
      ],
      cta: "Choose Pro",
      popular: false,
    },
    {
      name: "Enterprise",
      icon: "🏢",
      who: "Exchanges, aggregators, funds",
      price: "Custom (starting at $2,000/mo)",
      priceYearly: "Custom (starting at $1,667/mo)",
      overage: null,
      features: [
        "SSO",
        "On-prem/region/pin option",
        "Latency SLAs",
        "Dedicated support",
      ],
      cta: "Contact sales",
      popular: false,
    },
  ]

  // Feature comparison data
  const features = [
    { label: "SDK & Planner", values: [true, true, true, true] },
    { label: "L1 Submitter", values: [true, true, true, true] },
    { label: "Router Submitter", values: [false, true, true, true] },
    { label: "Retries/Backoff", values: [false, true, true, true] },
    { label: "Logs", values: [false, true, true, true] },
    { label: "Advanced OCC/Lanes", values: [false, false, true, true] },
    { label: "Custom Webhooks", values: [false, false, true, true] },
    { label: "MEV Revenue Share", values: [false, false, true, true] },
    { label: "Max Intents/mo", values: ["100k", "500k", "5M", "Custom"] },
    { label: "Support Level", values: ["Community", "Standard", "Priority", "Dedicated"] },
    { label: "SSO", values: [false, false, false, true] },
    { label: "On-prem/Region Pinning", values: [false, false, false, true] },
    { label: "SLAs", values: [false, false, false, true] },
  ]

  // FAQ data
  const faqs = [
    {
      q: "How is overage billed?",
      a: "Overage is billed per 1,000 intents after the included monthly quota.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, all plans are no lock-in and can be cancelled anytime.",
    },
    {
      q: "How does yearly billing work?",
      a: "Yearly billing gives you 2 months free (pay for 10, get 12). Prices update automatically when you toggle.",
    },
    {
      q: "What happens if I exceed my quota?",
      a: "You’ll be billed the overage rate for each additional 1,000 intents.",
    },
    {
      q: "How do I contact sales for Enterprise?",
      a: "Click the Contact Sales button and we’ll get in touch!",
    },
  ]

  return (
    <>
      <Head>
        <title>RLOCK — Pricing</title>
        <meta name="description" content="Transparent, competitive pricing for RLOCK. Choose the best plan for your DeFi project." />
      </Head>
      <main className="relative min-h-screen bg-page text-text-high overflow-hidden">
        <AuroraBackground intensity="medium-high" parallax={true} maskToFooter={true} />
        <div className="fixed inset-0 pointer-events-none">
          <div className="vignette" />
          <div className="noise-overlay" />
        </div>
        <div className="relative z-10 px-4 md:px-8">
          {/* Hero */}
          <section className="py-24 md:py-32 max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 18, scale: 0.995 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#59D0FF] via-[#9945FF] to-[#14F195] drop-shadow-xl mb-6 text-center"
            >
              Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-text-mid font-medium mb-6 text-center max-w-3xl mx-auto"
            >
              Simple, transparent plans for every team.
            </motion.p>

            <div className="mb-12">
              <label className="flex items-center gap-3 cursor-pointer select-none" aria-label="Billing toggle">
                <span className={`font-semibold text-lg ${!yearly ? 'text-white' : 'text-text-mid'}`}>Monthly</span>
                <button
                  type="button"
                  aria-pressed={yearly}
                  aria-label="Toggle yearly pricing"
                  className={`relative w-16 h-8 bg-[var(--section-bg)] rounded-full border border-[var(--border-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--rlock-blue)] outline-none transition-all duration-200`}
                  onClick={() => setYearly((v) => !v)}
                >
                  <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg transition-transform duration-200 ${yearly ? 'translate-x-8' : ''}`}></span>
                </button>
                <span className={`font-semibold text-lg ${yearly ? 'text-white' : 'text-text-mid'}`}>Yearly <span className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-[#59D0FF] to-[#14F195] text-xs font-bold text-white">2 months free</span></span>
              </label>
            </div>

            <SectionSeparator className="mt-16 mb-20" />

            {/* Plans Grid */}
            <section className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mt-8 justify-center">
                {plans.map((plan, idx) => (
                  <motion.div
                    key={plan.name}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.995 }}
                    whileInView={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative rounded-2xl bg-[var(--section-bg)] border border-[var(--border-subtle)] shadow-lg p-5 flex flex-col items-start text-left hover:border-[var(--rlock-blue)] hover:scale-[1.01] hover:-translate-y-1.5 transform-gpu will-change-transform transition-transform duration-300 group ${plan.popular ? 'ring-2 ring-[var(--rlock-blue)]' : ''}`}
                    aria-label={`${plan.name} plan card`}
                    style={{ minWidth: 260 }}
                  >
                    {/* Most Popular Badge */}
                    {plan.popular && (
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Most Popular</span>
                    )}
                    {/* Icon */}
                    <span className="text-3xl mb-3" aria-hidden>{plan.icon}</span>
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{plan.name}</h3>
                    <div className="text-text-mid mb-3">{plan.who}</div>
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl md:text-4xl font-extrabold">
                        {yearly ? plan.priceYearly : plan.price}
                      </span>
                      {yearly && !plan.price.toLowerCase().includes("custom") && (
                        <span className="line-through text-text-mid text-lg">{plan.price}</span>
                      )}
                    </div>
                    {plan.overage && (
                      <div className="text-sm text-text-mid mb-3">{plan.overage}</div>
                    )}
                    <ul className="mb-5 mt-2 space-y-2 text-left">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm md:text-base text-text-high">
                          <span aria-hidden className="text-[var(--rlock-blue)] mt-1">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-[var(--solana-purple)] to-[var(--solana-cyan)] text-white shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--rlock-blue)] outline-none transition-all duration-200">
                      {plan.cta}
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            <SectionSeparator className="mt-16 mb-20" />

            {/* Comparison */}
            <section className="max-w-5xl mx-auto">
              <motion.h2
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 text-left text-transparent bg-clip-text bg-gradient-to-r from-[#59D0FF] via-[#9945FF] to-[#14F195] drop-shadow-md"
              >
                Compare features
              </motion.h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2 text-sm">
                  <thead className="sticky top-0 bg-[var(--section-bg)] z-10">
                    <tr>
                      <th className="py-3 px-4 text-sm font-bold text-text-high">Feature</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="py-3 px-4 text-sm font-bold text-text-high text-center">{plan.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((row) => (
                      <tr key={row.label} className="align-top">
                        <td className="py-4 px-4 text-sm text-text-mid font-medium w-1/3">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="py-4 px-4 text-sm text-text-high text-center">
                            {typeof v === "boolean"
                              ? v
                                ? <span aria-hidden className="text-green-400 text-xl">✔</span>
                                : <span aria-hidden className="text-text-mid text-xl">—</span>
                              : <span>{v}</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <SectionSeparator className="mt-16 mb-20" />

            {/* FAQ Section */}
            <section className="max-w-5xl mx-auto">
              <motion.h2
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 text-left text-transparent bg-clip-text bg-gradient-to-r from-[#59D0FF] via-[#9945FF] to-[#14F195] drop-shadow-md"
              >
                FAQ
              </motion.h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <motion.details
                    key={faq.q}
                    className="group bg-[var(--section-bg)] rounded-2xl p-6 border border-[var(--border-subtle)]"
                    initial={false}
                    open={false}
                  >
                    <summary className="cursor-pointer list-none font-semibold text-xl md:text-2xl mb-2 outline-none">{faq.q}</summary>
                    <motion.div
                      className="text-text-mid text-base md:text-lg mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.a}
                    </motion.div>
                  </motion.details>
                ))}
              </div>
            </section>

            <SectionSeparator className="mt-16 mb-20" />

            {/* Enterprise CTA */}
            <section className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-2xl p-8 shadow-xl text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Enterprise?</h2>
                <p className="text-lg text-white mb-6">Contact us for custom pricing, SLAs, and dedicated support.</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <button className="px-8 py-3 rounded-xl font-bold text-lg bg-white text-[var(--rlock-blue)] shadow-lg focus-visible:ring-2 focus-visible:ring-[var(--rlock-blue)] outline-none transition-all duration-200">
                    Contact Sales
                  </button>
                </div>
              </div>
            </section>

            {/* Micro-copy & Footnotes */}
            <div className="max-w-5xl mx-auto mt-12 text-left text-sm text-text-mid">
              <div className="mb-2">Overage is billed per 1,000 intents after the included monthly quota.</div>
              <div className="mb-2">Example: 620k intents on Builder (monthly) = $49 + (120 × $0.50) = $109.</div>
              <div className="mb-2">Pricing subject to change; taxes may apply.</div>
              <div className="mb-2">Cancel anytime. No lock-in.</div>
            </div>
          </section>
          <FooterSection />
        </div>
      </main>
    </>
  )
}
