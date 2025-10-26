import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "When to Use RLock | RLock Docs",
  description: "Learn when RLock is the right choice for your Solana application.",
}

export default function WhenToUsePage() {
  return (
    <DocPageWrapper
      title="When to Use RLock"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Overview" }, { label: "When to Use RLock" }]}
      prevPage={{ title: "Key Features", href: "/docs/overview/key-features" }}
      nextPage={{ title: "Install & Setup", href: "/docs/quickstart/install-setup" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>Use RLock if you:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Combine several instructions/intents and need size checks.</li>
          <li>Hit hot-account contention and want retries and priority fees.</li>
          <li>Want consistent ComputeBudget insertion without hand-crafting.</li>
          <li>Prefer pluggable ALT sources to shrink messages.</li>
          <li>Need to switch between L1 and Router lanes without changing logic.</li>
        </ul>
      </div>
    </DocPageWrapper>
  )
}
