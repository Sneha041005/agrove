export function generateAdvisory({ crop, soil, recentActivities }) {
  let advice = [];

  if (crop?.cropName === "Rice" && soil?.soilType === "Clay") {
    advice.push("Rice in clay soil needs good drainage management");
  }

  const irrigationDone = recentActivities?.some(
    a => a.type === "Irrigation"
  );

  if (!irrigationDone) {
    advice.push("No recent irrigation recorded. Consider irrigating.");
  }

  if (advice.length === 0) {
    advice.push("No specific advisory available at the moment.");
  }

  return advice;
}
