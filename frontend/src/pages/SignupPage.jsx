import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    bodyWeight: "",
    height: "",  // New height field
  })

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter a full name")
      return false
    }
    if (
      !formData.email.trim() ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      toast.error("Please enter a valid email address")
      return false
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return false
    }
    if (!formData.gender) {
      toast.error("Please select a gender")
      return false
    }
    if (!formData.bodyWeight || isNaN(formData.bodyWeight) || Number(formData.bodyWeight) <= 0) {
      toast.error("Please enter a valid body weight")
      return false
    }
    if (!formData.height || isNaN(formData.height) || Number(formData.height) <= 0) {
      toast.error("Please enter a valid height")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      await signup(formData)
    }
  }

  return (
    <div>
      <div
        className="flex items-center justify-center w-full h-screen bg-[#d8d0e3] relative"
      >
        <div
          className="absolute font-extrabold text-[#f8f8f8] z-0"
          style={{ fontSize: "20rem", lineHeight: 1 }}
        >
          RSOCIAL
        </div>

        <div
          className="flex flex-col items-center justify-center bg-[#240B42] shadow-2xl w-96 rounded-md z-10"
          style={{ height: "650px" }}
        >
          <h1
            className="text-3xl font-bold text-white"
            style={{ marginTop: "10px", marginBottom: "50px" }}
          >
            SignUp
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center justify-center w-72 text-white"
          >
            {/* Full Name */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                FullName
              </label>
              <input
                type="text"
                placeholder="john doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
                style={{ padding: "6px" }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
                style={{ padding: "6px" }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
                style={{ padding: "6px" }}
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="border-2 rounded-md border-white bg-[#240B42] outline-none text-white"
                style={{ padding: "6px" }}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Body Weight */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                Body Weight (kg)
              </label>
              <input
                type="number"
                placeholder="e.g. 70"
                value={formData.bodyWeight}
                onChange={(e) =>
                  setFormData({ ...formData, bodyWeight: e.target.value })
                }
                className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
                style={{ padding: "6px" }}
                min="0"
              />
            </div>

            {/* Height */}
            <div className="flex flex-col w-full" style={{ marginBottom: "8px" }}>
              <label
                className="text-white font-semibold"
                style={{ marginBottom: "4px" }}
              >
                Height (cm)
              </label>
              <input
                type="number"
                placeholder="e.g. 175"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                className="border-2 rounded-md border-white outline-none placeholder:text-gray-500"
                style={{ padding: "6px" }}
                min="0"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-32 h-12 bg-green-700 rounded-md font-bold text-white hover:bg-green-500"
              style={{ marginTop: "15px", marginBottom: "15px" }}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader className="size-10 animate-spin" />
              ) : (
                "Sign-up"
              )}
            </button>
          </form>

          <p className="text-white">
            Already have an account?{" "}
            <Link to="/signIn" className="text-blue-700 hover:underline">
              Go to SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
