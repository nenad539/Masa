import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete, herName = "ljubavi" }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    `Volim te, ${herName}`,
    "Nedostaješ mi...",
    "Brojim dane do našeg susreta",
    "Ti si moj cijeli svijet",
    "Jedva čekam da te zagrlim ponovo"
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800);

    const loadingTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete, herName]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="heartbeat-bg">💖</div>
      <h1 className="romantic-heading" style={{ 
        fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
        marginBottom: '2rem',
        background: 'linear-gradient(45deg, #FF69B4, #FFB6C1, #FFC0CB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Za Moju Mašu 🤎
      </h1>
      <div className="loading-message">
        {messages[messageIndex]}
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
      <div className="elegant-text" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        Pripremam nešto posebno za tebe...
      </div>
    </div>
  );
};

export default LoadingScreen;
