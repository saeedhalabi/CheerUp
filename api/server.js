import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import motivateRoutes from "./routes/motivate.routes.js";
import { pipeline } from "@xenova/transformers";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));

// Load AI model at startup
const loadModel = async () => {
  try {
    console.log("🚀 Loading AI model...");
    const generator = await pipeline(
      "text2text-generation",
      "Xenova/LaMini-Flan-T5-783M"
    );

    // Store model and status in app.locals
    app.locals.generator = generator;
    app.locals.modelLoaded = true;
    app.locals.modelError = null;

    console.log("✅ AI model loaded successfully!");
  } catch (err) {
    app.locals.generator = null;
    app.locals.modelLoaded = false;
    app.locals.modelError = err;

    console.error("❌ Failed to load AI model:", err);
  }
};

// Initialize model loader
loadModel();

// Routes
app.use("/motivate", motivateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
