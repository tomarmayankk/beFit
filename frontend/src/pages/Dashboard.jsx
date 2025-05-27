import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';
import { useNutritionStore } from '../store/useNutritionStore';

const Dashboard = () => {
  const { authUser } = useAuthStore();
  const { dailyIntake, updateIntake, isLoading } = useNutritionStore();

  const [form, setForm] = useState({
    calories: '',
    protein: '',
    carbs: ''
  });

  // Calculate daily goals based on bodyweight (kg)
  const bodyweight = authUser?.bodyweight || 0;

  const goals = {
    calories: Math.round(bodyweight * 30),  // kcal
    protein: Math.round(bodyweight * 2),    // grams
    carbs: Math.round(bodyweight * 4)       // grams
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateIntake(form);
    setForm({ calories: '', protein: '', carbs: '' });
  };

  return (
    <div className="w-full mx-auto font-sans text-[#240B42]" style={{ marginTop: '5rem' }}>
      <Navbar />
      <section>
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 className="text-3xl font-bold">Hey {authUser?.name}!</h1>
          <p className="text-gray-600">Today's data</p>
        </header>

        {/* Intake and Goal Display */}
        <div
          className="flex justify-between bg-[#f0e8fc] rounded-lg shadow-sm"
          style={{ padding: '1.5rem', marginBottom: '2.5rem' }}
        >
          {['calories', 'protein', 'carbs'].map((key, idx) => (
            <div
              key={key}
              className={`flex-1 text-center ${idx < 2 ? 'border-r border-gray-300' : ''}`}
              style={{ padding: '0 1rem' }}
            >
              <h2 className="text-lg font-semibold" style={{ marginBottom: '0.5rem' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <p className="text-2xl font-bold text-green-600">
                {isLoading ? '...' : dailyIntake?.[key] ?? 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Goal: {goals[key]}
              </p>
            </div>
          ))}
        </div>

        {/* Form to input intake */}
        <div className="bg-[#f9f7fd] rounded-lg shadow-md" style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            {['calories', 'protein', 'carbs'].map((key) => (
              <div key={key} className="flex flex-col" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor={key} className="font-semibold" style={{ marginBottom: '0.5rem' }}>
                  Enter {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  type="number"
                  value={form[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md text-lg"
                  style={{ padding: '0.5rem' }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#240B42] text-white font-bold hover:bg-[#3a1a7d] transition"
              style={{ padding: '0.75rem 0', borderRadius: '0.375rem' }}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
