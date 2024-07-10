// Mock data for task overview
const taskOverviewData = [
  { day: 'Mon', tasks: 4 },
  { day: 'Tue', tasks: 6 },
  { day: 'Wed', tasks: 5 },
  { day: 'Thu', tasks: 8 },
  { day: 'Fri', tasks: 7 },
  { day: 'Sat', tasks: 3 },
  { day: 'Sun', tasks: 2 },
];

export const getTaskOverviewData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(taskOverviewData);
    }, 500); // Simulate a 500ms delay
  });
};

// Mock data for daily challenge
const dailyChallenges = [
  "Complete 5 high-priority tasks today!",
  "Finish all your tasks before 5 PM",
  "Take on 3 challenging tasks today",
  "Help a team member with their task",
  "Learn a new productivity technique",
];

export const getDailyChallenge = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      resolve(randomChallenge);
    }, 300); // Simulate a 300ms delay
  });
};