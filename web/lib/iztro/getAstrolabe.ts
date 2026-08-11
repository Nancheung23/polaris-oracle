import { astro } from "iztro";
import type { Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";
import type { GetAstrolabeInput } from "@/lib/iztro/types";

const SHICHEN_TO_HOUR_INDEX: Record<Shichen, number> = {
  zi: 0,
  chou: 1,
  yin: 2,
  mao: 3,
  chen: 4,
  si: 5,
  wu: 6,
  wei: 7,
  shen: 8,
  you: 9,
  xu: 10,
  hai: 11,
};

const GENDER_TO_CN: Record<Gender, "男" | "女"> = {
  male: "男",
  female: "女",
};

export type Astrolabe = ReturnType<typeof astro.bySolar>;

export function getAstrolabe(input: GetAstrolabeInput): Astrolabe {
  const {
    birthDate,
    shichen,
    gender,
    isLunar = false,
    isLeapMonth = false,
  } = input;

  const hourIndex = SHICHEN_TO_HOUR_INDEX[shichen];
  if (hourIndex === undefined) {
    throw new Error(`Unknown shichen: ${shichen}`);
  }

  const genderCn = GENDER_TO_CN[gender];
  if (!genderCn) {
    throw new Error(`Unknown gender: ${gender}`);
  }

  return isLunar
    ? astro.byLunar(birthDate, hourIndex, genderCn, isLeapMonth)
    : astro.bySolar(birthDate, hourIndex, genderCn);
}

export function formatDateForIztro(date: Date): string {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  return `${y}-${m}-${d}`;
}
