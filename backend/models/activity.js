import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  field: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Field", 
    required: true 
  },
  type: { type: String, required: true }, // e.g., "irrigation", "fertilization"
  date: { type: Date, default: Date.now },
  description: String
});

// Ensure you are exporting the MODEL, not just the schema
const Activity = mongoose.model("Activity", activitySchema);
export default Activity;