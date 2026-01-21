import express from "express";
import Crop from "../models/crop.js";
import Soil from "../models/soil.js";
import Activity from "../models/activity.js";
import { generateAdvisory } from "../services/advisoryEngine.js";

const router = express.Router();

// GET /api/advisory/:fieldId
router.get("/:fieldId", async (req, res) => {
  try {
    const { fieldId } = req.params;

    // 1. Fetch related data using the fieldId
    // We use findOne because each field typically has one active crop/soil record
    const crop = await Crop.findOne({ field: fieldId });
    const soil = await Soil.findOne({ field: fieldId });
    
    // Fetch last 5 activities to check for recent irrigation/fertilization
    const recentActivities = await Activity.find({ field: fieldId })
      .sort({ date: -1 })
      .limit(5);

    // 2. Generate the advisory using our engine logic
    const advisory = await generateAdvisory({
      crop,
      soil,
      activities: recentActivities
    });

    // 3. Return response
    res.json({
      success: true,
      fieldId,
      advisory
    });

  } catch (err) {
    console.error("Advisory Route Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to generate advisory",
      error: err.message 
    });
  }
});

export default router;