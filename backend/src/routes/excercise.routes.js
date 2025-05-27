import express from 'express';
import { getRecommendedExercises } from '../controllers/exercise.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/recommendations', protectRoute, getRecommendedExercises);

export default router;
