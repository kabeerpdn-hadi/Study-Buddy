import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  getMyCourses,
  getlessonWithQuestions,
  completeLesson,
} from "../controllers/course.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getCourses);
router.patch(
  "/:courseId/lesson/:lessonId/complete",
  authMiddleware,
  completeLesson,
);
router.get("/my-courses", authMiddleware, getMyCourses);
router.get(
  "/:courseId/lesson/:lessonId",
  authMiddleware,
  getlessonWithQuestions,
);
router.get("/:id", authMiddleware, getCourseById);
router.post("/", authMiddleware, createCourse);

export default router;
