import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Advisory from "../models/advisory.js"; // Ensure path is correct

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using Flash for speed

const crops = ["rice", "wheat", "corn", "tomato", "potato"];
const soils = ["clay", "sandy", "loamy", "silty"];
const stages = ["sowing", "vegetative", "flowering", "maturity"];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB at:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    
    // Optional: Clear existing advisories to avoid duplicates during testing
    // await Advisory.deleteMany({}); 
    
    console.log("Generating expert advice... Please wait.");

    for (const crop of crops) {
      for (const soil of soils) {
        for (const stage of stages) {
          const prompt = `Act as a professional agricultural scientist. 
          Provide one concise, practical advice (max 20 words) for a farmer growing ${crop} 
          in ${soil} soil during the ${stage} stage. 
          Focus on irrigation, nutrients, or pest control. 
          Return ONLY the advice text.`;

          try {
            const result = await model.generateContent(prompt);
            const adviceText = result.response.text().trim();

            await Advisory.create({
              crop: crop.toLowerCase(),
              soilType: soil.toLowerCase(),
              stage: stage.toLowerCase(),
              suggestion: adviceText
            });

            console.log(`✅ Added: ${crop} | ${soil} | ${stage}`);
          } catch (apiErr) {
            console.error(`Skipping ${crop} due to API limit/error...`);
          }
        }
      }
    }

    console.log("Successfully seeded the Advisory Knowledge Base!");
    process.exit(0);
  } catch (error) {
    console.error("Critical Seeding Error:", error);
    process.exit(1);
  }
}

seedDatabase();