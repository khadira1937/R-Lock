import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Summary & Diff | RLock Docs",
  description: "Understand RLock performance summaries and diffs.",
}

export default function SummaryDiffPage() {
  return (
    <DocPageWrapper
      title="Summary & Diff"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Observability" }, { label: "Summary & Diff" }]}
      prevPage={{ title: "Event Schema", href: "/docs/observability/event-schema" }}
      nextPage={{ title: "Export .jsonl", href: "/docs/observability/export-jsonl" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Compute simple summaries from a transaction and its FeePlan.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import type { VersionedTransaction } from '@solana/web3.js';

export function summarize(
  tx: VersionedTransaction,
  plan: { cuLimit: number; cuPriceMicroLamports: number }
) {
  const bytes = tx.serialize().length;
  return {
    bytes,
    cuLimit: plan.cuLimit,
    cuPriceMicroLamports: plan.cuPriceMicroLamports,
    estLamports: Math.ceil((plan.cuLimit * plan.cuPriceMicroLamports) / 1_000_000),
  };
}`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
