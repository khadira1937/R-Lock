import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Events & Error Codes | RLock Docs",
  description: "Reference for RLock events and error codes.",
}

export default function EventsErrorsPage() {
  return (
    <DocPageWrapper
      title="Events & Error Codes"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "SDK Reference" }, { label: "Events & Error Codes" }]}
      prevPage={{ title: "execute()", href: "/docs/sdk/execute" }}
      nextPage={{ title: "AMM Hot-Pool", href: "/docs/scenarios/amm-hot-pool" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">SubmitResult (what you can log)</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>signature: string</li>
          <li>lane: 'l1' | 'router'</li>
          <li>preflightSkipped: boolean</li>
          <li>attempts: number</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Common errors</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">PreflightFailedError</code> — simulation failed; inspect error.logs.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">RpcRetriableError</code> — throttling/429; back off and retry.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">TransactionTooLargeError</code> — exceeded maxMessageSize.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">BlockhashStaleError</code> — blockhash expired; rebuild/refresh.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">RouterJsonRpcError</code> — router JSON-RPC error.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">NetworkError</code> — transport failures; retryable.
          </li>
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-error)]">InvalidIntentError</code> — rejected intent/instruction.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Handling pattern</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`try {
  const res = await submitter.submit(tx, [payer], { skipPreflight: false });
  await connection.confirmTransaction(res.signature, 'confirmed');
} catch (e) {
  // size split, inspect preflight logs, or backoff on 429
}`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
