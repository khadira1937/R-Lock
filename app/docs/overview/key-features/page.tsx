import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Key Features | RLock Docs",
  description: "Explore the core features of RLock.",
}

export default function KeyFeaturesPage() {
  return (
    <DocPageWrapper
      title="Key Features"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Overview" }, { label: "Key Features" }]}
      prevPage={{ title: "What is RLock?", href: "/docs/overview/what-is-rlock" }}
      nextPage={{ title: "When to Use RLock", href: "/docs/overview/when-to-use" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Compute Budget Management</h2>
        <p>
          From <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">tx/fees.ts</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Policies:</strong> <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">BasicPolicy</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RecentFeesPolicy</code> → produce a <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">FeePlan &#123; cuLimit, cuPriceMicroLamports &#125;</code>.
          </li>
          <li>Use cases: fixed budgets vs. adaptive budgets from recent fee data.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Transaction Builder</h2>
        <p>
          From <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">tx/builder.ts</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildTransaction</code> → v0 VersionedTransaction with ComputeBudget prelude.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildAndTighten</code> → simulate then reduce CU limit with safety margins.
          </li>
          <li>
            Throws <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">TransactionTooLargeError</code> if serialize().length &gt; maxMessageSize.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Address Lookup Tables (ALTs)</h2>
        <p>
          From <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">tx/alt.ts</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AddressLookupSource</code> with implementations: <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">NoAltSource</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">StaticAltSource</code>.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">computeAltStats</code> to measure offload impact.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Submission Lanes</h2>
        <p>
          From <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">submit/l1.ts</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">submit/router.ts</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">submit/types.ts</code>:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">L1Submitter</code> (direct RPC) and <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RouterSubmitter</code> (JSON-RPC gateway).
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitLane</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitOptions</code>, <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitResult</code>.
          </li>
          <li>Retries with backoff on transient errors; optional preflight.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Typed Errors</h2>
        <p>
          From <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">errors.ts</code>:
        </p>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">PreflightFailedError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RpcRetriableError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">TransactionTooLargeError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">BlockhashStaleError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RouterJsonRpcError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">NetworkError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">InvalidIntentError</code>.
        </p>
      </div>
    </DocPageWrapper>
  )
}
