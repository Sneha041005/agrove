import express from "express";
import Field from "../models/field.js";
import Advisory from "../models/advisory.js";
import Activity from "../models/activity.js";

const router = express.Router();

// Function to calculate growth stage based on sowing date
function calculateStage(sowingDate) {
  const today = new Date();
  const sowDate = new Date(sowingDate);

  const diffTime = today - sowDate;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (days <= 15) return "Sowing";
  if (days <= 45) return "Vegetative";
  if (days <= 75) return "Flowering";
  return "Maturity";
}

// GET suggestions for a field
router.get("/:fieldId/suggestions", async (req, res) => {
  try {
    const field = await Field.findById(req.params.fieldId)
      .populate("crop")
      .populate("soil");

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    if (!field.sowingDate) {
      return res.status(400).json({ message: "Sowing date not found" });
    }

    const stage = calculateStage(field.sowingDate);

    const advisories = await Advisory.find({
      crop: field.crop.name,
      soilType: field.soil.type,
      stage: stage,
    });

    res.json({
      stage,
      suggestions: advisories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch suggestions" });
  }
});

// CREATE a new field
router.post("/", async (req, res) => {
  try {
    const field = await Field.create(req.body);
    res.status(201).json(field);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create field" });
  }
});

// GET all fields
router.get("/", async (req, res) => {
  try {
    const fields = await Field.find().populate("crop").populate("soil");
    res.json(fields);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch fields" });
  }
});

export default router;
