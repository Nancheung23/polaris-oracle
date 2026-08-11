import type { Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";

export interface GetAstrolabeInput {
  birthDate: string;
  shichen: Shichen;
  gender: Gender;
  isLunar?: boolean;
  isLeapMonth?: boolean;
}

export interface IztroStar {
  name: string;
  brightness?: string;
  mutagen?: string;
}

export interface IztroPalace {
  name: string;
  isBodyPalace: boolean;
  heavenlyStem: string;
  earthlyBranch: string;
  majorStars: IztroStar[];
  minorStars: IztroStar[];
}

export interface IztroAstrolabe {
  soul: string;
  body: string;
  fiveElementsClass: string;
  chineseDate: string;
  sign: string;
  zodiac: string;
  palaces: IztroPalace[];
}
