import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Common Errors & Fixes | RLock Docs",
  description: "Troubleshoot common RLock errors.",
}

export default function CommonErrorsPage() {
  return (
    <DocPageWrapper
      title="Common Errors & Fixes"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Troubleshooting" }, { label: "Common Errors & Fixes" }]}
      prevPage={{ title: "Export .jsonl", href: "/docs/observability/export-jsonl" }}
      nextPage={{ title: "Reduced-Motion Mode", href: "/docs/troubleshooting/reduced-motion" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">PreflightFailedError</h2>
        <p>
          <strong>Cause:</strong> Simulation failed; see error.logs.
        </p>
        <p>
          <strong>Fix:</strong> Check balances/program rules; reduce CU or split instructions.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">RpcRetriableError (429)</h2>
        <p>
          <strong>Cause:</strong> Rate limiting or throttling.
        </p>
        <p>
          <strong>Fix:</strong> Backoff & retry; reduce burst; raise cuPriceMicroLamports.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">TransactionTooLargeError</h2>
        <p>
          <strong>Cause:</strong> Serialized tx exceeds maxMessageSize.
        </p>
        <p>
          <strong>Fix:</strong> Use ALTs or split into multiple transactions.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">BlockhashStaleError</h2>
        <p>
          <strong>Cause:</strong> Blockhash expired before submit.
        </p>
        <p>
          <strong>Fix:</strong> Rebuild with fresh blockhash.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">RouterJsonRpcError / NetworkError</h2>
        <p>
          <strong>Cause:</strong> Router/transport issues.
        </p>
        <p>
          <strong>Fix:</strong> Inspect code/message; retry or switch lanes.
        </p>

        <p className="mt-6">
          Other Solana runtime errors via preflight logs: InsufficientFundsForRent, Blockhash not found, Account in use.
        </p>
      </div>
    </DocPageWrapper>
  )
}
