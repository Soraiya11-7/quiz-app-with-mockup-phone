//save data on localstorage...
export const saveScore = (name, score) => {
  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score, timestamp: Date.now() });
  localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
};

//get data...
export const getLeaderboard = () => {
  const stored = localStorage.getItem('quizLeaderboard');
  return stored ? JSON.parse(stored) : [];
};