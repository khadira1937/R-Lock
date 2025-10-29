import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "How it works | RLock Docs",
  description: "Explore the core features of RLock.",
}

export default function KeyFeaturesPage() {
  return (
    <DocPageWrapper
      title="How it works"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Overview" }, { label: "How it works" }]}
      prevPage={{ title: "What is RLock?", href: "/docs/overview/what-is-rlock" }}
      nextPage={{ title: "When to Use RLock", href: "/docs/overview/when-to-use" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">How it works (pipeline)</h2>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Intents – capture the full user goal in one request.</strong>
          </li>
          <li>DAG build – map dependencies: what must run first, what can run in parallel, what’s impossible.</li>
          <li>Chunking / layering – split the DAG into executable units that won’t blow compute or lock the same hot accounts.</li>
          <li>OCC checks – Optimistic Concurrency Control verifies the world state you planned against hasn’t drifted.</li>
          <li>Rail selection – pick L1 or ER-style lane based on congestion and reliability goals.</li>
          <li>Fee planning / budgeting – lock CU limit and price so inclusion is likely without overpaying.</li>
          <li>Simulate end-to-end – validate the whole package before spending a single lamport on live tx.</li>
          <li>Tighten & serialize – remove redundant work, compact the message, serialize final bytes.</li>
          <li>Send – submit the finalized bundle on the chosen rail; confirm and surface a clean result.</li>
        </ul>

      </div>
    </DocPageWrapper>
  )
}
