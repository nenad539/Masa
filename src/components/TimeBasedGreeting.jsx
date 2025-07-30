import React, { useState, useEffect } from 'react';

const TimeBasedGreeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    // Jutro: 6:00-12:00
    if (hour >= 6 && hour < 12) {
      return {
        message: "Dobro jutro, ljubavi 😊",
        emoji: "☀️",
        gradient: "linear-gradient(135deg, #FFE5B4 0%, #FFECB3 100%)"
      };
    }
    // Noć: 20:00-5:59
    else if (hour >= 20 || hour < 6) {
      return {
        message: "Laku noć, volim te 🤎",
        emoji: "🌙",
        gradient: "linear-gradient(135deg, #FFDFD3 0%, #FEC8D8 100%)"
      };
    }
    // Dan: 12:00-19:59 (bez poruke)
    else {
      return null;
    }
  };

  const greeting = getGreeting();
  
  if (!greeting) return null;

  return (
    <div style={{
      background: greeting.gradient,
      padding: 'clamp(0.8rem, 3vw, 1rem) clamp(1.2rem, 5vw, 2rem)',
      borderRadius: '25px',
      textAlign: 'center',
      margin: 'clamp(0.5rem, 2vw, 0.8rem) auto clamp(1rem, 4vw, 1.5rem) auto',
      maxWidth: 'clamp(280px, 80vw, 400px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      animation: 'fadeIn 1s ease-in-out'
    }}>
      <div style={{
        fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
        marginBottom: '0.5rem'
      }}>
        {greeting.emoji}
      </div>
      <div style={{
        fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
        color: '#2c1810',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: '500'
      }}>
        {greeting.message}
      </div>
    </div>
  );
};

export default TimeBasedGreeting;
