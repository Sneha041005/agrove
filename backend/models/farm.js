import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  location: String,
  area: Number, 
}, { timestamps: true });

export default mongoose.model("Farm", farmSchema);
