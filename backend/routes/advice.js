import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log("-----------------------------------------");
console.log("Gemini Key Check:", process.env.GEMINI_API_KEY ? "FOUND ✅" : "MISSING ❌");
console.log("-----------------------------------------");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FIX: Using gemini-1.5-flash but specifying the model configuration clearly
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" 
});

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ answer: "Please ask a question!" });
    }

    const prompt = `You are the Agrove AI Assistant. 
    A farmer is asking: "${question}". 
    Provide a helpful, accurate, and concise agricultural answer.`;

    // Increased timeout handling
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ 
      success: true,
      answer: answer, 
      advice: answer  
    });

  } catch (error) {
    // This will help us see the EXACT error in the terminal if it fails again
    console.error("AI Error Details:", error.message);
    
    // Fallback logic: if flash fails, try gemini-pro
    try {
        console.log("Attempting fallback to gemini-pro...");
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await fallbackModel.generateContent(req.body.question);
        return res.json({ success: true, answer: result.response.text() });
    } catch (fallbackError) {
        res.status(500).json({ 
            answer: "The AI assistant is having technical difficulties. Please try again in 1 minute.",
            advice: "The AI assistant is having technical difficulties. Please try again in 1 minute." 
        });
    }
  }
});

export default router;