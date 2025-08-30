import React, { useState, useEffect } from 'react';
import { getCurrentUser, getUserSpecificData, setUserSpecificData } from '../services/auth';

const DailyCounter = () => {
  const [count, setCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    // Force reset to 0 on mount
    setCount(0);
    setUserSpecificData('dailyLoveCount', '0');
    setUserSpecificData('lastResetDate', new Date().toDateString());
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
