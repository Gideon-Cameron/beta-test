import React from 'react';

const Leaderboard = () => {
  // Placeholder leaderboard data
  const leaderboardData = [
    // Example data (we would normally fetch this from the backend)
    { name: 'Alice', avatar: 'https://via.placeholder.com/50', xp: 5000, level: 15, rank: 1 },
    { name: 'Bob', avatar: 'https://via.placeholder.com/50', xp: 4500, level: 14, rank: 2 },
    { name: 'Charlie', avatar: 'https://via.placeholder.com/50', xp: 4200, level: 13, rank: 3 },
    // More data...
    { name: 'User 4', avatar: 'https://via.placeholder.com/50', xp: 4000, level: 12, rank: 4 },
    // Add up to at least 50 users here...
    { name: 'John Doe', avatar: 'https://via.placeholder.com/50', xp: 2400, level: 7, rank: 51 }, // Current user
  ];

  // Extract the current user (assumed to be the last user in this array as placeholder)
  const currentUser = leaderboardData.find((user) => user.name === 'John Doe');
  
  // Get the top 50 users (or fewer if there are fewer than 50 users)
  const topUsers = leaderboardData.slice(0, 50);

  // Check if the current user is not in the top 50
  const isCurrentUserInTop50 = topUsers.some((user) => user.name === currentUser.name);

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-60">
      {/* Leaderboard Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-lg">Top learners with the highest XP</p>
      </div>

      {/* Top Users */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Top Learners</h2>
        <div className="grid grid-cols-1 gap-4">
          {topUsers.map((user, index) => (
            <LeaderboardUser key={index} user={user} />
          ))}
        </div>
      </div>

      {/* Show current user if they are not in the top 50 */}
      {!isCurrentUserInTop50 && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Rank</h2>
          <LeaderboardUser user={currentUser} isCurrentUser={true} />
        </div>
      )}
    </div>
  );
};

// LeaderboardUser component to display each user
const LeaderboardUser = ({ user, isCurrentUser }) => {
  return (
    <div
      className={`flex items-center p-4 bg-${
        isCurrentUser ? 'yellow-100' : 'gray-100'
      } rounded-lg`}
    >
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold">
          {isCurrentUser ? 'You' : user.name}
        </h3>
        <p>Level: {user.level}</p>
        <p>XP: {user.xp}</p>
      </div>
      <div className="text-xl font-bold">{`#${user.rank}`}</div>
    </div>
  );
};

export default Leaderboard;
