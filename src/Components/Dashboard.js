import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  // Placeholder user data for now
  const user = {
    name: 'John Doe',
    xp: 1500,
    level: 5,
    streak: 7, // days in a row
    totalLessonsCompleted: 12, // Placeholder for total lessons completed
  };

  // Placeholder data for milestones (XP or level-based)
  const milestones = [
    { level: 5, xpRequired: 1500 },
    { level: 6, xpRequired: 2000 },
    { level: 7, xpRequired: 2500 },
  ];

  // Calculate the next milestone for the user (simple version)
  const nextMilestone = milestones.find((milestone) => milestone.level > user.level);

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-60">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

      {/* User Stats */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-lg">XP: {user.xp}</p>
          <p className="text-lg">Level: {user.level}</p>
          <p className="text-lg">Streak: {user.streak} day(s)</p>
          <p className="text-lg">Total Lessons Completed: {user.totalLessonsCompleted}</p>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Next Milestone</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {nextMilestone ? (
            <>
              <p className="text-lg">Level {nextMilestone.level}</p>
              <p className="text-lg">
                XP Required: {nextMilestone.xpRequired - user.xp} more XP
              </p>
            </>
          ) : (
            <p className="text-lg">Congratulations! You've reached the highest level!</p>
          )}
        </div>
      </div>

      {/* Continue Lesson Button */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Continue Your Lesson</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
          Continue Lesson 4
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
