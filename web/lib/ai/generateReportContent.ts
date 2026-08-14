import { getAstrolabe, formatDateForIztro } from "@/lib/iztro/getAstrolabe";
import { summarizeAstrolabeForAI } from "@/lib/iztro/summarizeAstrolabe";
import { getDecadeTimelines } from "@/lib/iztro/getDecadeTimelines";
import { buildPalaceOverviewTable } from "@/lib/reports/buildPalaceOverviewTable";
import { ZIWEI_SYSTEM_PROMPT } from "@/lib/ai/prompts/ziweiSystemPrompt";
import { buildCoreAnalysisPrompt } from "@/lib/ai/prompts/buildCoreAnalysisPrompt";
import { buildTopicsPrompt } from "@/lib/ai/prompts/buildTopicsPrompt";
import { buildSummaryPrompt } from "@/lib/ai/prompts/buildSummaryPrompt";
import { buildDecadePrompt } from "@/lib/ai/prompts/buildDecadePrompt";
import { callX402Api } from "@/lib/x402/client";
import { parseAIJson } from "@/lib/ai/parseAIJson";
import { ZIWEI_DISCLAIMER } from "@/lib/ai/disclaimer";
import type { CoreAnalysisResult, TopicsResult } from "@/lib/ai/types";
import type { Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";

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

interface GenerateReportContentInput {
  name: string;
  gender: Gender;
  birthDate: Date;
  shichen: Shichen;
  location: string;
}

interface GenerateReportContentResult {
  reportContent: {
    basic: string;
    overview: string;
    analysis: string;
    topics: TopicsResult;
    details: string[];
    summary: string;
  };
  totalCost: number;
}

const GENDER_TO_EN: Record<Gender, "Male" | "Female"> = {
  male: "Male",
  female: "Female",
};

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

export async function generateReportContent(
  input: GenerateReportContentInput,
): Promise<GenerateReportContentResult> {
  const { name, gender, birthDate, shichen, location } = input;
  const genderEn = GENDER_TO_EN[gender];

  let totalCost = 0;
  const track = (res: ClaudeLlmResponse) => {
    totalCost += res.usage.cost;
    return res;
  };

  const astrolabe = getAstrolabe({
    birthDate: formatDateForIztro(birthDate),
    shichen,
    gender,
  });
  const chartSummary = summarizeAstrolabeForAI(astrolabe);
  const decadeTimelines = getDecadeTimelines(astrolabe, birthDate);

  // overview
  const overview = buildPalaceOverviewTable(chartSummary);

  // Call 1
  const coreRes = track(
    await callHaiku(
      buildCoreAnalysisPrompt({ name, gender: genderEn, chartSummary }),
      2048,
    ),
  );
  const coreAnalysis = parseAIJson<CoreAnalysisResult>(coreRes.content);

  // Call 2
  const topicsRes = track(
    await callHaiku(
      buildTopicsPrompt({ name, gender: genderEn, chartSummary, coreAnalysis }),
      2048,
    ),
  );
  const topics = parseAIJson<TopicsResult>(topicsRes.content);

  // Call 3
  const summaryRes = track(
    await callHaiku(buildSummaryPrompt({ name, coreAnalysis, topics }), 1024),
  );
  const summary = `${summaryRes.content.trim()}\n\n${ZIWEI_DISCLAIMER}`;

  // Call 4-11
  const decadeResponses = await Promise.all(
    decadeTimelines.map((decade) =>
      callHaiku(buildDecadePrompt({ name, chartSummary, decade }), 1024),
    ),
  );
  decadeResponses.forEach(track);
  const details = decadeResponses.map((res) => res.content.trim());

  return {
    reportContent: {
      basic: coreAnalysis.basic,
      overview,
      analysis: coreAnalysis.analysis,
      topics,
      details,
      summary,
    },
    totalCost,
  };
}
