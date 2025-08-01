import React, { useState, useEffect } from 'react';
import { loveReasons } from '../data/loveReasons.js';
import TimeBasedGreeting from './TimeBasedGreeting.jsx';
import { trackLoveButtonClick, trackCurrentLoveMessage, trackTimerStatus } from '../firebase/userActivity.js';
import { getUserSpecificData, setUserSpecificData } from '../services/auth.js';

const LoveButton = ({ onReasonRevealed }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Check if there's a saved cooldown in localStorage (user-specific)
    const savedCooldown = getUserSpecificData('loveCooldown');
    const savedIndex = getUserSpecificData('currentReasonIndex');
    
    if (savedIndex) {
      const index = parseInt(savedIndex);
      setCurrentReasonIndex(index);
      // Prati trenutnu poruku ljubavi
      trackCurrentLoveMessage(index);
    }

    if (savedCooldown) {
      const cooldownEnd = new Date(savedCooldown);
      const now = new Date();
      
      if (cooldownEnd > now) {
        const remaining = Math.ceil((cooldownEnd - now) / 1000);
        setIsDisabled(true);
        setTimeLeft(remaining);
        // Prati timer status
        trackTimerStatus(remaining, true);
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        // Ažuriraj timer status svakih 30 sekundi
        if (newTimeLeft % 30 === 0) {
          trackTimerStatus(newTimeLeft, true);
        }
      }, 1000);
    } else if (isDisabled && timeLeft === 0) {
      setIsDisabled(false);
      // Ukloni user-specific cooldown
      setUserSpecificData('loveCooldown', '');
      // Prati da je timer završen
      trackTimerStatus(0, false);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isDisabled]);

  const handleClick = () => {
    if (isDisabled) return;

    // Show hearts animation
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);

    // Reveal the current reason
    const currentReason = loveReasons[currentReasonIndex];
    onReasonRevealed(currentReason);

    // Pozovi increment funkciju za counter
    if (window.incrementDailyCounter) {
      window.incrementDailyCounter();
    }

    // Update the reason index (user-specific)
    const nextIndex = (currentReasonIndex + 1) % loveReasons.length;
    setCurrentReasonIndex(nextIndex);
    setUserSpecificData('currentReasonIndex', nextIndex.toString());

    // Prati klik na dugme ljubavi i trenutnu poruku (user-specific)
    const totalClicks = parseInt(getUserSpecificData('totalLoveClicks') || '0') + 1;
    setUserSpecificData('totalLoveClicks', totalClicks.toString());
    trackLoveButtonClick(totalClicks);
    trackCurrentLoveMessage(nextIndex);

    // Check if all reasons have been shown
    if (nextIndex === 0 && currentReasonIndex > 0) {
      // Trigger confetti animation for completing all reasons
      triggerConfetti();
    }

    // Set 3-hour cooldown (user-specific)
    const cooldownEnd = new Date();
    cooldownEnd.setHours(cooldownEnd.getHours() + 3);
    setUserSpecificData('loveCooldown', cooldownEnd.toISOString());
    setIsDisabled(true);
    const cooldownSeconds = 3 * 60 * 60;
    setTimeLeft(cooldownSeconds); // 3 hours in seconds
    
    // Prati timer status
    trackTimerStatus(cooldownSeconds, true);
  };

  const triggerConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.className = 'confetti-piece';
      confettiPiece.style.left = Math.random() * 100 + '%';
      confettiPiece.style.animationDelay = Math.random() * 3 + 's';
      confettiPiece.style.backgroundColor = ['#FFD1DC', '#FFDFD3', '#FEC8D8'][Math.floor(Math.random() * 3)];
      confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 4000);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createFloatingHearts = () => {
    const hearts = [];
    for (let i = 0; i < 6; i++) {
      hearts.push(
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 60 - 30}px`,
            top: `${Math.random() * 60 - 30}px`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        >
          💖
        </span>
      );
    }
    return hearts;
  };

  return (
    <div className="love-section">
      <h1 className="romantic-heading">Za Moju Mašu 🤎</h1>
      
      {/* Jutarnje/večernje poruke direktno ispod h1 */}
      <TimeBasedGreeting />
      
      <p className="elegant-text" style={{ fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'center' }}>
        Klikni na dugme ispod da otkriješ novi razlog zašto te volim
      </p>
      
      <button
        className={`love-button ${isDisabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {isDisabled ? 'Ljubav se puni...' : 'Zašto te volim'}
        
        {showHearts && (
          <div className="button-hearts">
            {createFloatingHearts()}
          </div>
        )}
      </button>

      {isDisabled && timeLeft > 0 && (
        <div className="cooldown-timer">
          Sledeći razlog dostupan za: {formatTime(timeLeft)}
        </div>
      )}

      <div className="elegant-text" style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
        Razlog {currentReasonIndex + 1} od {loveReasons.length}
      </div>
    </div>
  );
};

export default LoveButton;
