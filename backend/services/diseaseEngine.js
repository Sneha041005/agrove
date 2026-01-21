export function detectDisease({ cropName, symptoms }) {
  if (!cropName || !symptoms || symptoms.length === 0) {
    return {
      disease: "Unknown",
      confidence: "low",
      advice: "Provide clear image or symptoms for diagnosis."
    };
  }

  const crop = cropName.toLowerCase();
  const s = symptoms.map(x => x.toLowerCase());

  // 🌾 Rice diseases
  if (
    crop === "rice" &&
    s.includes("brown spots") &&
    s.includes("yellow leaves")
  ) {
    return {
      disease: "Brown Spot Disease",
      confidence: "medium",
      advice:
        "Apply recommended fungicide and improve field drainage."
    };
  }

  // 🌽 General fungal disease
  if (s.includes("white patches") || s.includes("powdery")) {
    return {
      disease: "Fungal Infection",
      confidence: "low",
      advice:
        "Avoid overhead irrigation and consider fungicide spray."
    };
  }

  return {
    disease: "Not detected",
    confidence: "low",
    advice: "No major disease detected. Continue monitoring."
  };
}
