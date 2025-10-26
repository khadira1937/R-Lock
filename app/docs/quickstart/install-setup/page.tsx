import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Install & Setup | RLock Docs",
  description: "Get started with RLock in minutes.",
}

export default function InstallSetupPage() {
  return (
    <DocPageWrapper
      title="Install & Setup"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Quickstart" }, { label: "Install & Setup" }]}
      prevPage={{ title: "When to Use RLock", href: "/docs/overview/when-to-use" }}
      nextPage={{ title: "Minimal Example", href: "/docs/quickstart/minimal-example" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Node 18+</li>
          <li>ESM modules</li>
          <li>@solana/web3.js v1.x</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Install</h2>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code className="text-[var(--neon-success)]">npm install @rlock/cpsr-sdk @solana/web3.js</code>
        </pre>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Environment</h2>
        <p>
          <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">RPC_URL</code> (optional). Defaults in examples to:
        </p>
        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>https://api.devnet.solana.com</code>
        </pre>

        <p className="mt-4">
          <strong>Note:</strong> Matching Node and @solana/web3.js versions avoids ESM import issues.
        </p>
      </div>
    </DocPageWrapper>
  )
}
