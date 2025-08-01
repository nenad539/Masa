import { 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  query, 
  orderBy, 
  limit,
  updateDoc,
  increment,
  serverTimestamp,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from './config';
import { getCurrentUser } from '../services/auth';

// Generiši jedinstveni ID za korisnika
const generateUserId = () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    return currentUser.id; // Koristi auth user ID
  }
  
  // Fallback za neautentifikovane korisnike
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'guest_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Dobij korisnički ID
export const getUserId = () => generateUserId();

// Ažuriraj aktivnost korisnika
export const updateUserActivity = async (activity) => {
  try {
    const userId = getUserId();
    const currentUser = getCurrentUser();
    const userRef = doc(db, 'users', userId);
    
    const activityData = {
      userId,
      userName: currentUser ? currentUser.displayName : 'Guest',
      userAvatar: currentUser ? currentUser.avatar : '👤',
      lastActivity: serverTimestamp(),
      currentPage: window.location.pathname,
      userAgent: navigator.userAgent.substring(0, 100), // Skrati user agent
      ...activity
    };
    
    await setDoc(userRef, activityData, { merge: true });
    console.log('✅ Firebase: Aktivnost ažurirana');
    
  } catch (error) {
    console.warn('⚠️ Firebase: Ne mogu da ažuriram aktivnost (možda je problem sa pravilima):', error.message);
    // Ne prekidaj aplikaciju ako Firebase ne radi
  }
};

// Praćenje trenutne poruke ljubavi
export const trackCurrentLoveMessage = async (messageIndex) => {
  await updateUserActivity({
    currentLoveMessage: messageIndex,
    lastMessageTime: serverTimestamp()
  });
};

// Praćenje klika na dugme ljubavi
export const trackLoveButtonClick = async (clickCount) => {
  const userId = getUserId();
  const userRef = doc(db, 'users', userId);
  
  try {
    await updateDoc(userRef, {
      loveClicksTotal: increment(1),
      lastLoveClick: serverTimestamp(),
      currentClickCount: clickCount
    });
    console.log('✅ Firebase: Love click zabeležen');
  } catch (error) {
    // Ako dokument ne postoji, kreiraj ga
    try {
      await setDoc(userRef, {
        userId,
        loveClicksTotal: 1,
        lastLoveClick: serverTimestamp(),
        currentClickCount: clickCount,
        lastActivity: serverTimestamp()
      }, { merge: true });
      console.log('✅ Firebase: Love click kreiran');
    } catch (secondError) {
      console.warn('⚠️ Firebase: Ne mogu da zabeležim love click:', secondError.message);
    }
  }
};

// Praćenje timer statusa
export const trackTimerStatus = async (timeRemaining, isActive) => {
  await updateUserActivity({
    timerRemaining: timeRemaining,
    timerActive: isActive,
    lastTimerUpdate: serverTimestamp()
  });
};

// Praćenje media galerije
export const trackMediaGallery = async (currentSlide, totalSlides, likedMedia) => {
  await updateUserActivity({
    currentMediaSlide: currentSlide,
    totalMediaSlides: totalSlides,
    likedMediaCount: likedMedia.size,
    likedMediaItems: Array.from(likedMedia),
    lastMediaActivity: serverTimestamp()
  });
};

// Praćenje teme
export const trackThemeChange = async (themeName) => {
  await updateUserActivity({
    currentTheme: themeName,
    lastThemeChange: serverTimestamp()
  });
};

// Dobijanje statistika uživo
export const subscribeToUserStats = (callback) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('lastActivity', 'desc'), limit(10));
  
  return onSnapshot(q, (snapshot) => {
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    callback(users);
  });
};

// Dobijanje broja aktivnih korisnika
export const subscribeToActiveUsers = (callback) => {
  const usersRef = collection(db, 'users');
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  // Proveravamo aktivne korisnike u posledjih 5 minuta
  const q = query(
    usersRef, 
    where('lastActivity', '>=', fiveMinutesAgo),
    orderBy('lastActivity', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const activeUsers = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.lastActivity) {
        activeUsers.push({ id: doc.id, ...data });
      }
    });
    callback(activeUsers);
  });
};

// Dobijanje ukupnih statistika
export const getOverallStats = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    let totalUsers = 0;
    let totalLoveClicks = 0;
    let totalLikedMedia = 0;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      totalUsers++;
      totalLoveClicks += data.loveClicksTotal || 0;
      totalLikedMedia += data.likedMediaCount || 0;
    });
    
    return {
      totalUsers,
      totalLoveClicks,
      totalLikedMedia,
      averageLoveClicks: totalUsers > 0 ? Math.round(totalLoveClicks / totalUsers) : 0
    };
    
  } catch (error) {
    console.error('Greška pri dobijanju statistika:', error);
    return { totalUsers: 0, totalLoveClicks: 0, totalLikedMedia: 0, averageLoveClicks: 0 };
  }
};
