import type React from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsFooter } from "@/components/docs-footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen bg-page text-text-high">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="vignette" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="docs-shell">
          {/* Sidebar */}
          <div className="docs-sidenav">
            <DocsSidebar />
          </div>

          {/* Content */}
          <div className="docs-content">{children}</div>
        </div>

        <DocsFooter />
      </div>
    </main>
  )
}
