import AdvisoryModel from "../models/advisory.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getCropStage(sowingDate) {
  if (!sowingDate) return "sowing";
  const now = new Date();
  const start = new Date(sowingDate);
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  if (diffDays < 15) return "sowing";
  if (diffDays < 60) return "vegetative";
  if (diffDays < 90) return "flowering";
  return "maturity";
}

export async function generateAdvisory({ crop, soil, activities }) {
  let adviceList = [];

  if (!crop || !soil) {
    return ["Please add crop and soil details to receive personalized advisory."];
  }

  const stage = getCropStage(crop.sowingDate);
  const cropName = crop.name;
  const soilType = (soil.soilType || soil.type || "unknown");

  try {
    // 1. Fetch from Database (Your existing logic)
    const dbSuggestions = await AdvisoryModel.find({
      crop: cropName.toLowerCase(),
      stage: stage
    });
    dbSuggestions.forEach(item => adviceList.push(item.suggestion));

    // 2. Activity Check (Your existing logic)
    const hasRecentIrrigation = activities?.some(a => a.type?.toLowerCase() === "irrigation");
    if (!hasRecentIrrigation && stage !== "maturity") {
      adviceList.push(`Warning: No recent irrigation recorded for ${cropName} in ${stage} stage.`);
    }

    // 3. ✨ NEW: Add Gemini AI Strategic Insight
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const aiPrompt = `Act as an expert agronomist. 
      Crop: ${cropName}, 
      Soil: ${soilType}, 
      Current Stage: ${stage}, 
      Recent Activities: ${activities.map(a => a.type).join(", ") || "None"}.
      Provide one unique, high-value expert tip for this specific scenario.`;

    const result = await model.generateContent(aiPrompt);
    const aiTip = result.response.text();
    
    // Add the AI tip to the top with a special tag
    adviceList.unshift(`🤖 AI INSIGHT: ${aiTip}`);

    return adviceList;

  } catch (error) {
    console.error("Advisory Engine Error:", error);
    return adviceList.length > 0 ? adviceList : ["Error generating AI tips, follow local database suggestions."];
  }
}