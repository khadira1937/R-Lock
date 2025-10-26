import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "NFT Mint-Style | RLock Docs",
  description: "Learn how RLock optimizes NFT mint scenarios.",
}

export default function NFTMintStylePage() {
  return (
    <DocPageWrapper
      title="NFT Mint-Style"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Scenarios" }, { label: "NFT Mint-Style" }]}
      prevPage={{ title: "Airdrop Crowd", href: "/docs/scenarios/airdrop-crowd" }}
      nextPage={{ title: "Event Schema", href: "/docs/observability/event-schema" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Mix multiple program instructions and memos; split if message-size constrained.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { buildTransaction, transferIntent, memoIntent, BasicPolicy } from '@rlock/cpsr-sdk';
import { Connection, Keypair } from '@solana/web3.js';

async function run() {
  const connection = new Connection('https://api.devnet.solana.com');
  const payer = Keypair.generate();

  const intents = [
    memoIntent({ payer: payer.publicKey, message: 'Mint wave' }),
    memoIntent({ payer: payer.publicKey, message: 'Batch 2' }),
    transferIntent({ from: payer.publicKey, to: Keypair.generate().publicKey, lamports: 10_000 }),
  ];

  const plan = await new BasicPolicy().suggest();
  const { blockhash } = await connection.getLatestBlockhash('finalized');

  const tx = await buildTransaction({ intents, feePlan: plan, recentBlockhash: blockhash, payer: payer.publicKey });
}
run().catch(console.error);`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
