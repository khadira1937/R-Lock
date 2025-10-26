import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Versions & Compat | RLock Docs",
  description: "RLock version history and compatibility.",
}

export default function VersionsPage() {
  return (
    <DocPageWrapper
      title="Versions & Compat"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Changelog" }, { label: "Versions & Compat" }]}
      prevPage={{ title: "Devnet Limits & Faucet", href: "/docs/troubleshooting/devnet-limits" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Current</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>@rlock/cpsr-sdk 0.1.0</li>
          <li>Node: &gt;= 18</li>
          <li>@solana/web3.js: v1.x</li>
        </ul>
        <p className="mt-4">
          <strong>Notes:</strong> initial public surface.
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Future releases</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>0.1.x — incremental fixes.</li>
          <li>0.2.0 — potential helpers (batch splitting), more lane options.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
