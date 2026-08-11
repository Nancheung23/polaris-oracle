import type { IztroAstrolabe } from "@/lib/iztro/types";

export function summarizeAstrolabeForAI(astrolabe: IztroAstrolabe) {
  const palaceSummaries = astrolabe.palaces.map((p) => ({
    name: p.name,
    isBodyPalace: p.isBodyPalace,
    heavenlyStem: p.heavenlyStem,
    earthlyBranch: p.earthlyBranch,
    majorStars: p.majorStars.map((s) => ({
      name: s.name,
      brightness: s.brightness,
      mutagen: s.mutagen || undefined,
    })),
    minorStars: p.minorStars.map((s) => s.name),
  }));

  return {
    soul: astrolabe.soul,
    body: astrolabe.body,
    fiveElementsClass: astrolabe.fiveElementsClass,
    chineseDate: astrolabe.chineseDate,
    sign: astrolabe.sign,
    zodiac: astrolabe.zodiac,
    palaces: palaceSummaries,
  };
}
