import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { parseAIJson } from "@/lib/ai/parseAIJson";
import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPrompt";
import { buildCoreAnalysisPrompt } from "@/lib/ai/prompts/buildCoreAnalysisPrompt";
import { callX402Api } from "@/lib/x402/client";

interface ClaudeLlmResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

async function main() {
  const astrolabe = getAstrolabe({
    birthDate: formatDateForIztro(new Date("2000-08-16")),
    shichen: "yin",
    gender: "female",
  });

  const chartSummary = summarizeAstrolabeForAI(astrolabe);

  const userPrompt = buildCoreAnalysisPrompt({
    name: "Test Client",
    gender: "Female",
    chartSummary,
  });

  console.log("Sending request via x402...");
  console.time("x402 call");

  const response = await callX402Api<ClaudeLlmResponse>(
    "/api/llm/claude-haiku",
    {
      messages: [
        { role: "system", content: ZIWEI_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 2048,
    },
  );

  console.timeEnd("x402 call");
  console.log("Model:", response.model);
  console.log("Usage:", response.usage);
  console.log("\n--- Raw content ---\n");
  console.log(response.content);

  try {
    const parsed = parseAIJson<{ basic: string; analysis: string }>(
      response.content,
    );
    console.log("\n--- Parsed successfully ---");
    console.log("basic length:", parsed.basic?.length);
    console.log("analysis length:", parsed.analysis?.length);
  } catch (err) {
    console.warn("\n⚠️ Failed to parse:", err);
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
