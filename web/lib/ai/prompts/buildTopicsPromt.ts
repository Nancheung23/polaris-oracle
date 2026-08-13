import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";

interface Input {
  name: string;
  gender: "Male" | "Female";
  chartSummary: ReturnType<typeof summarizeAstrolabeForAI>;
  coreAnalysis: { basic: string; analysis: string };
}

export function buildTopicsPrompt({
  name,
  gender,
  chartSummary,
  coreAnalysis,
}: Input): string {
  const allSelfTransformations = chartSummary.palaces.flatMap((p) =>
    p.selfTransformations.map((st) => ({
      palace: p.name,
      ...st,
    })),
  );
  const starLocationIndex = chartSummary.palaces.flatMap((p) => [
    ...p.majorStars.map((s) => `${s.name} → ${p.name}`),
    ...p.minorStars.map((s) => `${s} → ${p.name}`),
  ]);

  return `Client: ${name} (${gender})

Natal chart data (JSON, Chinese source terms):
${JSON.stringify(chartSummary)}

COMPLETE list of self-transformations (飞星自化) in this chart — this is the FULL and ONLY valid set, do not reference any self-transformation not in this list:
${JSON.stringify(allSelfTransformations)}

Core analysis already produced for this client (for context, do not repeat verbatim):
${JSON.stringify(coreAnalysis)}

Star location index (which palace each star sits in — verify against this before making any claim about a star's location):
${starLocationIndex.join(", ")}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure — six topic analyses, each grounded in the specific palace(s), stars, brightness, and transformations relevant to that topic. Only cite self-transformations that appear in the list above. HARD LIMIT: 110 words maximum per topic:
{
  "health": "Based on the Health Palace (疾厄宫)...",
  "study": "Based on the Life Palace and early decades relevant to learning...",
  "business": "Based on the Career Palace (官禄宫)...",
  "money": "Based on the Wealth Palace (财帛宫) and Property Palace (田宅宫)...",
  "relationship": "Based on the Friends Palace (交友宫/仆役宫) and Siblings Palace (兄弟宫)...",
  "marriage": "Based on the Spouse Palace (夫妻宫)..."
}`;
}
