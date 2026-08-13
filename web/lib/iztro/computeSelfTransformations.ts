import {
  HEAVENLY_STEM_TRANSFORMATIONS,
  TRANSFORMATION_LABELS,
  type TransformationLabel,
} from "@/lib/iztro/heavenlyStemTransformations";

interface PalaceForCalc {
  name: string;
  heavenlyStem: string;
  majorStarNames: string[];
  minorStarNames: string[];
}

export interface SelfTransformationEntry {
  star: string;
  transformation: TransformationLabel;
  direction: "outward" | "inward"; // outward = 离心自化(↓), inward = 向心自化(↑)
  sourcePalace: string; // 离心：本宫自己；向心：对宫名
}

function starsInPalace(palace: PalaceForCalc): Set<string> {
  return new Set([...palace.majorStarNames, ...palace.minorStarNames]);
}

/**
 * 计算每个宫的飞星自化（离心+向心）
 * palaces 必须是按 index 0-11 顺序排列的数组(对应 iztro 原始 palace.index)
 */
export function computeSelfTransformations(
  palaces: PalaceForCalc[],
): Map<number, SelfTransformationEntry[]> {
  const result = new Map<number, SelfTransformationEntry[]>();

  palaces.forEach((palace, index) => {
    const entries: SelfTransformationEntry[] = [];
    const ownStars = starsInPalace(palace);

    const ownStemTargets = HEAVENLY_STEM_TRANSFORMATIONS[palace.heavenlyStem];
    if (ownStemTargets) {
      ownStemTargets.forEach((star, i) => {
        if (ownStars.has(star)) {
          entries.push({
            star,
            transformation: TRANSFORMATION_LABELS[i],
            direction: "outward",
            sourcePalace: palace.name,
          });
        }
      });
    }

    const oppositeIndex = (index + 6) % 12;
    const oppositePalace = palaces[oppositeIndex];
    const oppositeStemTargets =
      HEAVENLY_STEM_TRANSFORMATIONS[oppositePalace.heavenlyStem];
    if (oppositeStemTargets) {
      oppositeStemTargets.forEach((star, i) => {
        if (ownStars.has(star)) {
          entries.push({
            star,
            transformation: TRANSFORMATION_LABELS[i],
            direction: "inward",
            sourcePalace: oppositePalace.name,
          });
        }
      });
    }

    result.set(index, entries);
  });

  return result;
}
