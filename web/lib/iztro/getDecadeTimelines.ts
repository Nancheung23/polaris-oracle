import type { Astrolabe } from "@/lib/iztro/getAstrolabe";

interface YearlyHoroscopeSummary {
  age: number;
  calendarYear: number;
  heavenlyStem: string;
  earthlyBranch: string;
  palaceIndex: number;
  palaceName: string;
  mutagen: string[];
}

export interface DecadeTimelineSummary {
  decadeIndex: number;
  ageRange: [number, number];
  governingPalaceName: string;
  years: YearlyHoroscopeSummary[];
}

export function getDecadeTimelines(
  astrolabe: Astrolabe,
  birthDate: Date,
  numDecades = 8,
): DecadeTimelineSummary[] {
  const sortedByDecadeStart = [...astrolabe.palaces].sort(
    (a, b) => a.decadal.range[0] - b.decadal.range[0],
  );

  const decades = sortedByDecadeStart.slice(0, numDecades);
  const birthYear = birthDate.getUTCFullYear();

  return decades.map((palace, decadeIndex) => {
    const [startAge, endAge] = palace.decadal.range;

    const years: YearlyHoroscopeSummary[] = [];
    for (let age = startAge; age <= endAge; age++) {
      const calendarYear = birthYear + age - 1;
      const queryDate = new Date(Date.UTC(calendarYear, 5, 15));

      const horoscope = astrolabe.horoscope(queryDate);
      const landingPalace = astrolabe.palaces.find(
        (p) => p.index === horoscope.yearly.index,
      );

      years.push({
        age,
        calendarYear,
        heavenlyStem: horoscope.yearly.heavenlyStem,
        earthlyBranch: horoscope.yearly.earthlyBranch,
        palaceIndex: horoscope.yearly.index,
        palaceName: landingPalace?.name ?? "",
        mutagen: horoscope.yearly.mutagen,
      });
    }

    return {
      decadeIndex,
      ageRange: [startAge, endAge] as [number, number],
      governingPalaceName: palace.name,
      years,
    };
  });
}
