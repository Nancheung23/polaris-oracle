import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import type { DecadeTimelineSummary } from "@/lib/iztro/getDecadeTimelines";

interface Input {
  name: string;
  chartSummary: ReturnType<typeof summarizeAstrolabeForAI>;
  decade: DecadeTimelineSummary;
}

export function buildDecadePrompt({
  name,
  chartSummary,
  decade,
}: Input): string {
  const yearsForPrompt = decade.years.map((y) => ({
    age: y.age,
    calendarYear: y.calendarYear,
    stemBranch: `${y.heavenlyStem}${y.earthlyBranch}`,
    palaceOfTheYear: y.palaceName,
    fourTransformations: y.mutagen,
  }));

  return `Client: ${name}

Natal chart summary (JSON, Chinese source terms — for your internal reasoning only):
${JSON.stringify(chartSummary)}

Analyzing Decade ${decade.decadeIndex + 1} of this client's life, ages ${
    decade.ageRange[0]
  }-${decade.ageRange[1]}.

IMPORTANT: This entire decade is governed by the natal ${
    decade.governingPalaceName
  } Palace. Do NOT infer the governing theme from the yearly data below — use the palace explicitly stated here for your internal reasoning. The "palaceOfTheYear" field in the year-by-year data below refers to something different: which palace each individual year's transit lands in.

Year-by-year data for this decade (for your internal reasoning only):
${JSON.stringify(yearsForPrompt)}

Write a single analysis section (200-280 words, at most one technical term per paragraph) in plain English covering:
- The overall life theme of this decade — what this period of the person's life tends to feel like and be about, described in everyday terms
- The 1-3 most significant years within this decade (referenced by age/year only, e.g. "around age 25"), what tends to happen or matter then, and whether it's broadly a good, challenging, or mixed period
- Practical guidance for navigating this decade

Output ONLY the analysis text in plain English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences, no star or palace names in the year callouts).`;
}
