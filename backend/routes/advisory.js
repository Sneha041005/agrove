import express from "express";
import Crop from "../models/crop.js";
import Soil from "../models/soil.js";
import Activity from "../models/activity.js";
import { generateAdvisory } from "../services/advisoryEngine.js";

const router = express.Router();

router.get("/:fieldId", async (req, res) => {
  try {
    const { fieldId } = req.params;

    const crop = await Crop.findOne({ field: fieldId });
    const soil = await Soil.findOne({ field: fieldId });
    const activities = await Activity.find({ field: fieldId })
      .sort({ date: -1 })
      .limit(5);

    const advisory = generateAdvisory({
      crop,
      soil,
      activities
    });

    res.json({
      success: true,
      advisory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate advisory" });
  }
});

export default router;
