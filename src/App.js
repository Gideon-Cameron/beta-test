import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Header from './mainComponents/Header.js';
import Dashboard from './Components/Dashboard.js';
import LessonsList from './Components/LessonsList.js';
import UserProfile from './Components/UserProfile.js'
import Leaderboard from './Components/Leaderboard.js'
import QuizComponent from './Components/SubComponents/QuizComponent.js';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Header />
         <Routes> 
          <Route path="/" element={<Dashboard />} /> {/* Use element and JSX */}
          <Route path="/lessons" element={<LessonsList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz/:sectionId/:lessonId" element={<QuizComponent />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
