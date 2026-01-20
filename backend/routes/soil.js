import express from "express";
import Soil from "../models/soil.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const soil = await Soil.create(req.body);
    res.status(201).json(soil);
  } catch {
    res.status(500).json({ message: "Failed to add soil data" });
  }
});


router.get("/", async (req, res) => {
  const soil = await Soil.find();
  res.json(soil);
});

export default router;
