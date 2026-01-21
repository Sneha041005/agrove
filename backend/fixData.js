import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from './models/crop.js';
import Soil from './models/soil.js';

dotenv.config();

const FIELD_ID = "69708e1fce83233f67f0792c";

async function fix() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    // 1. Create/Update Crop
    await Crop.findOneAndUpdate(
      { field: FIELD_ID },
      { 
        field: FIELD_ID,
        name: "rice",
        variety: "Basmati",
        sowingDate: new Date("2024-12-01") 
      },
      { upsert: true, new: true }
    );
    console.log("✅ Crop linked to Field successfully.");

    // 2. Create/Update Soil
    await Soil.findOneAndUpdate(
      { field: FIELD_ID },
      { 
        field: FIELD_ID,
        soilType: "clay",
        phLevel: 6.5 
      },
      { upsert: true, new: true }
    );
    console.log("✅ Soil linked to Field successfully.");

    console.log("All data fixed! You can close this terminal and check the browser.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();