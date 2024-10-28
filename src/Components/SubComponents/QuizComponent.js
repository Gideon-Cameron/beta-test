import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const QuizComponent = ({ lessonXp = 50, nextLessonLink = '/next-lesson' }) => {
  // Get sectionId and lessonId from URL parameters
  const { sectionId, lessonId } = useParams(); 

  // Convert params to numbers for use as array indices
  const sectionIndex = parseInt(sectionId);
  const lessonIndex = parseInt(lessonId);

  // Expanded quiz data to include matching and fill-in-the-blank questions
  const quizData = [
    [
      {
        questionType: 'multipleChoice',
        question: 'How do you say "Hello" in Amharic?',
        options: ['Selam', 'Konjo', 'Amaseganalo', 'Melkam'],
        correctAnswer: 'Selam',
      },
      {
        questionType: 'fillInBlank',
        question: 'Fill in the blank: Amharic word for "Thank you" is _____',
        correctAnswer: 'Amaseganalo',
      },
    ],
    [
      {
        questionType: 'multipleChoice',
        question: 'What does "Konjo" mean?',
        options: ['Beautiful', 'Goodbye', 'Thank you', 'Friend'],
        correctAnswer: 'Beautiful',
      },
      {
        questionType: 'matching',
        question: 'Match the Amharic words to their English equivalents',
        pairs: [
          { amharic: 'Selam', english: 'Hello' },
          { amharic: 'Konjo', english: 'Beautiful' },
          { amharic: 'Amaseganalo', english: 'Thank you' },
          { amharic: 'Melkam', english: 'Good' },
        ],
      },
    ],
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [userAnswers, setUserAnswers] = useState([]); // Store user's answers
  const [score, setScore] = useState(0); // Track user's score
  const [quizFinished, setQuizFinished] = useState(false); // Track quiz completion
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Track selected answer
  const [matchingAnswers, setMatchingAnswers] = useState({}); // Track matching answers

  // Check for valid indices and avoid out-of-bounds access
  if (
    isNaN(sectionIndex) || isNaN(lessonIndex) ||
    !quizData[sectionIndex] || !quizData[sectionIndex][lessonIndex]
  ) {
    return <div className="p-6">Invalid section or lesson. Please select a valid lesson.</div>;
  }

  const lessonQuiz = quizData[sectionIndex][lessonIndex];
  const currentQuestion = lessonQuiz[currentQuestionIndex];

  // Check if currentQuestion exists
  if (!currentQuestion) {
    return <div className="p-6">No more questions available in this lesson.</div>;
  }

  // XP calculation based on correct answers (10 XP per correct answer)
  const xpPerCorrectAnswer = 10;
  const totalXp = score * xpPerCorrectAnswer;

  // Handle selecting an answer for multiple choice and fill-in-the-blank questions
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle matching answers
  const handleMatchingSelect = (amharicWord, englishWord) => {
    setMatchingAnswers({ ...matchingAnswers, [amharicWord]: englishWord });
  };

  // Check if matching is correct
  const checkMatchingAnswers = (pairs) => {
    let correct = 0;
    pairs.forEach((pair) => {
      if (matchingAnswers[pair.amharic] === pair.english) {
        correct++;
      }
    });
    return correct === pairs.length;
  };

  // Handle submitting the answer
  const handleSubmitAnswer = () => {
    let isCorrect = false;

    if (currentQuestion.questionType === 'multipleChoice' || currentQuestion.questionType === 'fillInBlank') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.questionType === 'matching') {
      isCorrect = checkMatchingAnswers(currentQuestion.pairs);
    }

    if (isCorrect) {
      setScore(score + 1); // Increase score for correct answer
    }

    setUserAnswers([...userAnswers, selectedAnswer || matchingAnswers]);

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < lessonQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); // Reset selected answer for the next question
      setMatchingAnswers({}); // Reset matching answers for the next question
    } else {
      setQuizFinished(true); // Mark the quiz as finished
    }
  };

  // Handle restarting the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer('');
    setMatchingAnswers({});
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:ml-60">
      <h1 className="text-3xl font-bold mb-6">Quiz for Section {sectionId}, Lesson {lessonId}</h1>

      {quizFinished ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Quiz Completed!</h2>
          <p className="text-lg mt-4">Your Score: {(score / lessonQuiz.length) * 100}%</p>
          <p className="text-lg mt-4">XP Gained: {totalXp} XP</p>
          <Link
            to={nextLessonLink}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md mt-6 hover:bg-blue-500 transition"
          >
            Go to Next Lesson
          </Link>
          <button
            onClick={handleRestartQuiz}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md mt-6 hover:bg-green-500 transition ml-4"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

            {currentQuestion.questionType === 'multipleChoice' && (
              <div className="mt-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left p-4 rounded-lg mb-2 ${
                      selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => handleSelectAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.questionType === 'fillInBlank' && (
              <div className="mt-4">
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => handleSelectAnswer(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  placeholder="Type your answer..."
                />
              </div>
            )}

            {currentQuestion.questionType === 'matching' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  {currentQuestion.pairs.map((pair, index) => (
                    <div key={index} className="p-4 bg-gray-200 rounded-lg">
                      {pair.amharic}
                    </div>
                  ))}
                </div>
                <div>
                  {currentQuestion.pairs.map((pair, index) => (
                    <select
                      key={index}
                      className="block w-full p-4 mb-2 bg-white border border-gray-300 rounded-lg"
                      onChange={(e) => handleMatchingSelect(pair.amharic, e.target.value)}
                    >
                      <option value="">Select English Equivalent</option>
                      <option value="Hello">Hello</option>
                      <option value="Beautiful">Beautiful</option>
                      <option value="Thank you">Thank you</option>
                      <option value="Good">Good</option>
                    </select>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer && Object.keys(matchingAnswers).length < currentQuestion.pairs?.length}
              className={`bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-500 transition ${
                (!selectedAnswer && Object.keys(matchingAnswers).length < currentQuestion.pairs?.length)
                  ? 'cursor-not-allowed'
                  : ''
              }`}
            >
              Submit Answer
            </button>
          </div>

          <p className="text-lg">Question {currentQuestionIndex + 1} of {lessonQuiz.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
