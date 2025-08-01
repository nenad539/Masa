import React from 'react';

const LoveReason = ({ reason, onClose }) => {
  if (!reason) return null;

  return (
    <div className="love-reason" style={{
      margin: '2rem auto',
      padding: '2rem',
      maxWidth: '600px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(255, 209, 220, 0.4)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      animation: 'fadeInUp 0.6s ease-out'
    }}>
      <h3 style={{
        color: '#E91E63',
        marginBottom: '1rem',
        fontSize: '1.8rem',
        fontFamily: 'Parisienne, cursive'
      }}>
        {reason.title}
      </h3>
      
      <p style={{
        color: '#333',
        fontSize: '1.2rem',
        lineHeight: '1.6',
        margin: '0'
      }}>
        {reason.reason}
      </p>
      
      <div style={{
        marginTop: '1.5rem',
        fontSize: '2rem',
        animation: 'heartbeat 1.5s ease-in-out infinite'
      }}>
        💖
      </div>
    </div>
  );
};

export default LoveReason;
