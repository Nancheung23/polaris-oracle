import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { getDecadeTimelines } from "@/lib/iztro/getDecadeTimelines";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPromt";
import { buildCoreAnalysisPrompt } from "@/lib/ai/prompts/buildCoreAnalysisPromt";
import { buildTopicsPrompt } from "@/lib/ai/prompts/buildTopicsPromt";
import { buildSummaryPrompt } from "@/lib/ai/prompts/buildSummaryPromt";
import { buildDecadePrompt } from "@/lib/ai/prompts/buildDecadePromt";
import fs from "node:fs";

const birthDate = new Date("2000-08-16");
const astrolabe = getAstrolabe({
  birthDate: formatDateForIztro(birthDate),
  shichen: "yin",
  gender: "female",
});

const chartSummary = summarizeAstrolabeForAI(astrolabe);
const decadeTimelines = getDecadeTimelines(astrolabe, birthDate);

const mockCoreAnalysis = {
  basic: "[core analysis step output will be inserted here — basic]",
  overview: "[not applicable — overview is code-generated, not AI]",
  analysis: "[core analysis step output will be inserted here — analysis]",
};

const mockTopics = {
  health: "[topics step output — health]",
  study: "[topics step output — study]",
  business: "[topics step output — business]",
  money: "[topics step output — money]",
  relationship: "[topics step output — relationship]",
  marriage: "[topics step output — marriage]",
};

const sections: string[] = [];

sections.push(
  `# Prompt Preview\n\nGenerated for: sample client (female, 2000-08-16, 寅时)\n`,
);

sections.push(
  `## System Prompt (shared across all calls)\n\n\`\`\`\n${ZIWEI_SYSTEM_PROMPT}\n\`\`\`\n`,
);

sections.push(
  `## Call 1: Core Analysis (→ basic, analysis)\n\n\`\`\`\n${buildCoreAnalysisPrompt(
    {
      name: "Sample Client",
      gender: "Female",
      chartSummary,
    },
  )}\n\`\`\`\n`,
);

sections.push(
  `## Call 2: Topics (→ topics.*)\n\n\`\`\`\n${buildTopicsPrompt({
    name: "Sample Client",
    gender: "Female",
    chartSummary,
    coreAnalysis: mockCoreAnalysis,
  })}\n\`\`\`\n`,
);

sections.push(
  `## Call 3: Summary (→ summary)\n\n\`\`\`\n${buildSummaryPrompt({
    name: "Sample Client",
    coreAnalysis: mockCoreAnalysis,
    topics: mockTopics,
  })}\n\`\`\`\n`,
);

decadeTimelines.forEach((decade) => {
  sections.push(
    `## Call ${4 + decade.decadeIndex}: Decade ${
      decade.decadeIndex + 1
    } (→ details[${decade.decadeIndex}])\n\n\`\`\`\n${buildDecadePrompt({
      name: "Sample Client",
      chartSummary,
      decade,
    })}\n\`\`\`\n`,
  );
});

const output = sections.join("\n---\n\n");
const outputPath = "prompt-preview.md";
fs.writeFileSync(outputPath, output, "utf-8");

console.log(`Written to ${outputPath}`);
console.log(`Total calls previewed: ${3 + decadeTimelines.length}`);
