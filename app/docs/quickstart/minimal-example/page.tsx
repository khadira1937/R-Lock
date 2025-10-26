import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Minimal Example | RLock Docs",
  description: "Run your first RLock transaction.",
}

export default function MinimalExamplePage() {
  return (
    <DocPageWrapper
      title="Minimal Example"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Quickstart" }, { label: "Minimal Example" }]}
      prevPage={{ title: "Install & Setup", href: "/docs/quickstart/install-setup" }}
      nextPage={{ title: "Running on Devnet", href: "/docs/quickstart/running-devnet" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Build a transfer intent → construct a v0 transaction → submit via L1 with preflight → confirm on devnet.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`// minimal-example.ts
import {
  buildTransaction,
  BasicPolicy,
  SubmitLane,
  L1Submitter,
  transferIntent,
} from '@rlock/cpsr-sdk';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RPC = process.env.RPC_URL ?? 'https://api.devnet.solana.com';

async function main() {
  const connection = new Connection(RPC, 'confirmed');
  const payer = Keypair.generate();

  // Fund the payer (devnet only)
  const airdropSig = await connection.requestAirdrop(payer.publicKey, 2 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSig, 'confirmed');

  // Build one transfer intent
  const to = Keypair.generate().publicKey;
  const intent = transferIntent({ from: payer.publicKey, to, lamports: 100_000 });

  // Fee plan + recent blockhash
  const feePlan = await new BasicPolicy().suggest();
  const { blockhash } = await connection.getLatestBlockhash('confirmed');

  // Build v0 transaction (ComputeBudget prelude auto-inserted)
  const tx = await buildTransaction({
    intents: [intent],
    feePlan,
    recentBlockhash: blockhash,
    payer: payer.publicKey,
  });

  // Submit via L1 (preflight enabled)
  const submitter = new L1Submitter(connection);
  const res = await submitter.submit(tx, [payer], { lane: SubmitLane.L1, skipPreflight: false });

  console.log('Signature:', res.signature);
  console.log('Explorer:', \`https://explorer.solana.com/tx/\${res.signature}?cluster=devnet\`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
