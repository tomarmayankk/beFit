import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useExerciseStore } from '../store/useExerciseStore';

const RecommendedExercise = () => {
  const { exercises, day, isLoading, fetchRecommendations } = useExerciseStore();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f0fa] font-sans text-[#240B42] pt-20" style={{paddingTop: 60}}>
      <Navbar />
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl w-[600px] h-[450px] flex flex-col items-center justify-center" style={{padding: 16, marginTop: 16}}>
        <h1 className="text-4xl font-bold text-center mb-2" style={{marginBottom: 4}}>Recommended Exercises</h1>
        {day && (
          <h2 className="text-xl text-center text-[#7A2DFF] font-medium mb-6" style={{marginBottom: 10}}>
            For {day}
          </h2>
        )}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading recommendations...</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {exercises.map((ex, index) => (
              <li
                key={index}
                style={{padding: 8}}
                className="bg-[#f9f7fd] p-4 rounded-lg border border-[#e3dcf7] shadow-sm hover:shadow-md transition duration-200"
              >
                <p className="text-lg font-semibold text-center">{ex}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RecommendedExercise;
