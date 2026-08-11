import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";

interface Input {
  name: string;
  gender: "Male" | "Female";
  chartSummary: ReturnType<typeof summarizeAstrolabeForAI>;
}

export function buildCoreAnalysisPrompt({
  name,
  gender,
  chartSummary,
}: Input): string {
  return `Client: ${name} (${gender})
Note: in the chart data below, "soul" refers to the Life Star (命主) and "body" refers to the Body Star (身主) — these are specific stars used for character analysis, NOT the Life Palace or Body Palace.

Natal chart data (JSON, Chinese source terms — translate using the glossary):
${JSON.stringify(chartSummary)}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "basic": "A structural overview covering: Five Elements class, the Life Star and Body Star, the Life Palace and its main star(s), where the Body Palace falls and what that means, where the Lai Yin Palace (来因宫, 'palace of origin/karma') falls, and the single most important structural tension in the chart (e.g. self-transformations, conflicting stars). 200-300 words.",
  "analysis": "A deep dive into the natal Four Transformations (which palace each of Lu/Quan/Ke/Ji lands in, and what that means) AND the self-transformations (自化) on individual palaces — cite specific palaces and stars. 300-450 words."
}`;
}
