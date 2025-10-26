import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "buildDAG() | RLock Docs",
  description: "API reference for the buildDAG method.",
}

export default function BuildDAGPage() {
  return (
    <DocPageWrapper
      title="buildDAG(intents)"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "SDK Reference" }, { label: "buildDAG()" }]}
      prevPage={{ title: "RLockClient", href: "/docs/sdk/rlock-client" }}
      nextPage={{ title: "execute()", href: "/docs/sdk/execute" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Use <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">buildTransaction</code> to combine multiple intents into a single v0. If you overflow maxMessageSize (default 1232), split across messages.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { buildTransaction, BasicPolicy, transferIntent, memoIntent } from '@rlock/cpsr-sdk';
import { Connection, Keypair } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');
const payer = Keypair.generate();

const intents = [
  transferIntent({ from: payer.publicKey, to: Keypair.generate().publicKey, lamports: 50_000 }),
  memoIntent({ payer: payer.publicKey, message: 'hello' }),
];

const plan = await new BasicPolicy().suggest();
const { blockhash } = await connection.getLatestBlockhash('confirmed');

const tx = await buildTransaction({
  intents,
  feePlan: plan,
  recentBlockhash: blockhash,
  payer: payer.publicKey,
});`}</code>
        </pre>

        <p className="mt-6">
          For overflow handling, see Concepts → DAG & Dependencies (binary-search chunker).
        </p>
      </div>
    </DocPageWrapper>
  )
}
