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
      nextPage={{ title: "How it works ", href: "/docs/overview/key-features" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          RLock is an execution layer + SDK that turns a multi-step user goal (swap → LP → stake, etc.) into safe, efficient Solana transactions. Instead of firing 5 fragile txs and hoping nothing breaks, RLock plans the whole flow off-chain, splits it into conflict-aware chunks, budgets fees/compute, simulates end-to-end, then submits on the best rail (L1 or ER-style lane on devnet).
        </p>
       

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Why it matters</h2>
        <p>
          Real DeFi flows fail disproportionately during network spikes. Users pay fees on partial progress, get stuck on hot accounts, and abandon after the first fail. RLock replaces that chaos with one reliable action that’s fee-aware, size-safe, and contention-resilient.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">What RLock does for you</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Capture intents, not low-level ixs. Express the whole goal once; we plan the dependency order.</li>
          <li>Compute budget tuning. Apply sensible CU limit & priority fee based on policy (fixed or recent-fees).</li>
          <li>Message-size safety. Build v0 transactions with explicit byte-size checks and ALT offloading.</li>
          <li>Lane selection. Choose between direct L1 and a high-throughput ER-style rail (devnet) automatically.</li>
          <li>Retries & preflight. Robust submission with backoff and optional preflight per lane.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
