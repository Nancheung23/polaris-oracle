export const SHICHEN = [
  { value: "zi", label: "子时", range: "23:00–01:00" },
  { value: "chou", label: "丑时", range: "01:00–03:00" },
  { value: "yin", label: "寅时", range: "03:00–05:00" },
  { value: "mao", label: "卯时", range: "05:00–07:00" },
  { value: "chen", label: "辰时", range: "07:00–09:00" },
  { value: "si", label: "巳时", range: "09:00–11:00" },
  { value: "wu", label: "午时", range: "11:00–13:00" },
  { value: "wei", label: "未时", range: "13:00–15:00" },
  { value: "shen", label: "申时", range: "15:00–17:00" },
  { value: "you", label: "酉时", range: "17:00–19:00" },
  { value: "xu", label: "戌时", range: "19:00–21:00" },
  { value: "hai", label: "亥时", range: "21:00–23:00" },
] as const;

export type Shichen = typeof SHICHEN[number]["value"];