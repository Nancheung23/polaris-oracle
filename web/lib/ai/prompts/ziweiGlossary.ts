export const PALACE_NAME_EN: Record<string, string> = {
  命宫: "Life Palace",
  兄弟: "Siblings Palace",
  夫妻: "Spouse Palace",
  子女: "Children Palace",
  财帛: "Wealth Palace",
  疾厄: "Health Palace",
  迁移: "Travel Palace",
  仆役: "Friends Palace",
  官禄: "Career Palace",
  田宅: "Property Palace",
  福德: "Wellbeing Palace",
  父母: "Parents Palace",
};

export const MAJOR_STAR_NAME_EN: Record<string, string> = {
  紫微: "Emperor Star (Zi Wei)",
  天机: "Strategist Star (Tian Ji)",
  太阳: "Sun Star (Tai Yang)",
  武曲: "Military Star (Wu Qu)",
  天同: "Harmony Star (Tian Tong)",
  廉贞: "Discipline Star (Lian Zhen)",
  天府: "Treasury Star (Tian Fu)",
  太阴: "Moon Star (Tai Yin)",
  贪狼: "Greedy Wolf Star (Tan Lang)",
  巨门: "Giant Gate Star (Ju Men)",
  天相: "Minister Star (Tian Xiang)",
  天梁: "Elder Star (Tian Liang)",
  七杀: "Seven Killings Star (Qi Sha)",
  破军: "Army Breaker Star (Po Jun)",
};

export const MINOR_STAR_NAME_EN: Record<string, string> = {
  左辅: "Left Assistant (Zuo Fu)",
  右弼: "Right Assistant (You Bi)",
  文昌: "Literary Star (Wen Chang)",
  文曲: "Literary Star (Wen Qu)",
  天魁: "Heavenly Nobleman (Tian Kui)",
  天钺: "Heavenly Nobleman (Tian Yue)",
  禄存: "Prosperity Reserve (Lu Cun)",
  天马: "Heavenly Horse (Tian Ma)",
  擎羊: "Blade Star (Qing Yang)",
  陀罗: "Spinning Star (Tuo Luo)",
  火星: "Fire Star (Huo Xing)",
  铃星: "Bell Star (Ling Xing)",
  地空: "Void Star (Di Kong)",
  地劫: "Robbery Star (Di Jie)",
};

export const BRIGHTNESS_EN: Record<string, string> = {
  庙: "Exalted",
  旺: "Prosperous",
  得: "Advantageous",
  利: "Favorable",
  平: "Neutral",
  不: "Weak",
  陷: "Debilitated",
};

export const MUTAGEN_EN: Record<string, string> = {
  禄: "Prosperity Transformation (Lu)",
  权: "Power Transformation (Quan)",
  科: "Fame Transformation (Ke)",
  忌: "Adversity Transformation (Ji)",
};

export function buildGlossaryBlock(): string {
  const palaces = Object.entries(PALACE_NAME_EN)
    .map(([cn, en]) => `${cn} = ${en}`)
    .join(", ");
  const stars = Object.entries(MAJOR_STAR_NAME_EN)
    .map(([cn, en]) => `${cn} = ${en}`)
    .join(", ");
  const brightness = Object.entries(BRIGHTNESS_EN)
    .map(([cn, en]) => `${cn} = ${en}`)
    .join(", ");
  const mutagen = Object.entries(MUTAGEN_EN)
    .map(([cn, en]) => `${cn} = ${en}`)
    .join(", ");

  return `TERMINOLOGY GLOSSARY (use these exact English terms consistently; you may include the Chinese term in parentheses on first mention within a section):
Palaces: ${palaces}
Major Stars: ${stars}
Brightness levels: ${brightness}
Four Transformations: ${mutagen}`;
}
