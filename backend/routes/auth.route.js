import express from "express";
import { signup, login, logout, refreshToken, getDashboard, getProfile, getLeaderboard } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh-token", refreshToken)
router.post("/dashboard", getDashboard)
router.get("/Profile", authMiddleware, getProfile)
router.get("/leaderboard", authMiddleware, getLeaderboard);

export default router;