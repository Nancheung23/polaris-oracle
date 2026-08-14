import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { generateReportContent } from "@/lib/ai/generateReportContent";

async function main() {
  console.log("Starting full report generation (11 AI calls)...");
  console.time("total generation time");

  const { reportContent, totalCost } = await generateReportContent({
    name: "Test Client",
    gender: "female",
    birthDate: new Date("2000-08-16"),
    shichen: "yin",
    location: "Beijing",
  });

  console.timeEnd("total generation time");
  console.log("\n=== Total cost ===");
  console.log(`$${totalCost.toFixed(4)}`);

  console.log("\n=== overview (code-generated, not AI) ===");
  console.log(reportContent.overview);

  console.log(`\n=== basic (${reportContent.basic.length} chars) ===`);
  console.log(reportContent.basic);

  console.log(`\n=== analysis (${reportContent.analysis.length} chars) ===`);
  console.log(reportContent.analysis);

  console.log("\n=== topics ===");
  for (const [key, value] of Object.entries(reportContent.topics)) {
    console.log(`\n[${key}] (${value.length} chars)`);
    console.log(value);
  }

  console.log("\n=== details (8 decades) ===");
  reportContent.details.forEach((text, i) => {
    console.log(`\n[Decade ${i + 1}] (${text.length} chars)`);
    console.log(text);
  });

  console.log(`\n=== summary (${reportContent.summary.length} chars) ===`);
  console.log(reportContent.summary);

  console.log("\n=== Field presence check ===");
  const fields: Array<[string, unknown]> = [
    ["basic", reportContent.basic],
    ["overview", reportContent.overview],
    ["analysis", reportContent.analysis],
    ["topics.health", reportContent.topics.health],
    ["topics.study", reportContent.topics.study],
    ["topics.business", reportContent.topics.business],
    ["topics.money", reportContent.topics.money],
    ["topics.relationship", reportContent.topics.relationship],
    ["topics.marriage", reportContent.topics.marriage],
    ["summary", reportContent.summary],
  ];
  let allPresent = true;
  fields.forEach(([label, value]) => {
    const ok = typeof value === "string" && value.length > 0;
    if (!ok) allPresent = false;
    console.log(`${ok ? "✅" : "❌"} ${label}`);
  });
  console.log(
    `details array: ${
      reportContent.details.length === 8 ? "✅" : "❌"
    } (expected 8, got ${reportContent.details.length})`,
  );
  if (reportContent.details.some((d) => d.length === 0)) {
    allPresent = false;
    console.log("❌ at least one decade entry is empty");
  }

  console.log(
    `\n${
      allPresent && reportContent.details.length === 8
        ? "✅ All fields present"
        : "❌ Some fields missing — review above"
    }`,
  );
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
