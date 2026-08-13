export function parseAIJson<T = unknown>(rawContent: string): T {
  const cleaned = rawContent
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");

  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    throw new Error(
      `Failed to parse AI response as JSON. Cleaned content:\n${cleaned}\n\nOriginal error: ${err}`,
    );
  }
}
