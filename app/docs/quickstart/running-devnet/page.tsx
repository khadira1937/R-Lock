import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Running on Devnet | RLock Docs",
  description: "Deploy and test RLock on Solana devnet.",
}

export default function RunningDevnetPage() {
  return (
    <DocPageWrapper
      title="Running on Devnet"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Quickstart" }, { label: "Running on Devnet" }]}
      prevPage={{ title: "Minimal Example", href: "/docs/quickstart/minimal-example" }}
      nextPage={{ title: "DAG & Dependencies", href: "/docs/concepts/dag-dependencies" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`# save as minimal-example.ts
node -v                 # ensure >= 18
npm i @rlock/cpsr-sdk @solana/web3.js tsx
RPC_URL=https://api.devnet.solana.com npx tsx minimal-example.ts`}</code>
        </pre>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Expected shape</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`Signature: 3abc...xyz
Explorer: https://explorer.solana.com/tx/3abc...xyz?cluster=devnet`}</code>
        </pre>

        <p className="mt-4">
          <strong>Warning:</strong> Airdrops may be rate limited. See Troubleshooting → Devnet Limits & Faucet.
        </p>
      </div>
    </DocPageWrapper>
  )
}
