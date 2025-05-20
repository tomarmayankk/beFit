import express from "express";
import { updateDailyIntake } from "../controllers/dashboard.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';// JWT auth middleware

const router = express.Router();

router.post("/daily-intake", protectRoute, updateDailyIntake);

export default router;
