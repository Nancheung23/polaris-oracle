import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { buildPalaceOverviewTable } from "@/lib/reports/buildPalaceOverviewTable";

const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(new Date("1997-04-04")),
  shichen: "mao",
  gender: "male",
});

const chartSummary = summarizeAstrolabeForAI(astrolabe);
const overviewTable = buildPalaceOverviewTable(chartSummary);

console.log(overviewTable);
