import express from "express";
import Crop from "../models/crop.js";
import MarketPrice from "../models/marketPrice.js";
import { generateMarketAdvisory } from "../services/marketPriceEngine.js";

const router = express.Router();

router.get("/:fieldId", async (req, res) => {
  try {
    const crop = await Crop.findOne({ field: req.params.fieldId });

    if (!crop) {
      return res.json({ advisory: ["Crop not found"] });
    }

    const prices = await MarketPrice.find({
      cropName: crop.cropName
    })
      .sort({ date: -1 })
      .limit(7);

    const advisory = generateMarketAdvisory({
      crop,
      prices
    });

    res.json({ success: true, advisory });
  } catch (err) {
    res.status(500).json({ message: "Market advisory failed" });
  }
});

export default router;
