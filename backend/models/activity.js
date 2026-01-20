
import mongoose from "mongoose";  

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    enum: ["Sowing", "Irrigation", "Fertilization", "Harvest"],
  },
  description: String,
  date: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
