import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "What is RLock? | RLock Docs",
  description: "Introduction to RLock's Conflict-Parallel Scheduled Routing architecture.",
}

export default function WhatIsRLockPage() {
  return (
    <DocPageWrapper
      title="What is RLock?"
      description="Understand the core concepts and benefits of RLock."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Overview", href: "/docs/overview/what-is-rlock" },
        { label: "What is RLock?" },
      ]}
      nextPage={{ title: "Key Features", href: "/docs/overview/key-features" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          RLock is a pragmatic SDK that turns many user intents into safe, efficient Solana transactions. It gives you:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Compute budget tuning (reasonable CU limits and priority fees).</li>
          <li>ALT offloading to shrink message size.</li>
          <li>Message-size safety with explicit checks for v0 transactions.</li>
          <li>Reliable submission lanes with retries and optional preflight.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Why it matters</h2>
        <p>
          Real dApps combine multiple instructions and still need to fit Solana's message size while finishing quickly
          under load. RLock's small, typed surface helps you assemble, size-check, and send transactions without footguns.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">What RLock does for you</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Inserts ComputeBudget instructions (limit + price) based on a policy.</li>
          <li>Optionally resolves Address Lookup Tables (ALTs) to cut byte size.</li>
          <li>Builds v0 VersionedTransactions and throws if they exceed limits.</li>
          <li>Sends via L1 RPC or a Router you control — with retries/backoff.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
