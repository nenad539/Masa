import React, { useState } from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "+382068392397";
  const message = "Volim te 🤎!";
  const [showTip, setShowTip] = useState(false);

  const sendWhatsAppMessage = () => {
    // Pozovi increment funkciju za counter
    if (window.incrementDailyCounter) {
      window.incrementDailyCounter();
    }
    
    // Prikaži savjet o kopiranju poruke
    setShowTip(true);
    setTimeout(() => setShowTip(false), 5000);
    
    // Kopiraj poruku u clipboard (ako je moguće)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).catch(() => {
        // Ignorisi grešku ako clipboard nije dostupan
      });
    }
    
    // URL enkodiranje poruke
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp URL format
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Otvori WhatsApp u novom tab-u
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '2rem', 
      right: '2rem', 
      zIndex: 1000 
    }}>
      {showTip && (
        <div className="whatsapp-tip">
          Poruka je kopirana! 🤎<br />
          <small>Samo je zalijepi u WhatsApp chat</small>
        </div>
      )}
      <button
        onClick={sendWhatsAppMessage}
        className="whatsapp-button"
        aria-label="Pošalji mi ljubav"
      >
        <span style={{ marginRight: '0.5rem' }}>Pošalji mi ljubav</span>
        <span style={{ fontSize: '1.5rem' }}>🤎</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
