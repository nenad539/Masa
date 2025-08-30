import React, { useState, useEffect } from 'react';

const RelationshipCounter = () => {
  const [daysTogether] = useState(84);

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
        marginBottom: '0.2rem',
        color: '#174ea6' // dark blue
      }}>
        💙 Dana u vezi: {daysTogether}
      </div>
    </div>
  );
};

export default RelationshipCounter;
