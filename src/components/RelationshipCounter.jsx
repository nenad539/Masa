import React, { useState, useEffect } from 'react';

const RelationshipCounter = () => {
  const [daysTogether, setDaysTogether] = useState(4);

  useEffect(() => {
    // Početak veze - računam da je 27. jul 2025 bio dan 1
    const startDate = new Date('2025-07-27');
    const today = new Date();
    
    // Računa razliku u danima
    const timeDiff = today - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 jer prvi dan je dan 1
    
    setDaysTogether(daysDiff);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: 'clamp(0.5rem, 2vw, 0.7rem) clamp(0.7rem, 3vw, 1rem)',
      borderRadius: '20px',
      border: '2px solid #8b4559',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(0.7rem, 2.2vw, 0.85rem)',
      color: '#2c1810',
      textAlign: 'center',
      minWidth: 'clamp(100px, 25vw, 120px)',
      maxWidth: '140px'
    }}>
      <div style={{
        fontWeight: '600',
        marginBottom: '0.2rem'
      }}>
        💕 Dan {daysTogether}
      </div>
      <div style={{
        fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)',
        color: '#8b4559',
        fontWeight: '500'
      }}>
        u vezi
      </div>
    </div>
  );
};

export default RelationshipCounter;
