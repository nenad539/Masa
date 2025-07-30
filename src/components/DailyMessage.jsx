import React, { useState, useEffect } from 'react';

const DailyMessage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [timeUntilNext, setTimeUntilNext] = useState('');

  // Lista dnevnih poruka (dodaće korisnik više poruka kasnije)
  const dailyMessages = [
    "Svaki dan se sve više zaljubljujem u tebe.",
    "Ti si razlog zašto se smejem svaki dan.",
    "Bez obzira na udaljenost, moja ljubav ka tebi samo raste.",
    "Ti si moja sreća i moja nada za bolje sutra.",
    "Svaki trenutak s tobom je poklon koji čuvam u srcu."
  ];

  const calculateTimeUntilNextMessage = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeDiff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Koristimo datum da odredimo koju poruku prikazati
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const messageIndex = dayOfYear % dailyMessages.length;
    setCurrentMessage(dailyMessages[messageIndex]);

    // Ažuriraj timer svaki sekund
    const timer = setInterval(() => {
      setTimeUntilNext(calculateTimeUntilNextMessage());
    }, 1000);

    // Inicijalno ažuriranje
    setTimeUntilNext(calculateTimeUntilNextMessage());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="daily-message-container">
      <h3 className="daily-message-title">Dnevna poruka</h3>
      <div className="daily-message-content">
        {currentMessage}
      </div>
      <div className="daily-message-timer">
        Sljedeća poruka za: {timeUntilNext}
      </div>
    </div>
  );
};

export default DailyMessage;
