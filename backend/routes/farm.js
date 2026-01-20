import express from "express";
import Farm from "../models/farm.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const farm = await Farm.create(req.body);
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ message: "Failed to create farm" });
  }
});


router.get("/", async (req, res) => {
  const farms = await Farm.find();
  res.json(farms);
});

export default router;
