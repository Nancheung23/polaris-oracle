import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { getDecadeTimelines } from "@/lib/iztro/getDecadeTimelines";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPrompt";
import { buildDecadePrompt } from "@/lib/ai/prompts/buildDecadePrompt";
import { callX402Api } from "@/lib/x402/client";

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

async function main() {
  const birthDate = new Date("2000-08-16");
  const astrolabe = getAstrolabe({
    birthDate: formatDateForIztro(birthDate),
    shichen: "yin",
    gender: "female",
  });

  const chartSummary = summarizeAstrolabeForAI(astrolabe);
  const decadeTimelines = getDecadeTimelines(astrolabe, birthDate);

  const targetDecade = decadeTimelines[1];

  console.log(
    `=== Decade ${targetDecade.decadeIndex + 1} (ages ${
      targetDecade.ageRange[0]
    }-${targetDecade.ageRange[1]}) ===`,
  );
  console.time("decade call");

  const response = await callX402Api<ClaudeLlmResponse>(
    "/api/llm/claude-haiku",
    {
      messages: [
        { role: "system", content: ZIWEI_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildDecadePrompt({
            name: "Test Client",
            chartSummary,
            decade: targetDecade,
          }),
        },
      ],
      max_tokens: 1024,
    },
  );

  console.timeEnd("decade call");
  console.log("Cost:", response.usage.cost);
  console.log(
    `\n--- Decade analysis (${response.content.trim().length} chars) ---\n`,
  );
  console.log(response.content.trim());

  console.log("\n--- Source data (for manual cross-check) ---");
  console.log(JSON.stringify(targetDecade.years, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
