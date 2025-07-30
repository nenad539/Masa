import React, { useEffect } from 'react';

const PrebuiltBackgroundHearts = () => {
  useEffect(() => {
    const startHeartAnimation = () => {
      const bgHeart = document.querySelector('.bg_heart');
      if (!bgHeart) return;

      const love = setInterval(() => {
        const r_num = Math.floor(Math.random() * 40) + 1;
        const r_size = Math.floor(Math.random() * 65) + 10;
        const r_left = Math.floor(Math.random() * 100) + 1;
        const r_bg = Math.floor(Math.random() * 25) + 100;
        const r_time = Math.floor(Math.random() * 5) + 5;

        // Kreirati heart element
        const heart1 = document.createElement('div');
        heart1.className = 'heart';
        heart1.style.cssText = `
          width: ${r_size}px;
          height: ${r_size}px;
          left: ${r_left}%;
          background: rgba(255, ${r_bg - 25}, ${r_bg}, 1);
          animation: love ${r_time}s ease;
        `;

        const heart2 = document.createElement('div');
        heart2.className = 'heart';
        heart2.style.cssText = `
          width: ${r_size - 10}px;
          height: ${r_size - 10}px;
          left: ${r_left + r_num}%;
          background: rgba(255, ${r_bg - 25}, ${r_bg + 25}, 1);
          animation: love ${r_time + 5}s ease;
        `;

        bgHeart.appendChild(heart1);
        bgHeart.appendChild(heart2);

        // Ukloni srca koja su izašla iz ekrana
        const hearts = bgHeart.querySelectorAll('.heart');
        hearts.forEach(heart => {
          const top = parseFloat(heart.style.top || 0);
          const width = parseFloat(heart.style.width || 0);
          if (top <= -100 || width >= 150) {
            heart.remove();
          }
        });
      }, 500);

      // Cleanup funkcija
      return () => clearInterval(love);
    };

    const cleanup = startHeartAnimation();
    return cleanup;
  }, []);

  return <div className="bg_heart"></div>;
};

export default PrebuiltBackgroundHearts;
