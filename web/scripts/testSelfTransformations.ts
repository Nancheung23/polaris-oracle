import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";

const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(new Date("2000-08-16")),
  shichen: "yin",
  gender: "female",
});

const chartSummary = summarizeAstrolabeForAI(astrolabe);

chartSummary.palaces.forEach((p) => {
  if (p.selfTransformations.length > 0) {
    console.log(`${p.name}宫:`, p.selfTransformations);
  }
});
