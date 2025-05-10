import { useState } from 'react';

const WelcomePage = ({ onStart }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }
        onStart(name.trim());
    };

    return (
        <div className="h-full w-full px-1 py-1 flex flex-col justify-center">
            <div className="text-center space-y-3">
                <h1 className="text-2xl font-semibold text-indigo-800">Welcome to the Test!</h1>
                <p className="text-sm text-gray-800">
                    Sharpen your skills with a series of exciting questions.
                </p>
            </div>

            <div className="mt-8 text-center">
                <span className="inline-block bg-indigo-200 text-indigo-800 text-[11px] px-3 py-[2px] rounded-full font-medium">
                    Total Questions: 10
                </span>
                <p className="mt-1 text-xs text-gray-700">
                    Each question has a 15-second timer.
                </p>
            </div>
            {/* name field................. */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <p className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                    </p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your name"
                    />
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-md transition duration-150"
                >
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

export default WelcomePage;
