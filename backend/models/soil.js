import mongoose from "mongoose";


const soilSchema = new mongoose.Schema({
  field: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
  ph: Number,
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
});

export default mongoose.model("Soil", soilSchema);
