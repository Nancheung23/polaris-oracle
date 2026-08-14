import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPrompt";
import { buildCoreAnalysisPrompt } from "@/lib/ai/prompts/buildCoreAnalysisPrompt";
import { buildTopicsPrompt } from "@/lib/ai/prompts/buildTopicsPrompt";
import { buildSummaryPrompt } from "@/lib/ai/prompts/buildSummaryPrompt";
import { callX402Api } from "@/lib/x402/client";
import { parseAIJson } from "@/lib/ai/parseAIJson";
import { ZIWEI_DISCLAIMER } from "@/lib/ai/disclaimer";

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
  let totalCost = 0;

  console.log("=== Call 1: Core Analysis ===");
  const coreRes = await callHaiku(
    buildCoreAnalysisPrompt({
      name: "Test Client",
      gender: "Female",
      chartSummary,
    }),
    2048,
  );
  totalCost += coreRes.usage.cost;
  const coreAnalysis = parseAIJson<CoreAnalysisResult>(coreRes.content);
  console.log("Done. Cost:", coreRes.usage.cost);

  console.log("\n=== Call 2: Topics ===");
  const topicsRes = await callHaiku(
    buildTopicsPrompt({
      name: "Test Client",
      gender: "Female",
      chartSummary,
      coreAnalysis,
    }),
    2048,
  );
  totalCost += topicsRes.usage.cost;
  const topics = parseAIJson<TopicsResult>(topicsRes.content);
  console.log("Done. Cost:", topicsRes.usage.cost);

  console.log("\n=== Call 3: Summary ===");
  console.time("summary");
  const summaryRes = await callHaiku(
    buildSummaryPrompt({ name: "Test Client", coreAnalysis, topics }),
    1024,
  );
  console.timeEnd("summary");
  totalCost += summaryRes.usage.cost;
  console.log("Cost:", summaryRes.usage.cost);

  // summary 是纯文本，不是 JSON，不走 parseAIJson
  const aiSummary = summaryRes.content.trim();
  const finalSummary = `${aiSummary}\n\n${ZIWEI_DISCLAIMER}`;

  console.log(`\n--- AI summary (${aiSummary.length} chars) ---\n`);
  console.log(aiSummary);

  console.log(
    `\n--- Final summary with disclaimer appended (${finalSummary.length} chars) ---\n`,
  );
  console.log(finalSummary);

  console.log("\nTotal cost this run:", totalCost);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
