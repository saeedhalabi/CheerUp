import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import motivateRoutes from "./routes/motivate.routes.js";

dotenv.config();

const app = express();
app.locals.HF_TOKEN = process.env.HF_TOKEN;
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5500", // for local dev
      "https://cheerup-frontend.onrender.com", // deployed frontend
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);

app.use("/motivate", motivateRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
