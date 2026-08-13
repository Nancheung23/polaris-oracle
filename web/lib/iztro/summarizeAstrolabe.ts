import type { IztroAstrolabe } from "@/lib/iztro/types";
import { computeSelfTransformations } from "@/lib/iztro/computeSelfTransformations";

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

  // 计算飞星自化，用于挂到每个宫上
  const selfTransformationsMap = computeSelfTransformations(
    astrolabe.palaces.map((p) => ({
      name: p.name,
      heavenlyStem: p.heavenlyStem,
      majorStarNames: p.majorStars.map((s) => s.name),
      minorStarNames: p.minorStars.map((s) => s.name),
    })),
  );

  const palacesWithSelfTransformations = palaceSummaries.map((p, index) => ({
    ...p,
    selfTransformations: selfTransformationsMap.get(index) ?? [],
  }));

  return {
    soul: astrolabe.soul,
    body: astrolabe.body,
    fiveElementsClass: astrolabe.fiveElementsClass,
    chineseDate: astrolabe.chineseDate,
    sign: astrolabe.sign,
    zodiac: astrolabe.zodiac,
    palaces: palacesWithSelfTransformations,
  };
}
