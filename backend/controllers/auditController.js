import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const analyzeCode = async (req, res) => {
  try {
    console.log("ENV KEY:", process.env.OPENROUTER_API_KEY);

    const { prd, code } = req.body;

    if (!prd || !code) {
      return res.status(400).json({
        error: "Both PRD and Code are required"
      });
    }

    // ❗ STOP if key missing
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "API key not found"
      });
    }

    const prompt = `
You are a STRICT AI Code Auditor.

Compare the PRD and the Code VERY carefully.

Return ONLY valid JSON:

{
  "coverage": number,
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
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpecGuard Lite"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    // ❗ HANDLE API ERROR
    if (!response.ok) {
      const errText = await response.text();
      console.error("API ERROR:", errText);

      return res.status(500).json({
        error: "API request failed",
        details: errText
      });
    }

    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    // ❗ SAFE CHECK (NO MORE CRASH)
    if (!data || !data.choices || data.choices.length === 0) {
      return res.status(500).json({
        error: "Invalid AI response",
        full: data
      });
    }

    const text = data.choices[0]?.message?.content;

    if (!text) {
      return res.status(500).json({
        error: "Empty AI response",
        full: data
      });
    }

    // CLEAN JSON
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

    return res.json({
      coverage: parsed.coverage || 0,
      implemented: Array.isArray(parsed.implemented) ? parsed.implemented : [],
      partial: Array.isArray(parsed.partial) ? parsed.partial : [],
      missing: Array.isArray(parsed.missing) ? parsed.missing : []
    });

  } catch (error) {
    console.error("FINAL ERROR:", error);

    return res.status(500).json({
      error: "Server failed"
    });
  }
};