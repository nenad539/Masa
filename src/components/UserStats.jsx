import React, { useState, useEffect } from 'react';
import { 
  subscribeToActiveUsers, 
  subscribeToUserStats, 
  getOverallStats 
} from '../firebase/userActivity';

const UserStats = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalUsers: 0,
    totalLoveClicks: 0,
    totalLikedMedia: 0,
    averageLoveClicks: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pretplati se na aktivne korisnike
    const unsubscribeActive = subscribeToActiveUsers((users) => {
      setActiveUsers(users);
    });

    // Pretplati se na statistike korisnika
    const unsubscribeStats = subscribeToUserStats((users) => {
      setUserStats(users);
    });

    // Učitaj ukupne statistike
    const loadOverallStats = async () => {
      const stats = await getOverallStats();
      setOverallStats(stats);
    };

    loadOverallStats();
    
    // Osveži ukupne statistike svakih 30 sekundi
    const interval = setInterval(loadOverallStats, 30000);

    return () => {
      unsubscribeActive();
      unsubscribeStats();
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Nepoznato';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Upravo sada';
    if (diff < 3600000) return `Pre ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Pre ${Math.floor(diff / 3600000)} h`;
    return date.toLocaleDateString('sr-RS');
  };

  const getLoveMessageText = (messageIndex) => {
    if (messageIndex === null || messageIndex === undefined) return 'Nije aktivna';
    return `Poruka #${messageIndex + 1}`;
  };

  const getTimerStatus = (timeRemaining, isActive) => {
    if (!isActive) return 'Timer neaktivan';
    if (timeRemaining <= 0) return 'Timer završen';
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    return `${hours}h ${minutes}m preostalo`;
  };

  return (
    <>
      {/* Dugme za prikaz/sakrivanje statistika */}
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(255, 182, 193, 0.9)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          border: '2px solid #ff69b4'
        }}
        onClick={() => setIsVisible(!isVisible)}
        title="Prikaži statistike korisnika"
      >
        📊
      </div>

      {/* Panel sa statistikama */}
      {isVisible && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            width: '350px',
            maxHeight: '80vh',
            overflowY: 'auto',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            padding: '20px',
            zIndex: 999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '2px solid #ff69b4',
            fontSize: '14px'
          }}
        >
          <h3 style={{ margin: '0 0 15px 0', color: '#d63384', textAlign: 'center' }}>
            📈 Statistike Sajta
          </h3>

          {/* Ukupne statistike */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🌟 Ukupno</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>👥 Korisnici: <strong>{overallStats.totalUsers}</strong></div>
              <div>💕 Ljubavi: <strong>{overallStats.totalLoveClicks}</strong></div>
              <div>🖼️ Sviđanja: <strong>{overallStats.totalLikedMedia}</strong></div>
              <div>📊 Prosek: <strong>{overallStats.averageLoveClicks}</strong></div>
            </div>
          </div>

          {/* Aktivni korisnici */}
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#d63384' }}>
              🟢 Aktivni Korisnici ({activeUsers.length})
            </h4>
            {activeUsers.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                Nema aktivnih korisnika u posledjih 5 minuta
              </p>
            ) : (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {activeUsers.map((user, index) => (
                  <div 
                    key={user.id}
                    style={{
                      background: '#f8f9fa',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '8px',
                      border: '1px solid #dee2e6',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: '#d63384', marginBottom: '5px' }}>
                      👤 Korisnik {index + 1}
                    </div>
                    <div style={{ display: 'grid', gap: '3px' }}>
                      <div>⏰ {formatTime(user.lastActivity)}</div>
                      {user.currentLoveMessage !== undefined && (
                        <div>💌 {getLoveMessageText(user.currentLoveMessage)}</div>
                      )}
                      {user.currentClickCount && (
                        <div>💕 Klikova: {user.currentClickCount}</div>
                      )}
                      {user.timerRemaining !== undefined && (
                        <div>⏳ {getTimerStatus(user.timerRemaining, user.timerActive)}</div>
                      )}
                      {user.currentMediaSlide !== undefined && (
                        <div>🖼️ Slika {user.currentMediaSlide + 1}/{user.totalMediaSlides}</div>
                      )}
                      {user.currentTheme && (
                        <div>🎨 Tema: {user.currentTheme}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dugme za zatvaranje */}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              width: '100%',
              padding: '10px',
              background: '#d63384',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            ✖️ Zatvori
          </button>
        </div>
      )}
    </>
  );
};

export default UserStats;
