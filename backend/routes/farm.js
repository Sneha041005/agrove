import express from "express";
import Farm from "../models/farm.js";
import upload from "../utils/upload.js"; // multer config

const router = express.Router();

// ------------------ GET ROUTES ------------------

// GET all farms
router.get("/", async (req, res) => {
  try {
    const farms = await Farm.find(); // fetch all farms from DB
    res.json(farms);
  } catch (err) {
    console.error("Error fetching farms:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single farm by ID
router.get("/:id", async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ error: "Farm not found" });
    res.json(farm);
  } catch (err) {
    console.error("Error fetching farm:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ POST ROUTES ------------------

// POST with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const farm = await Farm.create({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST without image
router.post("/no-image", async (req, res) => {
  try {
    const farm = await Farm.create(req.body);
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
