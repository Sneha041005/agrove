import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// ROUTES (ONLY ROUTES)
import authRoutes from "./routes/auth.js";
import farmRoutes from "./routes/farm.js";
import fieldRoutes from "./routes/field.js";
import cropRoutes from "./routes/crop.js";
import activityRoutes from "./routes/activity.js";
import soilRoutes from "./routes/soil.js";
import adviceRoutes from "./routes/advice.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running");
});

// API ENTRY POINTS
app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/advice", adviceRoutes);

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
