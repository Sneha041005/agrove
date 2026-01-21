import express from "express";
const router = express.Router();


router.post("/", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ answer: "Please ask something!" });

 
  let answer;
  if (question.toLowerCase().includes("sow")) {
    answer = "The best time to sow is early morning or late evening.";
  } else if (question.toLowerCase().includes("fertilize")) {
    answer = "Fertilize once every 3 weeks with organic compost.";
  } else {
    answer = "Always monitor soil and crop health before taking action.";
  }

  res.json({ answer });
});

export default router;
