import React, { useEffect, useState } from 'react';

const BackgroundAnimations = () => {
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const heartEmojis = ['💖', '💕', '💗', '💓', '💙', '❤️', '💝', '💞', '💘'];

  // Kreiranje floating hearts - POBOLJŠANO
  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        size: 0.8 + Math.random() * 0.7, // Varijabilna veličina
        rotation: Math.random() * 360, // Random rotacija
        speed: 8 + Math.random() * 12 // Varijabilna brzina
      };
      return heart;
    };

    // Više srca za bolji efekat
    const initialHearts = Array.from({ length: 15 }, createHeart);
    setHearts(initialHearts);

    // Dodavanje novih srca češće
    const heartInterval = setInterval(() => {
      setHearts(prev => {
        const newHeart = createHeart();
        const filteredHearts = prev.slice(-14); // Zadrži poslednih 14
        return [...filteredHearts, newHeart];
      });
    }, 1500); // Svake 1.5 sekunde

    return () => clearInterval(heartInterval);
  }, []);

  // Kreiranje sparkle animacija - POBOLJŠANO
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = {
        id: Math.random(),
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        size: 0.5 + Math.random() * 1.5,
        duration: 2 + Math.random() * 3
      };
      return sparkle;
    };

    const initialSparkles = Array.from({ length: 20 }, createSparkle);
    setSparkles(initialSparkles);

    const sparkleInterval = setInterval(() => {
      setSparkles(prev => {
        const newSparkle = createSparkle();
        const filteredSparkles = prev.slice(-19);
        return [...filteredSparkles, newSparkle];
      });
    }, 1200);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <>
      {/* Enhanced Floating Hearts */}
      <div className="background-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-bg-heart enhanced"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.speed}s`,
              fontSize: `${heart.size * 2}rem`,
              transform: `rotate(${heart.rotation}deg)`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Enhanced Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle enhanced"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            width: `${sparkle.size * 6}px`,
            height: `${sparkle.size * 6}px`
          }}
        />
      ))}
    </>
  );
};

export default BackgroundAnimations;
