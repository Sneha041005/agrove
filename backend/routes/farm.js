import express from "express";
import { upload } from "../utils/upload.js";
import { detectDisease } from "../services/diseaseEngine.js";
import DiseaseHistory from "../models/diseaseHistory.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const { cropName, symptoms, fieldId } = req.body;

      const result = detectDisease({
        cropName,
        symptoms: symptoms ? JSON.parse(symptoms) : []
      });

      const record = await DiseaseHistory.create({
        field: fieldId,
        cropName,
        disease: result.disease,
        confidence: result.confidence,
        advice: result.advice,
        image: req.file?.filename
      });

      res.json({
        success: true,
        result,
        saved: true,
        recordId: record._id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Failed to save disease history"
      });
    }
  }
);

export default router;
