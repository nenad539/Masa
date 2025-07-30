import React, { useState, useEffect } from 'react';

const DailyCounter = () => {
  const [count, setCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(null);

  useEffect(() => {
    // Učitaj trenutni broj iz localStorage
    const savedCount = localStorage.getItem('dailyLoveCount');
    const savedDate = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();

    if (savedDate !== today) {
      // Novi dan - resetuj counter
      setCount(0);
      localStorage.setItem('dailyLoveCount', '0');
      localStorage.setItem('lastResetDate', today);
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
      localStorage.setItem('dailyLoveCount', '0');
      localStorage.setItem('lastResetDate', new Date().toDateString());
      
      // Postavi novi timer za sledeći dan
      const nextMidnightTimer = setInterval(() => {
        setCount(0);
        localStorage.setItem('dailyLoveCount', '0');
        localStorage.setItem('lastResetDate', new Date().toDateString());
      }, 24 * 60 * 60 * 1000); // 24 sata

      return () => clearInterval(nextMidnightTimer);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Funkcija za povećanje broja
  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('dailyLoveCount', newCount.toString());
  };

  // Eksportuj funkciju da je mogu koristiti drugi komponenti
  useEffect(() => {
    window.incrementDailyCounter = incrementCount;
  }, [count]);

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
