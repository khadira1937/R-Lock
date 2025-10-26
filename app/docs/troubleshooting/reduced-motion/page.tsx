import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Reduced-Motion Mode | RLock Docs",
  description: "Using RLock with prefers-reduced-motion enabled.",
}

export default function ReducedMotionPage() {
  return (
    <DocPageWrapper
      title="Reduced-Motion Mode"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Troubleshooting" }, { label: "Reduced-Motion Mode" }]}
      prevPage={{ title: "Common Errors & Fixes", href: "/docs/troubleshooting/common-errors" }}
      nextPage={{ title: "Devnet Limits & Faucet", href: "/docs/troubleshooting/devnet-limits" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">L1 lane</h2>
        <p>
          Control via <code className="bg-[var(--panel-bg)] px-2 py-1 rounded text-[var(--neon-info)]">SubmitOptions.skipPreflight</code> (default false).
        </p>

        <h2 className="text-2xl font-bold text-text-high mt-8 mb-4">Router lane</h2>
        <p>
          Often defaults to true on the gateway.
        </p>

        <p className="mt-6">
          <strong>Trade-off:</strong> skipping preflight lowers latency but hides early failures. Prefer preflight during integration, skip when confident.
        </p>
      </div>
    </DocPageWrapper>
  )
}
