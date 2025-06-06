import { useEffect, useState } from 'react';
import Timer from './Timer';

const Question = ({ question, selectedAnswer, onAnswerSelect, onNextQuestion, isLastQuestion,  }) => {
  const [timeUp, setTimeUp] = useState(false);

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    onNextQuestion(isCorrect);
  };

  useEffect(() => {
    if (timeUp) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      onNextQuestion(isCorrect);
      setTimeUp(false); // Reset timeUp state after handling..
    }
  }, [timeUp, selectedAnswer, question.correctAnswer, onNextQuestion]);

  return (
    <div>
        {/* Timer....................... */}
        <div className='mb-3 w-full'>
        <Timer 
          duration={15} 
          onTimeUp={() => setTimeUp(true)} 
          questionId={question.id} 
        />
        </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{question.question}</h2>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onAnswerSelect(question.id, option)}
            className={`p-2 text-center border rounded-lg cursor-pointer transition-colors ${
              selectedAnswer === option
                ? 'bg-indigo-100 border-indigo-500'
                : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
     
        
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`px-6 py-2 rounded-lg font-medium ${
            !selectedAnswer
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Question;