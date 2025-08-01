import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserSpecificData, setUserSpecificData } from '../services/auth';

const DailyCounter = () => {
  const [count, setCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) return; // Ne radi bez korisnika
    
    // Učitaj trenutni broj iz user-specific localStorage
    const savedCount = getUserSpecificData('dailyLoveCount');
    const savedDate = getUserSpecificData('lastResetDate');
    const today = new Date().toDateString();

    if (savedDate !== today) {
      // Novi dan - resetuj counter
      setCount(0);
      setUserSpecificData('dailyLoveCount', '0');
      setUserSpecificData('lastResetDate', today);
      setLastResetDate(today);
    } else {
      // Isti dan - učitaj postojeći count
      setCount(parseInt(savedCount) || 0);
      setLastResetDate(savedDate);
    }

    // Postavi timer za reset u ponoć
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      setCount(0);
      setUserSpecificData('dailyLoveCount', '0');
      setUserSpecificData('lastResetDate', new Date().toDateString());
      
      // Postavi novi timer za sledeći dan
      const nextMidnightTimer = setInterval(() => {
        setCount(0);
        setUserSpecificData('dailyLoveCount', '0');
        setUserSpecificData('lastResetDate', new Date().toDateString());
      }, 24 * 60 * 60 * 1000); // 24 sata

      return () => clearInterval(nextMidnightTimer);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, [currentUser]);

  // Funkcija za povećanje broja
  const incrementCount = () => {
    if (!currentUser) return;
    
    const newCount = count + 1;
    setCount(newCount);
    setUserSpecificData('dailyLoveCount', newCount.toString());
  };

  // Eksportuj funkciju da je mogu koristiti drugi komponenti
  useEffect(() => {
    window.incrementDailyCounter = incrementCount;
    return () => {
      window.incrementDailyCounter = null;
    };
  }, [count, currentUser]);

  if (!currentUser) {
    return null; // Ne prikazuj ako nema korisnika
  }

  return (
    <div className="daily-counter">
      <div className="counter-text">
        Koliko si mi danas puta rekla da me voliš:
      </div>
      <div className="counter-number">
        {count} ❤️
      </div>
    </div>
  );
};

export default DailyCounter;
