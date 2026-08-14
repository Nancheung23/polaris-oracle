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
  const allSelfTransformations = chartSummary.palaces.flatMap((p) =>
    p.selfTransformations.map((st) => ({
      palace: p.name,
      ...st,
    })),
  );

  return `Client: ${name} (${gender})
Note: in the chart data below, "soul" refers to the Life Star (命主) and "body" refers to the Body Star (身主) — these are specific stars used for character analysis, NOT the Life Palace or Body Palace.

Natal chart data (JSON, Chinese source terms — for your internal reasoning only):
${JSON.stringify(chartSummary)}

COMPLETE list of self-transformations (飞星自化) in this chart — this is the FULL and ONLY valid set for your internal reasoning, do not reason from any self-transformation not in this list:
${JSON.stringify(allSelfTransformations)}

If this list is empty or short, that is correct — most palaces have no self-transformation, and you must not invent ones.

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "basic": "A plain-English personality and life-structure overview: what fundamentally drives this person, their core temperament, and the single most important internal tension shaping their life. Written for someone with zero astrology knowledge — describe WHO they are and WHAT tension defines them, not the chart mechanics behind it. HARD LIMIT: 220 words maximum, at most one technical term per paragraph.",
  "analysis": "A deeper look at this person's psychological patterns — how their drive, ambition, self-image, and inner conflicts actually play out day to day. Ground this in the natal Four Transformations and self-transformations for accuracy, but describe the RESULT in plain language, not the mechanism. HARD LIMIT: 380 words maximum, at most one technical term per paragraph."
}`;
}
