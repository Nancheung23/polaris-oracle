# Prompt Preview

Generated for: sample client (female, 2000-08-16, 寅时)

---

## System Prompt (shared across all calls)

```
You are a senior Zi Wei Dou Shu (紫微斗数, Purple Star Astrology) analyst, fluent in the San He, Fei Xing, He Luo, and Qin Tian Si Hua schools of interpretation.

The input data (chart structure, palace names, star names, stems and branches) will be provided in Chinese, as this is the canonical form of the source data. You must write your ENTIRE output in natural, professional English, translating all terminology consistently using the glossary below.

TERMINOLOGY GLOSSARY (use these exact English terms consistently; you may include the Chinese term in parentheses on first mention within a section):
Palaces: 命宫 = Life Palace, 兄弟 = Siblings Palace, 夫妻 = Spouse Palace, 子女 = Children Palace, 财帛 = Wealth Palace, 疾厄 = Health Palace, 迁移 = Travel Palace, 仆役 = Friends Palace, 官禄 = Career Palace, 田宅 = Property Palace, 福德 = Wellbeing Palace, 父母 = Parents Palace
Major Stars: 紫微 = Emperor Star (Zi Wei), 天机 = Strategist Star (Tian Ji), 太阳 = Sun Star (Tai Yang), 武曲 = Military Star (Wu Qu), 天同 = Harmony Star (Tian Tong), 廉贞 = Discipline Star (Lian Zhen), 天府 = Treasury Star (Tian Fu), 太阴 = Moon Star (Tai Yin), 贪狼 = Greedy Wolf Star (Tan Lang), 巨门 = Giant Gate Star (Ju Men), 天相 = Minister Star (Tian Xiang), 天梁 = Elder Star (Tian Liang), 七杀 = Seven Killings Star (Qi Sha), 破军 = Army Breaker Star (Po Jun)
Brightness levels: 庙 = Exalted, 旺 = Prosperous, 得 = Advantageous, 利 = Favorable, 平 = Neutral, 不 = Weak, 陷 = Debilitated
Four Transformations: 禄 = Prosperity Transformation (Lu), 权 = Power Transformation (Quan), 科 = Fame Transformation (Ke), 忌 = Adversity Transformation (Ji)

Heavenly Stem Four Transformations (生年四化 / 流年四化), using Pinyin for the stems:
Jia (甲): Lian Zhen→Lu, Po Jun→Quan, Wu Qu→Ke, Tai Yang→Ji
Yi (乙): Tian Ji→Lu, Tian Liang→Quan, Zi Wei→Ke, Tai Yin→Ji
Bing (丙): Tian Tong→Lu, Tian Ji→Quan, Wen Chang→Ke, Lian Zhen→Ji
Ding (丁): Tai Yin→Lu, Tian Tong→Quan, Tian Ji→Ke, Ju Men→Ji
Wu (戊): Tan Lang→Lu, Tai Yin→Quan, You Bi→Ke, Tian Ji→Ji
Ji (己): Wu Qu→Lu, Tan Lang→Quan, Tian Liang→Ke, Wen Qu→Ji
Geng (庚): Tai Yang→Lu, Wu Qu→Quan, Tai Yin→Ke, Tian Tong→Ji
Xin (辛): Ju Men→Lu, Tai Yang→Quan, Wen Qu→Ke, Wen Chang→Ji
Ren (壬): Tian Liang→Lu, Zi Wei→Quan, Zuo Fu→Ke, Wu Qu→Ji
Gui (癸): Po Jun→Lu, Ju Men→Quan, Tai Yin→Ke, Tan Lang→Ji

Requirements:
- Write insightfully and specifically — ground every claim in the actual stars, brightness, and transformations present, never generic filler.
- Maintain a professional, warm, and grounded tone — this is for a paying client, not an academic paper.
- Do not include a disclaimer in every response; it will only be requested once, in the final summary step.
```

---

## Call 1: Core Analysis (→ basic, analysis)

```
Client: Sample Client (Female)
Note: in the chart data below, "soul" refers to the Life Star (命主) and "body" refers to the Body Star (身主) — these are specific stars used for character analysis, NOT the Life Palace or Body Palace.

Natal chart data (JSON, Chinese source terms — translate using the glossary):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure:
{
  "basic": "A structural overview covering: Five Elements class, the Life Star and Body Star, the Life Palace and its main star(s), where the Body Palace falls and what that means, where the Lai Yin Palace (来因宫, 'palace of origin/karma') falls, and the single most important structural tension in the chart (e.g. self-transformations, conflicting stars). 200-300 words.",
  "analysis": "A deep dive into the natal Four Transformations (which palace each of Lu/Quan/Ke/Ji lands in, and what that means) AND the self-transformations (自化) on individual palaces — cite specific palaces and stars. 300-450 words."
}
```

---

## Call 2: Topics (→ topics.*)

```
Client: Sample Client (Female)

Natal chart data (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Core analysis already produced for this client (for context, do not repeat verbatim):
{"basic":"[core analysis step output will be inserted here — basic]","overview":"[not applicable — overview is code-generated, not AI]","analysis":"[core analysis step output will be inserted here — analysis]"}

Produce ONLY valid JSON (no markdown fences, no extra text) with this exact structure — six topic analyses, each 100-150 words, each grounded in the specific palace(s), stars, brightness, and transformations relevant to that topic:
{
  "health": "Based on the Health Palace (疾厄宫)...",
  "study": "Based on the Life Palace and early decades relevant to learning...",
  "business": "Based on the Career Palace (官禄宫)...",
  "money": "Based on the Wealth Palace (财帛宫) and Property Palace (田宅宫)...",
  "relationship": "Based on the Friends Palace (交友宫/仆役宫) and Siblings Palace (兄弟宫)...",
  "marriage": "Based on the Spouse Palace (夫妻宫)..."
}
```

---

## Call 3: Summary (→ summary)

```
Client: Sample Client

Full analysis produced so far:
Core: {"basic":"[core analysis step output will be inserted here — basic]","overview":"[not applicable — overview is code-generated, not AI]","analysis":"[core analysis step output will be inserted here — analysis]"}
Topics: {"health":"[topics step output — health]","study":"[topics step output — study]","business":"[topics step output — business]","money":"[topics step output — money]","relationship":"[topics step output — relationship]","marriage":"[topics step output — marriage]"}

Write a closing summary (200-300 words) that:
1. Names the single core tension or theme running through this chart.
2. Highlights the 2-3 most important pieces of practical guidance across career, wealth, relationships, and health.

Output ONLY the summary text in English. No JSON, no markdown headers, no extra commentary.
```

---

## Call 4: Decade 1 (→ details[0])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 1 of this client's life, ages 3-12.

Year-by-year data for this decade:
[{"age":3,"calendarYear":2002,"stemBranch":"壬午","palaceOfTheYear":"命宫","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":4,"calendarYear":2003,"stemBranch":"癸未","palaceOfTheYear":"父母","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":5,"calendarYear":2004,"stemBranch":"甲申","palaceOfTheYear":"福德","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":6,"calendarYear":2005,"stemBranch":"乙酉","palaceOfTheYear":"田宅","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":7,"calendarYear":2006,"stemBranch":"丙戌","palaceOfTheYear":"官禄","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":8,"calendarYear":2007,"stemBranch":"丁亥","palaceOfTheYear":"仆役","fourTransformations":["太阴","天同","天机","巨门"]},{"age":9,"calendarYear":2008,"stemBranch":"戊子","palaceOfTheYear":"迁移","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":10,"calendarYear":2009,"stemBranch":"己丑","palaceOfTheYear":"疾厄","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":11,"calendarYear":2010,"stemBranch":"庚寅","palaceOfTheYear":"财帛","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":12,"calendarYear":2011,"stemBranch":"辛卯","palaceOfTheYear":"子女","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 5: Decade 2 (→ details[1])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 2 of this client's life, ages 13-22.

Year-by-year data for this decade:
[{"age":13,"calendarYear":2012,"stemBranch":"壬辰","palaceOfTheYear":"夫妻","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":14,"calendarYear":2013,"stemBranch":"癸巳","palaceOfTheYear":"兄弟","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":15,"calendarYear":2014,"stemBranch":"甲午","palaceOfTheYear":"命宫","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":16,"calendarYear":2015,"stemBranch":"乙未","palaceOfTheYear":"父母","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":17,"calendarYear":2016,"stemBranch":"丙申","palaceOfTheYear":"福德","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":18,"calendarYear":2017,"stemBranch":"丁酉","palaceOfTheYear":"田宅","fourTransformations":["太阴","天同","天机","巨门"]},{"age":19,"calendarYear":2018,"stemBranch":"戊戌","palaceOfTheYear":"官禄","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":20,"calendarYear":2019,"stemBranch":"己亥","palaceOfTheYear":"仆役","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":21,"calendarYear":2020,"stemBranch":"庚子","palaceOfTheYear":"迁移","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":22,"calendarYear":2021,"stemBranch":"辛丑","palaceOfTheYear":"疾厄","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 6: Decade 3 (→ details[2])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 3 of this client's life, ages 23-32.

Year-by-year data for this decade:
[{"age":23,"calendarYear":2022,"stemBranch":"壬寅","palaceOfTheYear":"财帛","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":24,"calendarYear":2023,"stemBranch":"癸卯","palaceOfTheYear":"子女","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":25,"calendarYear":2024,"stemBranch":"甲辰","palaceOfTheYear":"夫妻","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":26,"calendarYear":2025,"stemBranch":"乙巳","palaceOfTheYear":"兄弟","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":27,"calendarYear":2026,"stemBranch":"丙午","palaceOfTheYear":"命宫","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":28,"calendarYear":2027,"stemBranch":"丁未","palaceOfTheYear":"父母","fourTransformations":["太阴","天同","天机","巨门"]},{"age":29,"calendarYear":2028,"stemBranch":"戊申","palaceOfTheYear":"福德","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":30,"calendarYear":2029,"stemBranch":"己酉","palaceOfTheYear":"田宅","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":31,"calendarYear":2030,"stemBranch":"庚戌","palaceOfTheYear":"官禄","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":32,"calendarYear":2031,"stemBranch":"辛亥","palaceOfTheYear":"仆役","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 7: Decade 4 (→ details[3])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 4 of this client's life, ages 33-42.

Year-by-year data for this decade:
[{"age":33,"calendarYear":2032,"stemBranch":"壬子","palaceOfTheYear":"迁移","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":34,"calendarYear":2033,"stemBranch":"癸丑","palaceOfTheYear":"疾厄","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":35,"calendarYear":2034,"stemBranch":"甲寅","palaceOfTheYear":"财帛","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":36,"calendarYear":2035,"stemBranch":"乙卯","palaceOfTheYear":"子女","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":37,"calendarYear":2036,"stemBranch":"丙辰","palaceOfTheYear":"夫妻","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":38,"calendarYear":2037,"stemBranch":"丁巳","palaceOfTheYear":"兄弟","fourTransformations":["太阴","天同","天机","巨门"]},{"age":39,"calendarYear":2038,"stemBranch":"戊午","palaceOfTheYear":"命宫","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":40,"calendarYear":2039,"stemBranch":"己未","palaceOfTheYear":"父母","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":41,"calendarYear":2040,"stemBranch":"庚申","palaceOfTheYear":"福德","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":42,"calendarYear":2041,"stemBranch":"辛酉","palaceOfTheYear":"田宅","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 8: Decade 5 (→ details[4])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 5 of this client's life, ages 43-52.

Year-by-year data for this decade:
[{"age":43,"calendarYear":2042,"stemBranch":"壬戌","palaceOfTheYear":"官禄","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":44,"calendarYear":2043,"stemBranch":"癸亥","palaceOfTheYear":"仆役","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":45,"calendarYear":2044,"stemBranch":"甲子","palaceOfTheYear":"迁移","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":46,"calendarYear":2045,"stemBranch":"乙丑","palaceOfTheYear":"疾厄","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":47,"calendarYear":2046,"stemBranch":"丙寅","palaceOfTheYear":"财帛","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":48,"calendarYear":2047,"stemBranch":"丁卯","palaceOfTheYear":"子女","fourTransformations":["太阴","天同","天机","巨门"]},{"age":49,"calendarYear":2048,"stemBranch":"戊辰","palaceOfTheYear":"夫妻","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":50,"calendarYear":2049,"stemBranch":"己巳","palaceOfTheYear":"兄弟","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":51,"calendarYear":2050,"stemBranch":"庚午","palaceOfTheYear":"命宫","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":52,"calendarYear":2051,"stemBranch":"辛未","palaceOfTheYear":"父母","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 9: Decade 6 (→ details[5])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 6 of this client's life, ages 53-62.

Year-by-year data for this decade:
[{"age":53,"calendarYear":2052,"stemBranch":"壬申","palaceOfTheYear":"福德","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":54,"calendarYear":2053,"stemBranch":"癸酉","palaceOfTheYear":"田宅","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":55,"calendarYear":2054,"stemBranch":"甲戌","palaceOfTheYear":"官禄","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":56,"calendarYear":2055,"stemBranch":"乙亥","palaceOfTheYear":"仆役","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":57,"calendarYear":2056,"stemBranch":"丙子","palaceOfTheYear":"迁移","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":58,"calendarYear":2057,"stemBranch":"丁丑","palaceOfTheYear":"疾厄","fourTransformations":["太阴","天同","天机","巨门"]},{"age":59,"calendarYear":2058,"stemBranch":"戊寅","palaceOfTheYear":"财帛","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":60,"calendarYear":2059,"stemBranch":"己卯","palaceOfTheYear":"子女","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":61,"calendarYear":2060,"stemBranch":"庚辰","palaceOfTheYear":"夫妻","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":62,"calendarYear":2061,"stemBranch":"辛巳","palaceOfTheYear":"兄弟","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 10: Decade 7 (→ details[6])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 7 of this client's life, ages 63-72.

Year-by-year data for this decade:
[{"age":63,"calendarYear":2062,"stemBranch":"壬午","palaceOfTheYear":"命宫","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":64,"calendarYear":2063,"stemBranch":"癸未","palaceOfTheYear":"父母","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":65,"calendarYear":2064,"stemBranch":"甲申","palaceOfTheYear":"福德","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":66,"calendarYear":2065,"stemBranch":"乙酉","palaceOfTheYear":"田宅","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":67,"calendarYear":2066,"stemBranch":"丙戌","palaceOfTheYear":"官禄","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":68,"calendarYear":2067,"stemBranch":"丁亥","palaceOfTheYear":"仆役","fourTransformations":["太阴","天同","天机","巨门"]},{"age":69,"calendarYear":2068,"stemBranch":"戊子","palaceOfTheYear":"迁移","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":70,"calendarYear":2069,"stemBranch":"己丑","palaceOfTheYear":"疾厄","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":71,"calendarYear":2070,"stemBranch":"庚寅","palaceOfTheYear":"财帛","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":72,"calendarYear":2071,"stemBranch":"辛卯","palaceOfTheYear":"子女","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```

---

## Call 11: Decade 8 (→ details[7])

```
Client: Sample Client

Natal chart summary (JSON, Chinese source terms):
{"soul":"破军","body":"文昌","fiveElementsClass":"木三局","chineseDate":"庚辰 甲申 丙午 庚寅","sign":"狮子座","zodiac":"龙","palaces":[{"name":"财帛","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"寅","majorStars":[{"name":"武曲","brightness":"得","mutagen":"权"},{"name":"天相","brightness":"庙"}],"minorStars":["天马"]},{"name":"子女","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"卯","majorStars":[{"name":"太阳","brightness":"庙","mutagen":"禄"},{"name":"天梁","brightness":"庙"}],"minorStars":[]},{"name":"夫妻","isBodyPalace":false,"heavenlyStem":"庚","earthlyBranch":"辰","majorStars":[{"name":"七杀","brightness":"庙"}],"minorStars":["右弼","火星"]},{"name":"兄弟","isBodyPalace":false,"heavenlyStem":"辛","earthlyBranch":"巳","majorStars":[{"name":"天机","brightness":"平"}],"minorStars":[]},{"name":"命宫","isBodyPalace":false,"heavenlyStem":"壬","earthlyBranch":"午","majorStars":[{"name":"紫微","brightness":"庙"}],"minorStars":["文曲"]},{"name":"父母","isBodyPalace":false,"heavenlyStem":"癸","earthlyBranch":"未","majorStars":[],"minorStars":["天钺","陀罗"]},{"name":"福德","isBodyPalace":false,"heavenlyStem":"甲","earthlyBranch":"申","majorStars":[{"name":"破军","brightness":"得"}],"minorStars":["文昌","禄存"]},{"name":"田宅","isBodyPalace":false,"heavenlyStem":"乙","earthlyBranch":"酉","majorStars":[],"minorStars":["地空","擎羊"]},{"name":"官禄","isBodyPalace":true,"heavenlyStem":"丙","earthlyBranch":"戌","majorStars":[{"name":"廉贞","brightness":"利"},{"name":"天府","brightness":"庙"}],"minorStars":["左辅"]},{"name":"仆役","isBodyPalace":false,"heavenlyStem":"丁","earthlyBranch":"亥","majorStars":[{"name":"太阴","brightness":"庙","mutagen":"科"}],"minorStars":[]},{"name":"迁移","isBodyPalace":false,"heavenlyStem":"戊","earthlyBranch":"子","majorStars":[{"name":"贪狼","brightness":"旺"}],"minorStars":["铃星"]},{"name":"疾厄","isBodyPalace":false,"heavenlyStem":"己","earthlyBranch":"丑","majorStars":[{"name":"天同","brightness":"不","mutagen":"忌"},{"name":"巨门","brightness":"不"}],"minorStars":["天魁","地劫"]}]}

Analyzing Decade 8 of this client's life, ages 73-82.

Year-by-year data for this decade:
[{"age":73,"calendarYear":2072,"stemBranch":"壬辰","palaceOfTheYear":"夫妻","fourTransformations":["天梁","紫微","左辅","武曲"]},{"age":74,"calendarYear":2073,"stemBranch":"癸巳","palaceOfTheYear":"兄弟","fourTransformations":["破军","巨门","太阴","贪狼"]},{"age":75,"calendarYear":2074,"stemBranch":"甲午","palaceOfTheYear":"命宫","fourTransformations":["廉贞","破军","武曲","太阳"]},{"age":76,"calendarYear":2075,"stemBranch":"乙未","palaceOfTheYear":"父母","fourTransformations":["天机","天梁","紫微","太阴"]},{"age":77,"calendarYear":2076,"stemBranch":"丙申","palaceOfTheYear":"福德","fourTransformations":["天同","天机","文昌","廉贞"]},{"age":78,"calendarYear":2077,"stemBranch":"丁酉","palaceOfTheYear":"田宅","fourTransformations":["太阴","天同","天机","巨门"]},{"age":79,"calendarYear":2078,"stemBranch":"戊戌","palaceOfTheYear":"官禄","fourTransformations":["贪狼","太阴","右弼","天机"]},{"age":80,"calendarYear":2079,"stemBranch":"己亥","palaceOfTheYear":"仆役","fourTransformations":["武曲","贪狼","天梁","文曲"]},{"age":81,"calendarYear":2080,"stemBranch":"庚子","palaceOfTheYear":"迁移","fourTransformations":["太阳","武曲","太阴","天同"]},{"age":82,"calendarYear":2081,"stemBranch":"辛丑","palaceOfTheYear":"疾厄","fourTransformations":["巨门","太阳","文曲","文昌"]}]

Write a single analysis section (200-280 words) for this decade covering:
- The overall theme of this decade, grounded in which natal palace governs it and its stars/transformations
- Call out the 1-3 most significant years within this decade (by age/year), citing the specific palace the year lands in and its transformations, and note whether each is broadly favorable, challenging, or mixed
- Practical guidance for navigating this decade

Output ONLY the analysis text in English prose (you may use light markdown like a bold lead-in phrase, but no headers, no JSON, no code fences).
```
