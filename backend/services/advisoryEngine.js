import AdvisoryModel from "../models/advisory.js";

/**
 * Calculates the growth stage based on sowing date
 */
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

/**
 * Main logic to generate advice array
 */
export async function generateAdvisory({ crop, soil, activities }) {
  const adviceList = [];

  // 1. Check if basic data exists
  if (!crop || !soil) {
    return ["Please add crop and soil details to receive personalized advisory."];
  }

  // 2. Identify current status
  const stage = getCropStage(crop.sowingDate);
  const cropName = crop.name.toLowerCase();
  const soilType = (soil.soilType || soil.type || "unknown").toLowerCase();

  try {
    // 3. Fetch matching expert tips from the Database
    const dbSuggestions = await AdvisoryModel.find({
      crop: cropName,
      stage: stage
    });

    // Add DB tips to our list
    dbSuggestions.forEach(item => adviceList.push(item.suggestion));

    // 4. Real-time Activity Checks
    const hasRecentIrrigation = activities?.some(
      (a) => a.type?.toLowerCase() === "irrigation"
    );

    if (!hasRecentIrrigation && stage !== "maturity") {
      adviceList.push(`Warning: No recent irrigation recorded. Ensure ${cropName} has adequate moisture during the ${stage} stage.`);
    }

    // 5. Fallback if no specific tips were found
    if (adviceList.length === 0) {
      adviceList.push(`Your ${cropName} is currently in the ${stage} stage. Continue regular field scouting for pests.`);
    }

    return adviceList;

  } catch (error) {
    console.error("Advisory Engine Error:", error);
    return ["Unable to fetch expert tips. Please check soil moisture levels manually."];
  }
}