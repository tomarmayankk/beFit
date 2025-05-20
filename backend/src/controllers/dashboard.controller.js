import User from "../models/user.model.js";

export const updateDailyIntake = async (req, res) => {
  try {
    const userId = req.user._id;
    const { calories, protein, carbs } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date().toDateString();

    if (!user.dailyIntake || user.dailyIntake.date !== today) {
      user.dailyIntake = {
        date: today,
        calories: 0,
        protein: 0,
        carbs: 0
      };
    }

    user.dailyIntake.calories += calories || 0;
    user.dailyIntake.protein += protein || 0;
    user.dailyIntake.carbs += carbs || 0;

    await user.save();

    res.status(200).json({ dailyIntake: user.dailyIntake });

  } catch (error) {
    console.error("Error updating daily intake:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
