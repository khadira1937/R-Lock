"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function DiffBanner() {
  const data = [
    { metric: "Success %", baseline: 96.2, rlock: 98.5 },
    { metric: "P90 (ms)", baseline: 1290, rlock: 892 },
    { metric: "CU / tx", baseline: 6850, rlock: 4250 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="gradient-border rounded-2xl p-6 md:p-8 space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-text-high">Performance Gains</h3>
        <p className="text-lg font-semibold bg-gradient-to-r from-[var(--solana-purple)] via-[var(--solana-cyan)] to-[var(--solana-green)] bg-clip-text text-transparent">
          RLock saved 38% CU and 31% P90 in this run.
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="metric" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(11, 15, 25, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--text-high)" }}
            />
            <Legend />
            <Bar dataKey="baseline" fill="var(--neon-info)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="rlock" fill="var(--solana-green)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
