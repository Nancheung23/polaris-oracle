interface Input {
  name: string;
  coreAnalysis: { basic: string; overview: string; analysis: string };
  topics: Record<string, string>;
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

Write a closing summary (200-300 words) that:
1. Names the single core tension or theme running through this chart.
2. Highlights the 2-3 most important pieces of practical guidance across career, wealth, relationships, and health.

Output ONLY the summary text in English. No JSON, no markdown headers, no extra commentary.`;
}
