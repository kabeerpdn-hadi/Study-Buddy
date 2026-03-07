import express from "express"
import {
  getCourses,
  getCourseById,
  createCourse,
} from "../controllers/course.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCourses)
router.get("/:id", authMiddleware, getCourseById);
router.post("/", authMiddleware, createCourse);

export default router;