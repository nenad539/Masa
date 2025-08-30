import React, { useState } from 'react';
import { getCurrentUser, getPartner, getUserSpecificData, setUserSpecificData } from '../services/auth';
import { trackLoveButtonClick } from '../firebase/userActivity';

const WhatsAppButton = () => {
  console.log('🔴 WhatsAppButton komponenta se poziva!');
  const currentUser = getCurrentUser();
  console.log('🔴 currentUser:', currentUser);
  
  // PRIVREMENO - prikazuj uvek da vidim da li komponenta radi
  // if (!currentUser) {
  //   console.log('🔴 Nema currentUser - vraćam null');
  //   return null;
  // }
  
  // Stefan šalje na +382 067 266 002, Tanja šalje na +382 068 392 397
  const phoneNumber = currentUser.id === 'user_stefan' ? '+382067266002' : '+382068392397';
  const message = 'Volim te 💙!'; // Plavo srce emoji za WhatsApp
  const [showTip, setShowTip] = useState(false);

  console.log('WhatsAppButton: Prikazujem button za korisnika:', currentUser.displayName);

  const sendWhatsAppMessage = () => {
    // Ažuriraj statistike - dodaj WhatsApp poruku u "poslate ljubavi"
    const totalClicks = parseInt(getUserSpecificData('totalLoveClicks') || '0') + 1;
    setUserSpecificData('totalLoveClicks', totalClicks.toString());
    trackLoveButtonClick(totalClicks);
    
    // Pozovi increment funkciju za counter
    if (window.incrementDailyCounter) {
      window.incrementDailyCounter();
    }
    
    // Prikaži savjet o kopiranju poruke
    setShowTip(true);
    setTimeout(() => setShowTip(false), 5000);
    
    // Pokušaj da kopiraš poruku u clipboard za SVE korisnike
    const copyToClipboard = async () => {
      try {
        console.log('Pokušavam kopiranje za korisnika:', currentUser.displayName);
        console.log('Poruka za kopiranje:', message);
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(message);
          console.log('✅ Poruka je kopirana u clipboard (modern API):', message);
        } else {
          // Fallback za starije browsers
          console.log('Koristim fallback metodu...');
          const textArea = document.createElement('textarea');
          textArea.value = message;
          textArea.style.position = 'fixed';
          textArea.style.top = '0';
          textArea.style.left = '0';
          textArea.style.width = '2em';
          textArea.style.height = '2em';
          textArea.style.padding = '0';
          textArea.style.border = 'none';
          textArea.style.outline = 'none';
          textArea.style.boxShadow = 'none';
          textArea.style.background = 'transparent';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              console.log('✅ Poruka je kopirana (fallback metoda):', message);
            } else {
              console.log('❌ Fallback kopiranje nije uspelo');
            }
          } catch (fallbackError) {
            console.log('❌ Fallback kopiranje greška:', fallbackError);
          }
          document.body.removeChild(textArea);
        }
      } catch (error) {
        console.log('❌ Greška pri kopiranju:', error);
      }
    };
    
    copyToClipboard();
    
    // URL enkodiranje poruke
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp URL format
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    console.log('WhatsApp URL:', whatsappUrl);
    
    // Otvori WhatsApp u novom tab-u
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '2rem', 
      right: '2rem', 
      zIndex: 9999,
      backgroundColor: 'red',
      padding: '20px',
      border: '3px solid yellow'
    }}>
      <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>
        🔴 DEBUG: WhatsApp Button je OVDE! 🔴
      </div>
      {showTip && (
        <div className="whatsapp-tip">
          Poruka je kopirana! 💙<br />
          <small>Samo je zalijepi u WhatsApp chat</small>
        </div>
      )}
      <button
        onClick={sendWhatsAppMessage}
        className="whatsapp-button"
        aria-label="Pošalji mi ljubav"
      >
        <span style={{ marginRight: '0.5rem' }}>Pošalji mi ljubav</span>
  <span style={{ fontSize: '1.5rem' }}>💙</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
