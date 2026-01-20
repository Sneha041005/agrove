import express from "express";
import Activity from "../models/activity.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch {
    res.status(500).json({ message: "Failed to add activity" });
  }
});


router.get("/recent", async (req, res) => {
  const activities = await Activity.find().sort({ date: -1 }).limit(5);
  res.json(activities);
});

export default router;
