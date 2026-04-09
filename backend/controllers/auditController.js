import fetch from "node-fetch"; // remove if Node >= 18
import dotenv from "dotenv";

dotenv.config();

export const analyzeCode = async (req, res) => {
  try {
    const { prd, code } = req.body;

    if (!prd || !code) {
      return res.status(400).json({
        error: "Both PRD and Code are required"
      });
    }

    // 🔥 STRONG PROMPT (UPGRADED)
    const prompt = `
You are a STRICT AI Code Auditor.

Compare the PRD and the Code VERY carefully.

Rules:
- If feature fully exists → implemented
- If partially exists → partial (with reason)
- If not present at all → missing
- DO NOT skip any feature
- Be accurate and strict

Return ONLY valid JSON (no explanation, no markdown):

{
  "coverage": number (0-100),
  "implemented": [],
  "partial": [],
  "missing": []
}

PRD:
${prd}

CODE:
${code}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        route: "fallback",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

  console.log("FULL TEXT:", data.choices[0].message.content); 

    // ✅ SAFE CHECK
    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({
        error: "AI failed",
        full: data
      });
    }

    const text = data.choices[0].message.content;

    // 🔥 CLEAN RESPONSE
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("PARSE ERROR:", cleaned);

      return res.status(500).json({
        error: "JSON parse failed",
        raw: cleaned
      });
    }

    // ✅ EXTRA SAFETY (ensure fields exist)
    const finalResult = {
      coverage: parsed.coverage || 0,
      implemented: parsed.implemented || [],
      partial: parsed.partial || [],
      missing: parsed.missing || []
    };

    res.json(finalResult);

  } catch (error) {
    console.error("FINAL ERROR:", error);
    res.status(500).json({
      error: "Server failed"
    });
  }
};