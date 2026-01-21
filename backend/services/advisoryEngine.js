function getCropStage(sowingDate) {
  if (!sowingDate) return "unknown";

  const days =
    (Date.now() - new Date(sowingDate)) / (1000 * 60 * 60 * 24);

  if (days < 20) return "germination";
  if (days < 45) return "vegetative";
  if (days < 80) return "flowering";
  return "maturity";
}

export function generateAdvisory({ crop, soil, activities }) {
  const advice = [];

  if (!crop || !soil) {
    return ["Add crop and soil details to receive advisory"];
  }
const stage = getCropStage(crop.sowingDate);

// 🌱 Stage-based rules
if (stage === "germination") {
  advice.push("Maintain adequate soil moisture during germination stage.");
}

if (stage === "vegetative") {
  advice.push("Vegetative stage: ensure nitrogen availability.");
}

if (stage === "flowering") {
  advice.push("Flowering stage: avoid water stress and monitor pests.");
}

  // 🌾 Crop + soil rules
  if (
    crop.cropName?.toLowerCase() === "rice" &&
    soil.soilType === "Clay"
  ) {
    advice.push("Ensure proper drainage for rice grown in clay soil.");
  }

  // 🚿 Activity-based rules
  const hasRecentIrrigation = activities?.some(
    a => a.type === "Irrigation"
  );

  if (!hasRecentIrrigation) {
    advice.push("No recent irrigation found. Consider irrigating the field.");
  }

  const hasFertilizer = activities?.some(
    a => a.type === "Fertilization"
  );

  if (!hasFertilizer) {
    advice.push("Fertilizer not applied recently. Check nutrient requirements.");
  }

  if (advice.length === 0) {
    advice.push("Crop conditions look normal. Continue regular monitoring.");
  }

  return advice;
}
