import React, { useState } from 'react';

const UserProfile = () => {
  // Placeholder user data for now
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150', // Example avatar
    xp: 2400,
    level: 7,
    streak: 5, // days in a row
    achievements: [
      { title: 'First Lesson Complete', description: 'Completed your first lesson', badge: 'https://via.placeholder.com/50' },
      { title: '100% Streak', description: 'Maintained a 7-day streak', badge: 'https://via.placeholder.com/50' },
    ],
  });

  // Allow the user to upload a new avatar (simulated for now)
  const handleAvatarChange = (e) => {
    const newAvatar = URL.createObjectURL(e.target.files[0]);
    setUser({ ...user, avatar: newAvatar });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-60">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      {/* User Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col items-center">
        {/* Centered Profile Picture */}
        <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />

        {/* Change Avatar Link */}
        <label className="block text-center mb-6">
          <span className="text-blue-600 cursor-pointer hover:underline">Change Avatar</span>
          <input type="file" className="hidden" onChange={handleAvatarChange} />
        </label>

        {/* Placeholder for name and email - later replaced with login info */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-lg">{user.email}</p>
        </div>
      </div>

      {/* XP, Level, and Streak */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
        <p className="text-lg">XP: {user.xp}</p>
        <p className="text-lg">Level: {user.level}</p>
        <p className="text-lg">Streak: {user.streak} day(s)</p>
      </div>

      {/* Achievements */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg">
              <img src={achievement.badge} alt={achievement.title} className="w-12 h-12 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
