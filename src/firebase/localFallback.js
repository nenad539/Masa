// Fallback localStorage servis ako Firebase ne radi
const STORAGE_KEY = 'masa_user_stats';

const getLocalStats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      users: [],
      totalClicks: 0,
      totalLikes: 0,
      themes: []
    };
  } catch {
    return { users: [], totalClicks: 0, totalLikes: 0, themes: [] };
  }
};

const saveLocalStats = (stats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.warn('Ne mogu da sačuvam lokalne statistike:', error);
  }
};

export const trackLocalActivity = (activity) => {
  const stats = getLocalStats();
  const timestamp = new Date().toISOString();
  
  // Dodaj novu aktivnost
  stats.users.push({
    id: 'local_user',
    timestamp,
    activity
  });
  
  // Zadrži samo posledjih 50 aktivnosti
  if (stats.users.length > 50) {
    stats.users = stats.users.slice(-50);
  }
  
  saveLocalStats(stats);
  console.log('📱 Lokalno sačuvano:', activity);
};

export const getLocalUserStats = () => {
  return getLocalStats();
};
