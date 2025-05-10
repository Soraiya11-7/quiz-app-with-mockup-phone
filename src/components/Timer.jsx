import { useState, useEffect, useRef } from 'react';

const Timer = ({ duration, onTimeUp, questionId }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const timerRef = useRef(null);
    const prevQuestionIdRef = useRef(questionId);

    useEffect(() => {
       
        if (timerRef.current) {
            clearInterval(timerRef.current);  // Clear any existing timer...
        }

        // Only reset timer if question changed............
        if (questionId !== prevQuestionIdRef.current) {
            setTimeLeft(duration);
            prevQuestionIdRef.current = questionId;
        }

        // Start new timer...................
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setTimeout(() => {
                        onTimeUp(); // safely deferred to next tick
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current); // Clear timer on unmount...
            }
        };
    }, [duration, onTimeUp, questionId]);

    const percentage = (timeLeft / duration) * 100;

    return (
        <div className="">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Time Left:</span>
                <span>{timeLeft}s</span>
            </div>

            {/* time limit progress line........ */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-red-500' : 'bg-indigo-600'
                        }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Timer;