import express from "express";
import Activity from "../models/activity.js";

const router = express.Router(); // ✅ THIS WAS MISSING

// ADD ACTIVITY
router.post("/", async (req, res) => {
  try {
    const { field, type, details } = req.body;

    if (!field || !type) {
      return res.status(400).json({
        message: "Field and type are required"
      });
    }

    const activity = await Activity.create({
      field,
      type,
      details
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add activity"
    });
  }
});

// GET RECENT ACTIVITIES
router.get("/recent", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ date: -1 })
      .limit(5);

    res.json(activities);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch activities"
    });
  }
});

export default router;
