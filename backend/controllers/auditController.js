import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCode = async (req, res) => {
  try {
    const { prd, code } = req.body;

    if (!prd || !code) {
      return res.status(400).json({ error: "Both PRD and Code are required." });
    }

    // We use Flash for speed, and force it to return a JSON object
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // The Prompt Engine: Telling Gemini exactly how to behave
    const prompt = `
      You are an expert AI Code Auditor. Your job is to compare the provided Product Requirements Document (PRD) against the provided Source Code.
      
      You must return ONLY a JSON object using the exact structure below. Do not include markdown formatting or extra text.
      
      {
        "coverage": <number between 0-100 representing the overall percentage of PRD met>,
        "implemented": ["List of fully implemented features"],
        "partial": ["List of partially implemented features, with a brief note on what is missing"],
        "missing": ["List of completely missing features"]
      }

      --- PRD ---
      ${prd}

      --- Source Code ---
      ${code}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Send the structured JSON back to the frontend
    res.status(200).json(JSON.parse(responseText));

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to analyze the code." });
  }
};