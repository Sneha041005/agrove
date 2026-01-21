import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import authRoutes from "./routes/auth.js";
import farmRoutes from "./routes/farm.js";
import fieldRoutes from "./routes/field.js";
import cropRoutes from "./routes/crop.js";
import activityRoutes from "./routes/activity.js";
import soilRoutes from "./routes/soil.js";
import adviceRoutes from "./routes/advice.js"; // 👈 Added this missing import
import advisoryRoutes from "./routes/advisory.js"; // 👈 Only one of these now!
import marketAdvisoryRoutes from "./routes/marketAdvisory.js";
import diseaseRoutes from "./routes/disease.js";
import diseaseHistoryRoutes from "./routes/diseaseHistory.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Agrove API is running...");
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/advice", adviceRoutes); // Now this has an import above!
app.use("/api/advisory", advisoryRoutes);
app.use("/api/market-advisory", marketAdvisoryRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/disease-history", diseaseHistoryRoutes);
app.use("/api/upload", uploadRoutes);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🌱 MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1);
  }
});