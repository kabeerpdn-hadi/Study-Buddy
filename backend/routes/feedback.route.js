import express from "express";
import { submitFeedbackorComplain, getFeedbacks, getMyFeedbacks, deleteFeedback, replyToFeedback } from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitFeedbackorComplain);
router.get("/mine", authMiddleware, getMyFeedbacks);
router.get("/", authMiddleware, adminMiddleware, getFeedbacks);
router.delete("/:id", authMiddleware, adminMiddleware, deleteFeedback);
router.post("/:id/reply", authMiddleware, adminMiddleware, replyToFeedback);

export default router;