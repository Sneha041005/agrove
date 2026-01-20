import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm" },
  name: String,
  soilType: String,
  area: Number,
});

export default mongoose.model("Field", fieldSchema);
