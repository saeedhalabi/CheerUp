import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import motivateRoutes from "./routes/motivate.routes.js";
import { pipeline } from "@xenova/transformers";

dotenv.config();
const app = express();

// JSON parser + CORS
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));

// Global model state
let generator = null;
let modelLoaded = false;
let modelError = null;

// Load AI model at server start
const loadModel = async () => {
  try {
    console.log("Starting AI model load...");
    const gen = await pipeline(
      "text2text-generation",
      "Xenova/LaMini-Flan-T5-783M"
    );
    // Update app.locals AFTER the model is ready
    app.locals.generator = gen;
    app.locals.modelLoaded = true;
    app.locals.modelError = null;
    console.log("✅ AI model loaded successfully!");
  } catch (err) {
    app.locals.modelError = err;
    app.locals.modelLoaded = false;
    console.error("❌ Error loading AI model:", err);
  }
};
loadModel();

// Make generator accessible to controllers
app.locals.generator = generator;
app.locals.modelLoaded = modelLoaded;
app.locals.modelError = modelError;

// Routes
app.use("/motivate", motivateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
