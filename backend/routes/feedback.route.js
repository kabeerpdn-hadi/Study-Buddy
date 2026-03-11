import express from "express";
import { submitFeedbackorComplain, getFeedbacks } from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitFeedbackorComplain);
router.get("/", authMiddleware, adminMiddleware, getFeedbacks);

export default router;