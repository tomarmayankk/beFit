import { weeklyExercisePlan } from './weeklyExercises.js';

export const getRecommendedExercises = async (req, res) => {
  try {
    const { gender, bodyweight } = req.user;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    let category;
    if (gender === 'male') {
      if (bodyweight < 60) category = 'low';
      else if (bodyweight < 80) category = 'medium';
      else category = 'high';
    } else {
      if (bodyweight < 50) category = 'low';
      else if (bodyweight < 70) category = 'medium';
      else category = 'high';
    }

    const recommendations = weeklyExercisePlan[gender]?.[category]?.[today];

    if (!recommendations) {
      return res.status(404).json({ message: 'No exercises found for today' });
    }

    return res.status(200).json({ day: today, recommendations });

  } catch (error) {
    console.error("Exercise suggestion error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
