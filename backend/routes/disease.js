import express from "express";
import { detectDisease } from "../services/diseaseEngine.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { cropName, symptoms } = req.body;

  const result = detectDisease({ cropName, symptoms });

  res.json({
    success: true,
    result
  });
});

export default router;
