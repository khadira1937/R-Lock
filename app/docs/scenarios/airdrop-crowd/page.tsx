import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Airdrop Crowd | RLock Docs",
  description: "Learn how RLock optimizes airdrop distributions.",
}

export default function AirdropCrowdPage() {
  return (
    <DocPageWrapper
      title="Airdrop Crowd"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Scenarios" }, { label: "Airdrop Crowd" }]}
      prevPage={{ title: "AMM Hot-Pool", href: "/docs/scenarios/amm-hot-pool" }}
      nextPage={{ title: "NFT Mint-Style", href: "/docs/scenarios/nft-mint-style" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>
          Many recipients in one or more messages with size headroom.
        </p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { buildTransaction, BasicPolicy, transferIntent, TransactionTooLargeError } from '@rlock/cpsr-sdk';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RPC = 'https://api.devnet.solana.com';

async function run() {
  const connection = new Connection(RPC, 'confirmed');
  const payer = Keypair.generate();
  const airdropSig = await connection.requestAirdrop(payer.publicKey, 3 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSig, 'confirmed');

  const recipients = Array.from({ length: 20 }, () => Keypair.generate().publicKey);
  const intents = recipients.map((to) => transferIntent({ from: payer.publicKey, to, lamports: 50_000 }));

  const plan = await new BasicPolicy().suggest();
  const { blockhash } = await connection.getLatestBlockhash('confirmed');

  try {
    const tx = await buildTransaction({ intents, feePlan: plan, recentBlockhash: blockhash, payer: payer.publicKey });
    // If it fits, submit once; otherwise catch and split.
  } catch (e) {
    if (e instanceof TransactionTooLargeError) {
      // Split into chunks (see Concepts → DAG & Dependencies)
    } else {
      throw e;
    }
  }
}
run().catch(console.error);`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
