"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DocPageWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
  breadcrumbs: { label: string; href?: string }[]
  prevPage?: { title: string; href: string }
  nextPage?: { title: string; href: string }
}

export function DocPageWrapper({ title, description, children, breadcrumbs, prevPage, nextPage }: DocPageWrapperProps) {
  const pathname = usePathname()

  return (
    <div className="py-16 md:py-20 lg:py-24">
      <div className="max-w-full">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-sm md:text-base text-text-muted mb-8 md:mb-10"
        >
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-text-high transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span>›</span>}
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-high mb-6">{title}</h1>
          {description && <p className="text-xl md:text-2xl text-text-mid leading-relaxed">{description}</p>}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-invert max-w-none mb-16 md:mb-20 prose-headings:scroll-mt-24 prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:my-6 prose-li:text-base md:prose-li:text-lg prose-li:leading-relaxed prose-li:my-3"
        >
          {children}
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-[var(--border-subtle)] flex justify-between items-center"
        >
          {prevPage ? (
            <Link href={prevPage.href}>
              <Button variant="ghost" className="text-text-mid hover:text-text-high flex items-center gap-2 h-11 px-4 text-base">
                <ChevronLeft className="w-5 h-5" />
                {prevPage.title}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextPage ? (
            <Link href={nextPage.href}>
              <Button variant="ghost" className="text-text-mid hover:text-text-high flex items-center gap-2 h-11 px-4 text-base">
                {nextPage.title}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>

        {/* Edit on GitHub */}
        <a
          href={`https://github.com/rlock/docs/edit/main/pages${pathname}.tsx`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-8 bottom-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--section-bg)] border border-[var(--border-subtle)] text-text-muted hover:text-text-high hover:border-[var(--rlock-blue)] transition-all"
        >
          <Github className="w-4 h-4" />
          <span className="text-sm">Edit on GitHub</span>
        </a>
      </div>
    </div>
  )
}
