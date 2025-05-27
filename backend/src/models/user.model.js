import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },

  height: {
    type: Number, // in centimeters
    required: true
  },

  bodyweight: {
    type: Number, // in kilograms
    required: true
  },

  bmi: {
    type: Number
  },

  dailyIntake: {
    date: {
      type: String // use new Date().toDateString() to compare
    },
    calories: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    }
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
