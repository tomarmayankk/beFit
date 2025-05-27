import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// Signup controller function
export const signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    age,
    gender,
    height,
    bodyweight
  } = req.body;

  try {
    // Check required fields
    if (!fullName || !email || !password || !age || !gender || !height || !bodyweight) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Validate height and weight
    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(bodyweight);
    if (isNaN(numericHeight) || isNaN(numericWeight) || numericHeight <= 0) {
      return res.status(400).json({ message: "Invalid height or bodyweight" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Calculate BMI
    const bmi = numericWeight / ((numericHeight / 100) ** 2);

    // Create new user
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      height: numericHeight,
      bodyweight: numericWeight,
      bmi: parseFloat(bmi.toFixed(2))
    });

    await newUser.save();

    // Generate JWT token in cookie
    generateToken(newUser._id, res);

    // Respond
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.name,
      email: newUser.email,
      age: newUser.age,
      gender: newUser.gender,
      height: newUser.height,
      bodyweight: newUser.bodyweight,
      bmi: newUser.bmi
    });

  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Signin controller function
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token in cookie
    generateToken(user._id, res);

    // Respond
    res.status(200).json({
      _id: user._id,
      fullName: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height,
      bodyweight: user.bodyweight,
      bmi: user.bmi
    });

  } catch (error) {
    console.error("Error in signin controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signout =  (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        console.log("error in signout controller", error.message);
        res.status(500).json({message: "internal server error"})
    }
}

export const checkAuth =  (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller: ", error.message)
        res.status(500).json({message: "internal server error"})
    }
}
