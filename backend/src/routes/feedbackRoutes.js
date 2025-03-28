import express from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", submitFeedback);
router.get("/:eventId", authMiddleware, getFeedback);

export default router;
