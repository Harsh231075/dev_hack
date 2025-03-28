import express from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", submitFeedback);
router.get("/:eventId", getFeedback);

export default router;
