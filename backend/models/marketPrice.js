import mongoose from "mongoose";

const marketPriceSchema = new mongoose.Schema({
  cropName: String,
  market: String,
  price: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("MarketPrice", marketPriceSchema);
