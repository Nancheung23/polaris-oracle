export const SHICHEN = [
  { value: "zi", label: "Zi Hour", range: "23:00–01:00" },
  { value: "chou", label: "Chou Hour", range: "01:00–03:00" },
  { value: "yin", label: "Yin Hour", range: "03:00–05:00" },
  { value: "mao", label: "Mao Hour", range: "05:00–07:00" },
  { value: "chen", label: "Chen Hour", range: "07:00–09:00" },
  { value: "si", label: "Si Hour", range: "09:00–11:00" },
  { value: "wu", label: "Wu Hour", range: "11:00–13:00" },
  { value: "wei", label: "Wei Hour", range: "13:00–15:00" },
  { value: "shen", label: "Shen Hour", range: "15:00–17:00" },
  { value: "you", label: "You Hour", range: "17:00–19:00" },
  { value: "xu", label: "Xu Hour", range: "19:00–21:00" },
  { value: "hai", label: "Hai Hour", range: "21:00–23:00" },
] as const;

export type Shichen = typeof SHICHEN[number]["value"];