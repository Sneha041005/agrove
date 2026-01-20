import express from "express";
import Crop from "../models/crop.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch {
    res.status(500).json({ message: "Failed to add crop" });
  }
});


router.get("/", async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
});

export default router;
