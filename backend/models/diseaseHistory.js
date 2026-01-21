import mongoose from "mongoose";

const diseaseHistorySchema = new mongoose.Schema({
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
    required: true
  },
  cropName: String,
  disease: String,
  confidence: String,
  advice: String,
  image: String,
  detectedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model(
  "DiseaseHistory",
  diseaseHistorySchema
);
