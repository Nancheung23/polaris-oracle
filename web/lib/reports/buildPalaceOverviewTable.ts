import type { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import {
  PALACE_NAME_EN,
  MAJOR_STAR_NAME_EN,
  MINOR_STAR_NAME_EN,
  BRIGHTNESS_EN,
  MUTAGEN_EN,
} from "@/lib/ai/prompts/ziweiGlossary";

type ChartSummary = ReturnType<typeof summarizeAstrolabeForAI>;

function formatMajorStar(star: {
  name: string;
  brightness?: string;
  mutagen?: string;
}): string {
  const nameEn = MAJOR_STAR_NAME_EN[star.name] ?? star.name;
  const tags: string[] = [];
  if (star.brightness)
    tags.push(BRIGHTNESS_EN[star.brightness] ?? star.brightness);
  if (star.mutagen)
    tags.push(
      `Natal-${MUTAGEN_EN[star.mutagen]?.split(" ")[0] ?? star.mutagen}`,
    );
  return tags.length > 0 ? `${nameEn} [${tags.join(", ")}]` : nameEn;
}

function formatMinorStarName(name: string): string {
  return MINOR_STAR_NAME_EN[name] ?? name;
}

export function buildPalaceOverviewTable(chartSummary: ChartSummary): string {
  const header =
    "| Palace | Stem-Branch | Major Stars | Notable Markers |\n|---|---|---|---|";

  const rows = chartSummary.palaces.map((p) => {
    const palaceNameEn = PALACE_NAME_EN[p.name] ?? p.name;
    const stemBranch = `${p.heavenlyStem}${p.earthlyBranch}`;
    const majorStars =
      p.majorStars.length > 0
        ? p.majorStars.map(formatMajorStar).join(", ")
        : "None";
    const markers =
      p.minorStars.length > 0
        ? p.minorStars.map(formatMinorStarName).join(", ")
        : "—";

    return `| ${palaceNameEn}${
      p.isBodyPalace ? " (Body Palace)" : ""
    } | ${stemBranch} | ${majorStars} | ${markers} |`;
  });

  return [header, ...rows].join("\n");
}
