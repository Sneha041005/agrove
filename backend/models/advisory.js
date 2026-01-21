import mongoose from "mongoose";

const advisorySchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
      lowercase: true,
    },
    soilType: {
      type: String,
      required: true,
      lowercase: true,
    },
    stage: {
      type: String,
      required: true,
      enum: ["sowing", "vegetative", "flowering", "maturity"],
    },
    suggestion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Advisory = mongoose.model("Advisory", advisorySchema);
export default Advisory;
