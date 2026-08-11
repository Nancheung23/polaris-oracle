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

Natal chart summary (JSON, Chinese source terms):
${JSON.stringify(chartSummary)}

Analyzing Decade ${decade.decadeIndex + 1} of this client's life, ages ${
    decade.ageRange[0]
  }-${decade.ageRange[1]}.

Year-by-year data for this decade:
${JSON.stringify(yearsForPrompt)}

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).`;
}
