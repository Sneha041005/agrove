import mongoose from "mongoose";


const cropSchema = new mongoose.Schema({
  field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
  cropName: String,
  season: String,
  sowingDate: Date,
  expectedHarvest: Date
});

export default mongoose.model("Crop", cropSchema);
