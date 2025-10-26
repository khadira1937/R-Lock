import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Ephemeral Rollups (ER) | RLock Docs",
  description: "Learn how Ephemeral Rollups reduce costs and improve throughput.",
}

export default function EphemeralRollupsPage() {
  return (
    <DocPageWrapper
      title="Ephemeral Rollups (ER)"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Concepts" }, { label: "Ephemeral Rollups (ER)" }]}
      prevPage={{ title: "Optimistic Concurrency Control", href: "/docs/concepts/occ" }}
      nextPage={{ title: "RLockClient", href: "/docs/sdk/rlock-client" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Not implemented yet. Current pieces that lay the groundwork:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Predictable compute budgets for pricing/limits.</li>
          <li>ALTs to shrink complex graphs.</li>
          <li>Lane abstraction to experiment with off-chain gateways.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
