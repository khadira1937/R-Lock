import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Lock-Hint Lanes | RLock Docs",
  description: "Learn how lock-hint lanes optimize execution.",
}

export default function LockHintLanesPage() {
  return (
    <DocPageWrapper
      title="Lock-Hint Lanes"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Concepts" }, { label: "Lock-Hint Lanes" }]}
      prevPage={{ title: "DAG & Dependencies", href: "/docs/concepts/dag-dependencies" }}
      nextPage={{ title: "Optimistic Concurrency Control", href: "/docs/concepts/occ" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitLane</code> gives you two ways to send:
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">L1 lane</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Direct RPC via <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">L1Submitter</code>.</li>
          <li>Full control of preflight and logs.</li>
          <li>Great for integration & debugging.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Router lane</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>JSON-RPC via <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RouterSubmitter</code> to a gateway you control.</li>
          <li>Often <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">skipPreflight: true</code> on the gateway for throughput.</li>
          <li>Good for managed infra & higher load.</li>
        </ul>

        <p className="mt-6">
          <strong>Guidance:</strong> start on L1; switch to Router for gateway-backed runs.
        </p>
      </div>
    </DocPageWrapper>
  )
}
