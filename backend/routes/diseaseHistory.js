import express from "express";
import DiseaseHistory from "../models/diseaseHistory.js";

const router = express.Router();

router.get("/:fieldId", async (req, res) => {
  try {
    const history = await DiseaseHistory.find({
      field: req.params.fieldId
    }).sort({ detectedAt: -1 });

    res.json({
      success: true,
      history
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch disease history"
    });
  }
});

export default router;
