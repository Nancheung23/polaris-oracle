import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";

const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(new Date("2000-08-16")),
  shichen: "yin",
  gender: "female",
});

const horoscope = astrolabe.horoscope(new Date("2010-08-16"));

console.log(JSON.stringify(horoscope, null, 2));
