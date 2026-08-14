import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import type { CoreAnalysisResult } from "@/lib/ai/types";

interface Input {
  name: string;
  gender: "Male" | "Female";
  chartSummary: ReturnType<typeof summarizeAstrolabeForAI>;
  coreAnalysis: CoreAnalysisResult;
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

  return `Client: ${name} (${gender})

Natal chart data (JSON, Chinese source terms — for your internal reasoning only):
${JSON.stringify(chartSummary)}

COMPLETE list of self-transformations (飞星自化) in this chart — for your internal reasoning only, do not reason from any entry not in this list:
${JSON.stringify(allSelfTransformations)}

Core analysis already produced for this client (for context, do not repeat verbatim):
${JSON.stringify(coreAnalysis)}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure — six topic analyses, each written in plain English describing the person's tendencies and concrete advice in that life area. HARD LIMIT: 110 words maximum per topic, at most one technical term per paragraph:
{
  "health": "What this person's body and stress patterns tend to look like, and practical guidance...",
  "study": "How this person learns best and what supports their growth...",
  "business": "This person's working style and professional strengths/blind spots...",
  "money": "How this person tends to earn, spend, and manage money, and practical guidance...",
  "relationship": "This person's friendship and social patterns...",
  "marriage": "What this person needs in a partner and how they show up in commitment..."
}`;
}
