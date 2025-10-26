"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Heading {
  id: string
  text: string
  level: number
}

export function DocsTOC() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract h2 and h3 headings from the content
    const contentElement = document.querySelector(".docs-content")
    if (!contentElement) return

    const headingElements = contentElement.querySelectorAll("h2, h3")
    const extractedHeadings: Heading[] = []

    headingElements.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      }
      extractedHeadings.push({
        id: heading.id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName[1]),
      })
    })

    setHeadings(extractedHeadings)
  }, [])

  useEffect(() => {
    // Scroll spy: highlight active heading
    const handleScroll = () => {
      const headingElements = document.querySelectorAll(".docs-content h2, .docs-content h3")
      let currentId = ""

      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          currentId = heading.id
        }
      })

      setActiveId(currentId)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="text-sm space-y-2">
      <div className="font-semibold text-text-high mb-4 text-xs uppercase tracking-wider">On this page</div>
      {headings.map((heading) => (
        <motion.div
          key={heading.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
        >
          <Link
            href={`#${heading.id}`}
            className={`block py-1 transition-colors ${
              activeId === heading.id ? "text-rlock-blue font-medium" : "text-text-muted hover:text-text-high"
            }`}
          >
            {heading.text}
          </Link>
        </motion.div>
      ))}
    </nav>
  )
}
