import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "DAG & Dependencies | RLock Docs",
  description: "Understand how RLock builds and executes DAGs.",
}

export default function DAGDependenciesPage() {
  return (
    <DocPageWrapper
      title="DAG & Dependencies"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Concepts" }, { label: "DAG & Dependencies" }]}
      prevPage={{ title: "Running on Devnet", href: "/docs/quickstart/running-devnet" }}
      nextPage={{ title: "Lock-Hint Lanes", href: "/docs/concepts/lock-hint-lanes" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          RLock's DAG is implicit: pass a list of intents to buildTransaction. The builder:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Inserts ComputeBudget instructions.</li>
          <li>Optionally resolves ALTs.</li>
          <li>Compiles a v0 message.</li>
          <li>
            Checks size and throws <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">TransactionTooLargeError</code> if it exceeds maxMessageSize (default 1232 bytes).
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Builder checks</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">TransactionTooLargeError</code> when serialized.length &gt; maxMessageSize.
          </li>
          <li>Uses your <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AddressLookupSource</code> to offload keys and shorten the message.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">If it overflows</h2>
        <p>Split the intents across multiple transactions.</p>
        <p className="mt-4">Binary-search "chunker" (userland helper, not part of SDK)</p>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { buildTransaction, TransactionTooLargeError, type BuildTransactionOptions } from '@rlock/cpsr-sdk';

export async function buildInChunks(
  base: Omit<BuildTransactionOptions, 'intents'>,
  intents: BuildTransactionOptions['intents'],
  maxMessageSize = 1232
) {
  const txs = [];
  let start = 0;
  while (start < intents.length) {
    let end = intents.length;
    let built: any = null;

    // Find the largest slice that fits
    let lo = start + 1, hi = intents.length;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      try {
        built = await buildTransaction({ ...base, intents: intents.slice(start, mid), maxMessageSize });
        lo = mid + 1; end = mid;
      } catch (e) {
        if (e instanceof TransactionTooLargeError) hi = mid - 1;
        else throw e;
      }
    }

    if (!built) {
      await buildTransaction({ ...base, intents: intents.slice(start, start + 1), maxMessageSize });
    }
    txs.push(built!);
    start = end;
  }
  return txs;
}`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
