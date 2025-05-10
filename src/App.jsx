import { useState } from 'react';
import QuizPage from './components/QuizPage';
import WelcomePage from './components/WelcomePage';
import Leaderboard from './components/Leaderboard';
import ResultPage from './components/ResultPage';

function App() {
  const [userName, setUserName] = useState('');
  const [quizState, setQuizState] = useState('welcome'); // 'welcome', 'quiz', 'completed', 'leaderboard'
    const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  console.log(score);
  console.log(totalQuestions);

 console.log(userName);

  const startQuiz = (name) => {
    setUserName(name);
    setQuizState('quiz');
  };

    const quizReady = () => {
    setQuizState('quiz');
  };

  const completeQuiz = (finalScore, totalQues) => {
    setScore(finalScore);
    setTotalQuestions(totalQues);
   
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white   p-2 overflow-y-auto">
        

          {quizState === 'welcome' && <WelcomePage onStart={startQuiz} />}
         {quizState === 'quiz' && (
            <QuizPage
              userName={userName}
              onComplete={(finalScore) => completeQuiz(finalScore, 10)}
              onReady={quizReady}
            />
          )}

          {quizState === 'completed' && (
            <ResultPage />
          )}
          
          {quizState === 'leaderboard' && (
            <Leaderboard />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
