export const SUMMARY_IMAGE_MAP: Record<string, string> = {
  紫微: "/summary/zi-wei.jpg",
  天机: "/summary/tian-ji.jpg",
  太阳: "/summary/tai-yang.jpg",
  武曲: "/summary/wu-qu.jpg",
  天同: "/summary/tian-tong.jpg",
  廉贞: "/summary/lian-zhen.jpg",
  天府: "/summary/tian-fu.jpg",
  太阴: "/summary/tai-yin.jpg",
  贪狼: "/summary/tan-lang.jpg",
  巨门: "/summary/ju-men.jpg",
  天相: "/summary/tian-xiang.jpg",
  天梁: "/summary/tian-liang.jpg",
  七杀: "/summary/qi-sha.jpg",
  破军: "/summary/po-jun.jpg",
};

export const DEFAULT_SUMMARY_IMAGE = "/topics/summary.jpg";

const EN_TO_CN_STAR: Record<string, string> = {
  "Emperor Star": "紫微",
  "Strategist Star": "天机",
  "Sun Star": "太阳",
  "Military Star": "武曲",
  "Harmony Star": "天同",
  "Discipline Star": "廉贞",
  "Treasury Star": "天府",
  "Moon Star": "太阴",
  "Greedy Wolf Star": "贪狼",
  "Giant Gate Star": "巨门",
  "Minister Star": "天相",
  "Elder Star": "天梁",
  "Seven Killings Star": "七杀",
  "Army Breaker Star": "破军",
};

export function extractLifeStarFromOverview(overview: string): string | null {
  const lines = overview.split("\n");
  const lifeLine = lines.find(
    (line) => line.includes("Life Palace") && line.trim().startsWith("|"),
  );
  if (!lifeLine) return null;

  const cells = lifeLine.split("|").map((c) => c.trim());
  const majorStarsCell = cells[3];
  if (!majorStarsCell || majorStarsCell === "None") return null;

  const firstStarText = majorStarsCell.split(",")[0].trim();
  const matchedEnName = Object.keys(EN_TO_CN_STAR).find((enName) =>
    firstStarText.startsWith(enName),
  );
  return matchedEnName ? EN_TO_CN_STAR[matchedEnName] : null;
}

export function getSummaryImage(overview: string): string {
  const lifeStar = extractLifeStarFromOverview(overview);
  if (!lifeStar) return DEFAULT_SUMMARY_IMAGE;
  return SUMMARY_IMAGE_MAP[lifeStar] ?? DEFAULT_SUMMARY_IMAGE;
}
