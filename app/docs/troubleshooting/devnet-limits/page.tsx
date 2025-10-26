import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Devnet Limits & Faucet | RLock Docs",
  description: "Understand devnet limitations and how to fund test wallets.",
}

export default function DevnetLimitsPage() {
  return (
    <DocPageWrapper
      title="Devnet Limits & Faucet"
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Troubleshooting" },
        { label: "Devnet Limits & Faucet" },
      ]}
      prevPage={{ title: "Reduced-Motion Mode", href: "/docs/troubleshooting/reduced-motion" }}
      nextPage={{ title: "Versions & Compat", href: "/docs/changelog/versions" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>If airdrops fail:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Retry with backoff; try smaller amounts.</li>
          <li>CLI faucet</li>
        </ul>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code className="text-[var(--neon-success)]">solana airdrop 1 &lt;PUBKEY&gt; --url https://api.devnet.solana.com</code>
        </pre>

        <p className="mt-6">Or use ecosystem faucet UIs.</p>
      </div>
    </DocPageWrapper>
  )
}
