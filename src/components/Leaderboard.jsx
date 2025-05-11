import { useEffect, useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { getLeaderboard, saveScore } from '../utils/savedItems';
import { BiTrophy } from 'react-icons/bi';

const Leaderboard = ({ userName, score, onRestart }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Save score and get unique leaderboard entries
    saveScore(userName, score);
    const allScores = getLeaderboard();

    // Remove duplicate entries (keep highest score for each user)
    const uniqueScores = allScores.reduce((acc, current) => {
      const existingUser = acc.find(item => item.name === current.name);
      if (!existingUser) {
        acc.push(current);
      } else if (current.score > existingUser.score) {
        acc[acc.indexOf(existingUser)] = current;  // Replace with higher score
      }
      return acc;
    }, []);

    // Sort by score (descending)
    const sortedLeaderboard = [...uniqueScores].sort((a, b) => b.score - a.score);
    setLeaderboard(sortedLeaderboard);
  }, [userName, score]);

  return (
    <div className="h-full flex flex-col overflow-hidden py-6">
      {/* Fixed header section........ */}
      <div className="text-center mb-6 flex-shrink-0">
        <p className="text-xl text-gray-700">
          <span className="font-semibold">{userName.split(' ')[0]}</span>, your score is{' '}
          <span className="font-bold text-indigo-600">{score}</span>
        </p>
      </div>

      {/* Leaderboard title - fixed position....... */}
     <h2 className="text-xl font-semibold text-indigo-800 border-b pb-2 flex items-center gap-1">
  <BiTrophy className="text-indigo-700 text-xl" />
  Leaderboard
</h2>

      {/* Scrollable table container.......... */}
      <div className="flex-grow overflow-y-auto mb-4">
        {leaderboard.length > 0 ? (
          <div className="relative">
            <table className="w-full divide-y divide-gray-200">
              {/* Table header - fixed position */}
              <thead className="bg-indigo-200 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-2 py-2 font-bold text-left text-xs  text-black">
                    Rank
                  </th>
                  <th scope="col" className="px-2 py-2 font-bold text-left text-xs  text-black">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-2 font-bold text-left text-xs  text-black">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.name + entry.score}
                    className={`transition-all duration-300 hover:bg-indigo-100 hover:scale-y-[1.01] ${entry.name === userName && entry.score === score ? 'bg-indigo-50 font-semibold text-indigo-800' : ''
                      }`}
                  >

                    <td className="px-2 py-2 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500">
                      {entry.name}
                    </td>
                    <td className="px-2 py-2 text-sm text-gray-500 font-semibold">
                      {entry.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No scores yet</p>
        )}
      </div>

      {/* Fixed footer with Try Again button......... */}
      <div className="flex-shrink-0 pt-2">
        <button
          onClick={onRestart}
          className="w-full mx-auto flex items-center justify-center gap-1 px-2 py-1.5 bg-indigo-700 text-white border border-indigo-600 rounded hover:bg-indigo-600 transition"
        >
          <FiRotateCcw className="text-lg" />
          Play Again!
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;