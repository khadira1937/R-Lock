import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "execute() | RLock Docs",
  description: "API reference for the execute method.",
}

export default function ExecutePage() {
  return (
    <DocPageWrapper
      title="execute(plan, options)"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "SDK Reference" }, { label: "execute()" }]}
      prevPage={{ title: "buildDAG()", href: "/docs/sdk/build-dag" }}
      nextPage={{ title: "Events & Error Codes", href: "/docs/sdk/events-errors" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">L1Submitter</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { L1Submitter, SubmitLane } from '@rlock/cpsr-sdk';
const submitter = new L1Submitter(connection);
const res = await submitter.submit(tx, [payer], { lane: SubmitLane.L1, skipPreflight: false, maxRetries: 3 });
await connection.confirmTransaction(res.signature, 'confirmed');`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">RouterSubmitter</h2>
        <p>Use when posting to a JSON-RPC Router you control (often skipPreflight on the gateway).</p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Returns</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`type SubmitResult = {
  signature: string;
  lane: 'l1' | 'router';
  preflightSkipped: boolean;
  attempts: number;
}`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
