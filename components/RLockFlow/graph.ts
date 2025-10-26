export const graphConfig = {
  lanes: [
    {
      id: "planning",
      nodes: [
        { id: "intents", label: "Intents", sub: "UserIntent[]" },
        { id: "dag", label: "DAG Build", sub: "detect account conflicts · order by priority/index" },
        { id: "layers", label: "Topological Layers", sub: "parallelizable sets" },
        { id: "chunk", label: "Chunking per Layer", sub: "bytes/instr/CU budgets · optional ALT pre-plan" },
        { id: "occ", label: "OCC Capture", sub: "fetch + hash account state · max slot drift · retries" },
      ],
    },
    {
      id: "er",
      branchFrom: "occ",
      rejoinAt: "fee",
      nodes: [
        { id: "router", label: "ER Router Discovery", sub: "select route · TTL · health" },
        { id: "session", label: "ER Session", sub: "guards · cache · merge-small-intents" },
        { id: "execute", label: "ER Execute Off-Chain", sub: "plan & run · produce settlement" },
        { id: "compact", label: "Compact Settlement", sub: "instructions ↓ · bytes ↓ · fees ↓" },
      ],
    },
    {
      id: "execution",
      nodes: [
        { id: "fee", label: "Fee Plan + Serialize", sub: "ComputeBudget · LUTs (v0) · message size" },
        { id: "simulate", label: "Simulate", sub: "preflight" },
        { id: "tighten", label: "Tighten CU Limit", sub: "safety + clamp" },
        { id: "send", label: "Sign & Send", sub: "is_blockhash_valid? → submit" },
      ],
    },
  ],
}
