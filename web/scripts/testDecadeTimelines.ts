import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { getDecadeTimelines } from "@/lib/iztro/getDecadeTimelines";

const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(new Date("2000-08-16")),
  shichen: "yin",
  gender: "female",
});

const timelines = getDecadeTimelines(astrolabe, new Date("2000-08-16"));

console.log(JSON.stringify(timelines, null, 2));
console.log(
  `Total ${timelines.length} timeseries, age range in first: ${timelines[0].ageRange}`,
);
