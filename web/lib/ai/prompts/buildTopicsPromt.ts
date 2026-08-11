import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";

interface Input {
  name: string;
  gender: "Male" | "Female";
  chartSummary: ReturnType<typeof summarizeAstrolabeForAI>;
  coreAnalysis: { basic: string; overview: string; analysis: string };
}

export function buildTopicsPrompt({
  name,
  gender,
  chartSummary,
  coreAnalysis,
}: Input): string {
  return `Client: ${name} (${gender})

Natal chart data (JSON, Chinese source terms):
${JSON.stringify(chartSummary)}

Core analysis already produced for this client (for context, do not repeat verbatim):
${JSON.stringify(coreAnalysis)}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure — six topic analyses, each 100-150 words, each grounded in the specific palace(s), stars, brightness, and transformations relevant to that topic:
{
  "health": "Based on the Health Palace (疾厄宫)...",
  "study": "Based on the Life Palace and early decades relevant to learning...",
  "business": "Based on the Career Palace (官禄宫)...",
  "money": "Based on the Wealth Palace (财帛宫) and Property Palace (田宅宫)...",
  "relationship": "Based on the Friends Palace (交友宫/仆役宫) and Siblings Palace (兄弟宫)...",
  "marriage": "Based on the Spouse Palace (夫妻宫)..."
}`;
}
