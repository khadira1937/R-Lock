import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Event Schema | RLock Docs",
  description: "Reference for RLock event schema.",
}

export default function EventSchemaPage() {
  return (
    <DocPageWrapper
      title="Event Schema"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Observability" }, { label: "Event Schema" }]}
      prevPage={{ title: "NFT Mint-Style", href: "/docs/scenarios/nft-mint-style" }}
      nextPage={{ title: "Summary & Diff", href: "/docs/observability/summary-diff" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>The submitters return:</p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`type SubmitResult = {
  signature: string;
  lane: 'l1' | 'router';
  preflightSkipped: boolean;
  attempts: number;
}`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Recommended log line</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`type SubmitLog = {
  at: string; // ISO timestamp
  signature: string;
  lane: 'l1' | 'router';
  preflightSkipped: boolean;
  attempts: number;
  msToConfirm?: number;
};`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
