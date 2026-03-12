export async function callClaude(messages, useWebSearch) {
  const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    messages,
  };
  if (useWebSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  }
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("API Error: " + response.status);
  const data = await response.json();
  return data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");
}
