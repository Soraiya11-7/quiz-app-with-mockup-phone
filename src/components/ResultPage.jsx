import React from 'react';
import { FiEye, FiRotateCcw } from 'react-icons/fi';

const ResultPage = ({ score, totalQuestions, onTryAgain, onShowLeaderboard }) => {
    const correct = score;
    const wrong = totalQuestions - score;
    const percentage = ((score / totalQuestions) * 100).toFixed(1);  //result in %

    return (
        <div className=" w-full h-full flex flex-col justify-center items-center py-6 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Quiz Completed!</h2>

            {/* Score Circle............................... */}
            <div className="w-32 h-32 mx-auto text-6xl rounded-full border-8 border-indigo-600 flex items-center justify-center font-bold text-indigo-700 mb-6">
                {score}
            </div>

            {/* Stats Row................... */}
            <div className="flex flex-col text-sm font-medium mb-4 text-gray-700">
                <div>Total Question: <span className="text-indigo-600">{totalQuestions}</span></div>
                <div>Correct: <span className="text-green-600">{correct}</span></div>
                <div>Wrong: <span className="text-red-600">{wrong}</span></div>
                <div>Score: <span className="text-indigo-600">{percentage}%</span></div>
            </div>

            {/* Progress Bar....................... */}
            <div className="w-[95%] mx-auto bg-gray-200 rounded-full h-3 mb-6">
                <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Buttons (Try again & Leaderboard).................. */}
            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={onTryAgain}
                    className="flex items-center gap-1 px-2 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    <FiRotateCcw className="text-lg" />
                    Try Again
                </button>

                <button
                    onClick={onShowLeaderboard}
                    className="flex items-center gap-1 px-2 py-1.5 bg-gray-200 text-indigo-700 border border-indigo-600 rounded hover:bg-indigo-300 transition"
                >
                    <FiEye className="text-lg" />
                    Leaderboard
                </button>
            </div>

        </div>
    );
};

export default ResultPage;


