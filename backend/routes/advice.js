import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// This line pulls the key from your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const router = express.Router();

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ answer: "Please ask a question!" });
    }

    // Creating a prompt that keeps the AI focused on Agriculture
    const prompt = `You are the Agrove AI Assistant. 
    A farmer is asking: "${question}". 
    Provide a helpful, accurate, and concise agricultural answer.`;

    // ... (keep the rest of the file the same) ...

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ 
      success: true,
      advice: answer  // 👈 Change 'answer' to 'advice' to match your frontend logic
    });

  } catch (error) {
    console.error("AI Advice Error:", error);
    res.status(500).json({ advice: "The AI assistant is busy. Try again later." }); // 👈 Also here
  }
});

export default router;