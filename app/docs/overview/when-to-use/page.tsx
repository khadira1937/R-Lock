import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "When to Use RLock | RLock Docs",
  description: "Learn when RLock is the right choice for your Solana application.",
}

export default function WhenToUsePage() {
  return (
    <DocPageWrapper
      title="When to Use RLock"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Overview" }, { label: "When to Use RLock" }]}
      prevPage={{ title: "How it works", href: "/docs/overview/key-features" }}
      nextPage={{ title: "Install & Setup", href: "/docs/quickstart/install-setup" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>Use RLock when you need any of the following:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Multi-step flows that must be dependency-aware and size-safe under v0 limits.</li>
          <li>You’re hitting hot-account contention and need retries + smart priority-fee control.</li>
          <li>You want consistent ComputeBudget insertion without hand-tuning on every tx.</li>
          <li>You prefer pluggable ALT sources to keep messages compact.</li>
          <li>You want to switch lanes (L1 vs Router/ER) without changing your business logic.</li>
          <li>You care about end-to-end simulation before paying fees and clean, typed results after.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
