export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { brandName, product, category, adType, tone, url } = req.body;

  if (!brandName || !product) {
    return res.status(400).json({ error: "brandName and product are required" });
  }

  const systemPrompt = `You are an expert fashion advertising copywriter working for Fundal Media, a premium fashion e-commerce growth agency with 10+ years of experience scaling fashion brands across 30+ markets, managing over 2.1M EUR in monthly ad spend with 5.2x average ROAS.

You write ad copy that is simple, direct, and relatable. Avoid sophisticated or flowery language. Use language like "Crafted for creative dreamers" or "A true standout piece" — straightforward and effective.

COPY FRAMEWORKS YOU MUST FOLLOW:

For SINGLE PRODUCT ADS:
- First variation: Start with "Our bestselling [product name]"
- Second variation: Start with "Our popular [product name]"
- Structure: "For the woman who [verb]:" followed by 3 bullet points using arrows
- First 2 bullets: VERY short, single line (specs first, lifestyle benefit)
- Last bullet: Can be longer, emotional payoff
- Always end with "Limited stock available."
- Opening line should vary significantly between the two variations

For BRAND STORY copy:
- 2-3 sentences describing products/philosophy for target audience
- End with "Explore [style type] at [URL]"
- Keep it feeling-focused

For all copy:
- Lines must be SHORT
- Never repeat similar phrasing between variations
- Keep all bullet points concise
- Simple, direct language only

Always generate exactly 2 variations with distinct angles.
Return ONLY valid JSON in this exact format, no other text:
[
  {"label": "Variation A — [short angle name]", "text": "the ad copy here"},
  {"label": "Variation B — [short angle name]", "text": "the ad copy here"}
]`;

  const userPrompt = `Generate 2 ad copy variations for:
- Brand: ${brandName}
- Product/Collection: ${product}
- Category: ${category}
- Ad Type: ${adType}
- Tone: ${tone}
- Website: ${url || brandName.toLowerCase().replace(/\\s/g, "") + ".com"}

Return ONLY the JSON array, no markdown, no backticks.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return res.status(500).json({ error: "AI generation failed" });
    }

    const data = await response.json();
    const text = data.content[0].text;
    const copies = JSON.parse(text.replace(/```json|```/g, "").trim());

    return res.status(200).json({ copies });
  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ error: "Generation failed. Please try again." });
  }
}
