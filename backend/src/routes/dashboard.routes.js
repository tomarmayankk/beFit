import express from "express";
import { getTodayIntake, updateDailyIntake } from "../controllers/dashboard.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';// JWT auth middleware

const router = express.Router();

router.post("/daily-intake", protectRoute, updateDailyIntake);
router.get("/get-intake", protectRoute, getTodayIntake);

export default router;
