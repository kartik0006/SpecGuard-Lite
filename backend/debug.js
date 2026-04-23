import dotenv from 'dotenv';
dotenv.config();

async function findMyModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Error: No API key found in .env file!");
    return;
  }

  console.log("🔍 Checking API Key ending in:", apiKey.slice(-4));
  console.log("⏳ Asking Google for your allowed models...\n");

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.error("❌ Google rejected the key:", data.error.message);
      return;
    }

    // Filter only the models that support generating text/content
    const validModels = data.models
      .filter(m => m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name.replace('models/', '')); // clean up the name

    console.log("✅ SUCCESS! Your key can use these models:");
    console.table(validModels);
    
    console.log("\n👉 Copy one of the names above and put it in auditController.js!");

  } catch (error) {
    console.error("❌ Failed to reach Google:", error.message);
  }
}

findMyModels();