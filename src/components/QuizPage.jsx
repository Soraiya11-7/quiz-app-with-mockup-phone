import { useState, useEffect } from 'react';
import Question from './Question';
import useFetchQuestions from '../hooks/useFetchQuestions';
import LoadingSpinner from './LoadingSpinner';

const QuizPage = ({ onComplete, onReady }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  
  const { questions, loading, error } = useFetchQuestions(); //fetch questions
  

  useEffect(() => {
    if (!loading && questions.length > 0) {
      onReady(); // Notify parent that quiz is ready...
    }
  }, [loading, questions, onReady]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev, [questionId]: answer //setting the new answer for the given questionId...
    }));
  };

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1); 
    } else {
      onComplete(score + (isCorrect ? 1 : 0)); //if correct add 1 mark
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!questions.length) return <div className="text-center">No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium text-indigo-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-medium text-gray-800">
            Score: <span className="text-indigo-600">{score}</span>
          </div>
        </div>

        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default QuizPage;