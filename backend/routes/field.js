import express from "express";
import Field from "../models/field.js";
import Activity from "../models/activity.js";
import { generateAdvisory } from "../services/advisoryEngine.js";

const router = express.Router();

// GET advisory suggestions for a field
router.get("/:fieldId/suggestions", async (req, res) => {
  try {
    const field = await Field.findById(req.params.fieldId)
      .populate("crop")
      .populate("soil");

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    if (!field.crop || !field.soil) {
      return res
        .status(400)
        .json({ message: "Crop or soil details missing" });
    }

    if (!field.crop.sowingDate) {
      return res
        .status(400)
        .json({ message: "Sowing date not found" });
    }

    // Activities should be linked to field OR crop — adjust if needed
    const activities = await Activity.find({
      field: field._id,
    }).sort({ date: -1 });

    const advisory = generateAdvisory({
      crop: field.crop,
      soil: field.soil,
      activities,
    });

    res.json({
      success: true,
      advisory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate advisory" });
  }
});

export default router;
