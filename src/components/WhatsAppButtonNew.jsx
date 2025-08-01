import React, { useState } from 'react';
import { getCurrentUser, getUserSpecificData, setUserSpecificData } from '../services/auth';
import { trackLoveButtonClick } from '../firebase/userActivity';

const WhatsAppButtonNew = () => {
  const currentUser = getCurrentUser();
  
  const phoneNumber = currentUser?.id === 'user_nenad' ? '+382067266002' : '+382068392397';
  const message = 'Volim te 🤎!';
  const [showTip, setShowTip] = useState(false);

  const sendMessage = () => {
    if (currentUser) {
      const totalClicks = parseInt(getUserSpecificData('totalLoveClicks') || '0') + 1;
      setUserSpecificData('totalLoveClicks', totalClicks.toString());
      trackLoveButtonClick(totalClicks);
    }
    
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3000);
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
    }
    
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {showTip && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '10px 15px',
          borderRadius: '15px',
          fontSize: '14px',
          color: '#2d3748',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          Poruka kopirana! 💕
        </div>
      )}
      
      <button
        onClick={sendMessage}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
        }}
      >
        💬
      </button>
    </div>
  );
};

export default WhatsAppButtonNew;
