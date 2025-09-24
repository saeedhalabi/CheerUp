import express from "express";
import {
  getMotivation,
  getModelStatus,
} from "../controller/motivate.controller.js";
const router = express.Router();

// POST route for generating motivation
router.post("/", getMotivation);

// GET route to check model status
router.get("/status", getModelStatus);

export default router;
