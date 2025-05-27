import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    bodyweight: '',
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (
      !formData.email.trim() ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!formData.age || isNaN(formData.age)) {
      toast.error("Please enter a valid age");
      return false;
    }
    if (!formData.height || isNaN(formData.height)) {
      toast.error("Please enter a valid height");
      return false;
    }
    if (!formData.bodyweight || isNaN(formData.bodyweight)) {
      toast.error("Please enter a valid weight");
      return false;
    }
    if (!formData.gender) {
      toast.error("Please select your gender");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await signup(formData);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#d8d0e3] relative">
      {/* Background Text */}
      <div className="absolute text-[20rem] font-extrabold text-[#f8f8f8] z-0">
        Fit-Flow
      </div>

      {/* Sign-Up Form */}
      <div className="flex flex-col items-center justify-center bg-[#240B42] shadow-xl w-96 h-auto rounded-md z-10">
        <h1 className="text-3xl font-bold text-white" style={{ marginTop: "10px", marginBottom: "30px" }}>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center justify-center w-72 text-white"
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              placeholder="******"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Age</label>
            <input
              type="number"
              placeholder="e.g. 25"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Height (cm)</label>
            <input
              type="number"
              placeholder="e.g. 170"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g. 70"
              value={formData.bodyweight}
              onChange={(e) => setFormData({ ...formData, bodyweight: e.target.value })}
              className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
              style={{ padding: "6px" }}
            />
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <label className="text-white font-semibold">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="border-2 rounded-md border-white outline-none text-black"
              style={{ padding: "6px" }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-32 h-12 bg-green-700 rounded-md font-bold text-white hover:bg-green-500"
            style={{ marginTop: "15px", marginBottom: "15px", padding: "5px" }}
          >
            {isSigningUp ? <Loader className="size-10 animate-spin" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-white" style={{ marginBottom: "15px" }}>
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-700 hover:underline">
            Go to SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
