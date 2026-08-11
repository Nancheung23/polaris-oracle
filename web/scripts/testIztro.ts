import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";

const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(new Date("2000-08-16")),
  shichen: "yin",
  gender: "female",
});

console.log(JSON.stringify(astrolabe, null, 2));
