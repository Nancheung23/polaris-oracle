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
  // 把所有非空的自化条目摊平成一份独立、明确的清单，作为唯一合法引用来源
  const allSelfTransformations = chartSummary.palaces.flatMap((p) =>
    p.selfTransformations.map((st) => ({
      palace: p.name,
      ...st,
    })),
  );

  return `Client: ${name} (${gender})
Note: in the chart data below, "soul" refers to the Life Star (命主) and "body" refers to the Body Star (身主) — these are specific stars used for character analysis, NOT the Life Palace or Body Palace.

Natal chart data (JSON, Chinese source terms — translate using the glossary):
${JSON.stringify(chartSummary)}

COMPLETE list of self-transformations (飞星自化) in this chart — this is the FULL and ONLY valid set, do not reference any self-transformation not in this list:
${JSON.stringify(allSelfTransformations)}

If this list is empty or short, that is correct — most palaces have no self-transformation, and you must not invent ones to fill space. Do not confuse a palace's natal mutagen (already tagged per-star) with self-transformations (only the ones in the list above) — they are different mechanisms.

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "basic": "A structural overview covering: Five Elements class, the Life Star and Body Star, the Life Palace and its main star(s), where the Body Palace falls and what that means, where the Lai Yin Palace (来因宫, 'palace of origin/karma') falls, and the single most important structural tension in the chart (e.g. self-transformations, conflicting stars). HARD LIMIT: 220 words maximum.",
  "analysis": "A deep dive into the natal Four Transformations (which palace each of Lu/Quan/Ke/Ji lands in, and what that means) AND the self-transformations (自化) on individual palaces — cite ONLY entries from the self-transformations list provided above, specifying the exact star, transformation, direction, and source palace as given. HARD LIMIT: 380 words maximum."
}`;
}
