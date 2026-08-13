import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPromt";
import { buildCoreAnalysisPrompt } from "@/lib/ai/prompts/buildCoreAnalysisPromt";
import { buildTopicsPrompt } from "@/lib/ai/prompts/buildTopicsPromt";
import { callX402Api } from "@/lib/x402/client";
import { parseAIJson } from "@/lib/ai/parseAiJson";

interface ClaudeLlmResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    cost: number;
  };
}

interface CoreAnalysisResult {
  basic: string;
  analysis: string;
}

interface TopicsResult {
  health: string;
  study: string;
  business: string;
  money: string;
  relationship: string;
  marriage: string;
}

async function callHaiku(
  userPrompt: string,
  maxTokens: number,
): Promise<ClaudeLlmResponse> {
  return callX402Api<ClaudeLlmResponse>("/api/llm/claude-haiku", {
    messages: [
      { role: "system", content: ZIWEI_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: maxTokens,
  });
}

async function main() {
  const astrolabe = getAstrolabe({
    birthDate: formatDateForIztro(new Date("2000-08-16")),
    shichen: "yin",
    gender: "female",
  });

  const chartSummary = summarizeAstrolabeForAI(astrolabe);

  // Step 1: Core analysis
  console.log("=== Call 1: Core Analysis ===");
  console.time("core analysis");
  const coreRes = await callHaiku(
    buildCoreAnalysisPrompt({
      name: "Test Client",
      gender: "Female",
      chartSummary,
    }),
    2048,
  );
  console.timeEnd("core analysis");
  console.log("Cost:", coreRes.usage.cost);

  const coreAnalysis = parseAIJson<CoreAnalysisResult>(coreRes.content);
  console.log("basic length:", coreAnalysis.basic.length);
  console.log("analysis length:", coreAnalysis.analysis.length);

  // Step 2: Topics
  console.log("\n=== Call 2: Topics ===");
  console.time("topics");
  const topicsRes = await callHaiku(
    buildTopicsPrompt({
      name: "Test Client",
      gender: "Female",
      chartSummary,
      coreAnalysis,
    }),
    2048,
  );
  console.timeEnd("topics");
  console.log("Cost:", topicsRes.usage.cost);

  const topics = parseAIJson<TopicsResult>(topicsRes.content);

  console.log("\n--- Topics content ---\n");
  for (const [key, value] of Object.entries(topics)) {
    console.log(`[${key}] (${value.length} chars)\n${value}\n`);
  }

  console.log(
    "\n--- Self-transformations reference (for manual cross-check) ---",
  );
  chartSummary.palaces.forEach((p) => {
    if (p.selfTransformations.length > 0) {
      console.log(`${p.name}:`, p.selfTransformations);
    }
  });

  console.log(
    "\nTotal cost this run:",
    coreRes.usage.cost + topicsRes.usage.cost,
  );
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
