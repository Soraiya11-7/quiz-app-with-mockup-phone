import { useEffect, useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { getLeaderboard, saveScore } from '../utils/savedItems';

const Leaderboard = ({ userName, score, onRestart }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Save score and get unique leaderboard entries
    saveScore(userName, score);
    const allScores = getLeaderboard();
    
    // Remove duplicate entries (keep highest score for each user)............
    const uniqueScores = allScores.reduce((acc, current) => {
      const existingUser = acc.find(item => item.name === current.name);
      if (!existingUser) {
        acc.push(current);
      } else if (current.score > existingUser.score) {
       
        acc[acc.indexOf(existingUser)] = current;  // Replace with higher score
      }
      return acc;
    }, []);

    // Sort by score (descending)............
    const sortedLeaderboard = [...uniqueScores].sort((a, b) => b.score - a.score);
    setLeaderboard(sortedLeaderboard);
  }, [userName, score]);

  return (
    <div className="h-full  overflow-hidden py-4 flex flex-col justify-center">
      <div className="text-center mb-8">
        <p className="text-xl text-gray-700">
          <span className="font-semibold">{userName}</span>, your score is{' '}
          <span className="font-bold text-indigo-600">{score}</span>
        </p>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4 border-b pb-2">Leaderboard</h2>
        
        {leaderboard.length > 0 ? (
          <div className="  overflow-x-hidden">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry.name + entry.score} 
                    className={entry.name === userName && entry.score === score ? 'bg-indigo-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
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

      <button
        onClick={onRestart}
        className="w-[90%] mx-auto flex items-center justify-center gap-1 px-2 py-1.5 bg-indigo-700 text-white border border-indigo-600 rounded hover:bg-indigo-600 transition "
      >
         <FiRotateCcw className="text-lg" />
            Try Again!
      </button>
    </div>
  );
};

export default Leaderboard;