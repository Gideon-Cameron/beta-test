import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

const SectionsWithLessons = () => {
  // Placeholder data for sections and lessons
  const sections = [
    {
      title: 'Section 1: Greetings',
      lessons: [
        { title: 'Lesson 1: Basic Greetings', difficulty: 'Easy', xp: 50, completed: true, score: 100, practiceXp: 25 },
        { title: 'Lesson 2: Formal Greetings', difficulty: 'Medium', xp: 75, completed: false, score: 0, practiceXp: 38 },
      ],
    },
    {
      title: 'Section 2: Shopping',
      lessons: [
        { title: 'Lesson 1: Shopping Vocabulary', difficulty: 'Medium', xp: 75, completed: true, score: 90, practiceXp: 38 },
        { title: 'Lesson 2: Asking for Prices', difficulty: 'Hard', xp: 100, completed: false, score: 0, practiceXp: 50 },
      ],
    },
    {
      title: 'Section 3: Dining',
      lessons: [
        { title: 'Lesson 1: Restaurant Basics', difficulty: 'Medium', xp: 75, completed: true, score: 100, practiceXp: 38 },
        { title: 'Lesson 2: Ordering Food', difficulty: 'Hard', xp: 100, completed: true, score: 100, practiceXp: 50 },
      ],
    },
    // Add more sections here...
  ];

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0); // Default to the first section
  const selectedSection = sections[selectedSectionIndex]; // Get the selected section

  // Function to handle moving to the previous section
  const previousSection = () => {
    if (selectedSectionIndex > 0) {
      setSelectedSectionIndex(selectedSectionIndex - 1);
    }
  };

  // Function to handle moving to the next section
  const nextSection = () => {
    if (selectedSectionIndex < sections.length - 1) {
      setSelectedSectionIndex(selectedSectionIndex + 1);
    }
  };

  // Check if all lessons in a section have a perfect score
  const isSectionPerfect = selectedSection.lessons.every((lesson) => lesson.score === 100);

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-60">
      <h1 className="text-3xl font-bold mb-6">Available Sections</h1>

      {/* Section Navigation Arrows */}
      <div className="flex items-center mb-6">
        {/* Left Arrow */}
        <button
          onClick={previousSection}
          className={`p-2 ${selectedSectionIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-500'}`}
          disabled={selectedSectionIndex === 0}
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Section Selector */}
        <div className="flex-grow text-center">
          <h2 className={`text-2xl font-semibold ${isSectionPerfect ? 'text-yellow-500' : 'text-blue-600'}`}>
            {selectedSection.title}
          </h2>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSection}
          className={`p-2 ${selectedSectionIndex === sections.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-500'}`}
          disabled={selectedSectionIndex === sections.length - 1}
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* Display Lessons in Selected Section */}
      <h2 className="text-2xl font-semibold mb-4">Lessons in {selectedSection.title}</h2>
      <div className="grid gap-4">
        {selectedSection.lessons.map((lesson, index) => (
          <div
            key={index}
            className={`p-4 bg-white shadow-md rounded-lg ${
              lesson.score === 100 ? 'bg-yellow-100' : lesson.completed ? 'bg-green-100' : ''
            }`}
          >
            <h3 className="text-xl font-semibold">{lesson.title}</h3>
            <p>Difficulty: {lesson.difficulty}</p>
            <p>XP Reward: {lesson.score === 100 ? lesson.xp + 20 : lesson.xp} XP</p>
            <p>Best Score: {lesson.score}%</p>
            <p>Status: {lesson.completed ? 'Completed' : 'Not Completed'}</p>

            {/* Lesson Button Logic */}
            <div className="mt-2">
              {lesson.completed ? (
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
                  Practice Lesson for {lesson.practiceXp} XP
                </button>
              ) : index === 0 || selectedSection.lessons[index - 1].completed ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
                  Start Lesson
                </button>
              ) : (
                <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                  Complete Previous Lesson First
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsWithLessons;
