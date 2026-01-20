import mongoose from "mongoose";

const advisorySchema = new mongoose.Schema({
  crop: String,
  soilType: String,
  stage: String,
  suggestion: String,
});

const Advisory = mongoose.model("Advisory", advisorySchema);
export default Advisory;  
