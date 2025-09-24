import express from "express";
import {
  getMotivation,
  getModelStatus,
} from "../controller/motivate.controller.js";

const router = express.Router();

/**
 * @route POST /
 * @desc Generate a motivational message based on a note
 */
router.post("/", getMotivation);

/**
 * @route GET /status
 * @desc Get the status of the model (ready/loading/error)
 */
router.get("/status", getModelStatus);

export default router;
