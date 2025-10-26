import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "AMM Hot-Pool | RLock Docs",
  description: "Learn how RLock optimizes AMM hot-pool scenarios.",
}

export default function AMMHotPoolPage() {
  return (
    <DocPageWrapper
      title="AMM Hot-Pool"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Scenarios" }, { label: "AMM Hot-Pool" }]}
      prevPage={{ title: "Events & Error Codes", href: "/docs/sdk/events-errors" }}
      nextPage={{ title: "Airdrop Crowd", href: "/docs/scenarios/airdrop-crowd" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Under contention, increasing <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">cuPriceMicroLamports</code> helps the scheduler.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { CpsrClient, SubmitLane, transferIntent, BasicPolicy, RecentFeesPolicy } from '@rlock/cpsr-sdk';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function run() {
  const payer = Keypair.generate();
  const airdrop = await connection.requestAirdrop(payer.publicKey, 3 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdrop, 'confirmed');

  const hot = Keypair.generate().publicKey;

  const clientBasic = new CpsrClient({ connection, payer, feePolicy: new BasicPolicy() });
  const clientRecent = CpsrClient.withRecentFees({ connection, payer, percentile: 0.9, useEma: true });

  const make = (lamports: number) => transferIntent({ from: payer.publicKey, to: hot, lamports });

  await clientBasic.buildAndSubmit({
    intents: [make(50_000)],
    cuLimit: 200_000,
    cuPrice: 200,
    submitOptions: { lane: SubmitLane.L1, skipPreflight: false, maxRetries: 5 },
  });

  await clientBasic.buildAndSubmit({
    intents: [make(60_000)],
    cuLimit: 200_000,
    cuPrice: 3_000,
    submitOptions: { lane: SubmitLane.L1, skipPreflight: false, maxRetries: 5 },
  });

  await clientRecent.buildAndSubmit({
    intents: [make(70_000)],
    submitOptions: { lane: SubmitLane.L1, maxRetries: 5 },
  });
}
run().catch(console.error);`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
