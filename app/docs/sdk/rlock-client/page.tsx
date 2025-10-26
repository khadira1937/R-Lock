import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "RLockClient | RLock Docs",
  description: "API reference for the RLockClient class.",
}

export default function RLockClientPage() {
  return (
    <DocPageWrapper
      title="RLockClient"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "SDK Reference" }, { label: "RLockClient" }]}
      prevPage={{ title: "Ephemeral Rollups (ER)", href: "/docs/concepts/ephemeral-rollups" }}
      nextPage={{ title: "buildDAG()", href: "/docs/sdk/build-dag" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>This page covers symbols exported from @rlock/cpsr-sdk (via src/index.ts).</p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Client</h2>
        <p>
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">CpsrClient</code>
        </p>
        <p className="ml-4">Build & submit with reasonable defaults.</p>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">CpsrClient.withRecentFees(&#123; connection, payer, percentile?, useEma? &#125;)</code> is a handy factory.
        </p>

        <h3 className="text-xl font-bold text-text-high mt-6 mb-3">Example</h3>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { CpsrClient, SubmitLane, transferIntent } from '@rlock/cpsr-sdk';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');
const payer = Keypair.generate();

const airdrop = await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL);
await connection.confirmTransaction(airdrop, 'confirmed');

const client = CpsrClient.withRecentFees({ connection, payer, percentile: 0.75, useEma: true });

const result = await client.buildAndSubmit({
  intents: [transferIntent({ from: payer.publicKey, to: Keypair.generate().publicKey, lamports: 100_000 })],
  cuLimit: 300_000,
  tighten: true,
  submitOptions: { lane: SubmitLane.L1, skipPreflight: false },
});

console.log(result.signature);`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Intents</h2>
        <p>Types and builders:</p>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildIntent</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">transferIntent</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">memoIntent</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">customIntent</code>
        </p>
        <p className="ml-4">
          Types: <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AccessKind</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AccountAccess</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AccountVersion</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">UserIntent</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">IntentOptions</code>
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Fees</h2>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">FeePlan</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">FeePolicy</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">BasicPolicy</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RecentFeesPolicy</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RecentFeesPolicyOptions</code>
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">ALTs</h2>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AddressLookupSource</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">NoAltSource</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">StaticAltSource</code>
        </p>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AltStats</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">AltResolution</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">computeAltStats</code>
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Builder</h2>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">BuildTransactionOptions</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildTransaction</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildAndTighten</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">estimateComputeUnits</code>
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Submit</h2>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitLane</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitOptions</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitResult</code>
        </p>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">L1Submitter</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RouterSubmitter</code>
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Errors</h2>
        <p className="ml-4">
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">CpsrError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">BlockhashStaleError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">PreflightFailedError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RpcRetriableError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">TransactionTooLargeError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RouterJsonRpcError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">NetworkError</code>,{" "}
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">InvalidIntentError</code>
        </p>

        <p className="mt-6">
          Logger/LogLevel exist but are internal and not a stable surface.
        </p>
      </div>
    </DocPageWrapper>
  )
}
