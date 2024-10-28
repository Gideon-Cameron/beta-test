import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaHome, FaBook, FaUserAlt, FaTrophy } from 'react-icons/fa'; // Icons for the sidebar

const Header = () => {
  return (
    <nav className="fixed md:h-screen bottom-0 md:bottom-auto left-0 w-full md:w-60 bg-gray-800 text-white border-t md:border-r md:border-t-0 border-gray-700">
      {/* App Name at the Top for larger screens */}
      <div className="text-center text-2xl font-bold py-4 border-b border-gray-700 hidden md:block">
        FluentWave
      </div>

      {/* Sidebar and Bottom Navigation */}
      <ul className="flex md:block justify-around md:pt-2">
        {/* Home Link */}
        <li className="relative group w-full md:w-auto">
          <Link
            to="/"
            className="flex justify-center md:justify-start items-center p-4 hover:bg-gray-700 transition border-b border-gray-700 w-full md:w-auto"
          >
            <FaHome className="text-xl" />
            {/* Hidden text for mobile, visible for larger screens */}
            <span className="ml-2 hidden md:block">Dashboard</span>
          </Link>
          {/* Tooltip for mobile view only */}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-2 bg-gray-700 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition md:hidden">
            Dashboard
          </span>
        </li>

        {/* Lessons Link */}
        <li className="relative group w-full md:w-auto">
          <Link
            to="/lessons"
            className="flex justify-center md:justify-start items-center p-4 hover:bg-gray-700 transition border-b border-gray-700 w-full md:w-auto"
          >
            <FaBook className="text-xl" />
            <span className="ml-2 hidden md:block">Lessons</span>
          </Link>
          {/* Tooltip for mobile view only */}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-2 bg-gray-700 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition md:hidden">
            Lessons
          </span>
        </li>

        {/* Profile Link */}
        <li className="relative group w-full md:w-auto">
          <Link
            to="/profile"
            className="flex justify-center md:justify-start items-center p-4 hover:bg-gray-700 transition border-b border-gray-700 w-full md:w-auto"
          >
            <FaUserAlt className="text-xl" />
            <span className="ml-2 hidden md:block">Profile</span>
          </Link>
          {/* Tooltip for mobile view only */}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-2 bg-gray-700 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition md:hidden">
            Profile
          </span>
        </li>

        {/* Leaderboard Link */}
        <li className="relative group w-full md:w-auto">
          <Link
            to="/leaderboard"
            className="flex justify-center md:justify-start items-center p-4 hover:bg-gray-700 transition border-b border-gray-700 w-full md:w-auto"
          >
            <FaTrophy className="text-xl" />
            <span className="ml-2 hidden md:block">Leaderboard</span>
          </Link>
          {/* Tooltip for mobile view only */}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-2 bg-gray-700 text-xs rounded-md text-white opacity-0 group-hover:opacity-100 transition md:hidden">
            Leaderboard
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
