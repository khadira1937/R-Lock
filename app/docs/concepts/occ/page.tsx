import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Optimistic Concurrency Control | RLock Docs",
  description: "Understand OCC and how it enables parallel execution.",
}

export default function OCCPage() {
  return (
    <DocPageWrapper
      title="Optimistic Concurrency Control"
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts" },
        { label: "Optimistic Concurrency Control" },
      ]}
      prevPage={{ title: "Lock-Hint Lanes", href: "/docs/concepts/lock-hint-lanes" }}
      nextPage={{ title: "Ephemeral Rollups (ER)", href: "/docs/concepts/ephemeral-rollups" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Hot accounts create contention. RLock helps you push through.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Tools</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Retries with backoff in both submitters (<code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitOptions.maxRetries</code>).</li>
          <li>Priority fees via <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">cuPriceMicroLamports</code> (Compute Unit price) to be scheduled sooner.</li>
          <li>Optional tightening (<code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildAndTighten</code>) to reduce wasted CU.</li>
        </ul>

        <p className="mt-6">
          In hot-account tests, batches of transfers succeed with retries; increasing{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">cuPriceMicroLamports</code> tends to improve latency under load.
        </p>
      </div>
    </DocPageWrapper>
  )
}
