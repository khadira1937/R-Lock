import { DocPageWrapper } from "@/components/docs-page-wrapper"

export const metadata = {
  title: "Export .jsonl | RLock Docs",
  description: "Export RLock events as .jsonl for analysis.",
}

export default function ExportJsonlPage() {
  return (
    <DocPageWrapper
      title="Export .jsonl"
      breadcrumbs={[{ label: "Docs", href: "/docs" }, { label: "Observability" }, { label: "Export .jsonl" }]}
      prevPage={{ title: "Summary & Diff", href: "/docs/observability/summary-diff" }}
      nextPage={{ title: "Common Errors & Fixes", href: "/docs/troubleshooting/common-errors" }}
    >
      <div className="space-y-6 text-text-mid leading-relaxed">
        <p>Write simple structured logs for later analysis.</p>

        <pre className="bg-[var(--panel-bg)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
          <code>{`import { writeFileSync } from 'node:fs';
import { appendFile } from 'node:fs/promises';

const path = './runs.jsonl';
writeFileSync(path, '', { flag: 'w' });

export async function logLine(obj: unknown) {
  await appendFile(path, JSON.stringify(obj) + '\\n');
}`}</code>
        </pre>
      </div>
    </DocPageWrapper>
  )
}
