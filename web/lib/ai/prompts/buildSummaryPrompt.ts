import type { CoreAnalysisResult, TopicsResult } from "@/lib/ai/types";

interface Input {
  name: string;
  coreAnalysis: CoreAnalysisResult;
  topics: TopicsResult;
}

export function buildSummaryPrompt({
  name,
  coreAnalysis,
  topics,
}: Input): string {
  return `Client: ${name}

Full analysis produced so far:
Core: ${JSON.stringify(coreAnalysis)}
Topics: ${JSON.stringify(topics)}

Write a closing summary (200-300 words, at most one technical term total across the whole passage) in plain, warm English that:
1. Names the single core tension or theme running through this person's life, described in terms of personality and behavior — not chart mechanics.
2. Highlights the 2-3 most important pieces of practical guidance across career, wealth, relationships, and health.

Output ONLY the summary text in English. No JSON, no markdown headers, no extra commentary.`;
}
