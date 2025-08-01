import React, { useState, useEffect } from 'react';
import { getCurrentUser, getPartner, logout, getUserSpecificData, setUserSpecificData } from '../services/auth';
import { 
  subscribeToActiveUsers, 
  updateUserActivity,
  trackLoveButtonClick
} from '../firebase/userActivity';

const Dashboard = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [mood, setMood] = useState('😊');
  const [partnerMood, setPartnerMood] = useState('😊');
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const [partnerLoveCount, setPartnerLoveCount] = useState(0);
  const [likedMedia, setLikedMedia] = useState(0);
  const [partnerLikedMedia, setPartnerLikedMedia] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const moods = [
    { emoji: '😊', label: 'Srećan/na' },
    { emoji: '😍', label: 'Zaljubljen/a' },
    { emoji: '🥰', label: 'Umiljat/a' },
    { emoji: '💖', label: 'Romantičan/na' },
    { emoji: '😴', label: 'Pospan/na' },
    { emoji: '🤗', label: 'Želim grljaj' },
    { emoji: '😢', label: 'Tužan/na' },
    { emoji: '🤔', label: 'Razmišljam o tebi' },
    { emoji: '💪', label: 'Energičan/na' },
    { emoji: '🌟', label: 'Posebno' }
  ];

  useEffect(() => {
    const user = getCurrentUser();
    const partnerUser = getPartner();
    setCurrentUser(user);
    setPartner(partnerUser);

    // Učitaj svoje podatke
    const savedMood = getUserSpecificData('currentMood') || '😊';
    const savedLoveCount = parseInt(getUserSpecificData('totalLoveClicks') || '0');
    const savedLikedMedia = JSON.parse(getUserSpecificData('likedMedia') || '[]').length;
    
    setMood(savedMood);
    setLoveCount(savedLoveCount);
    setLikedMedia(savedLikedMedia);

    // Učitaj podatke partnera
    if (partnerUser) {
      const partnerLoveKey = `totalLoveClicks_${partnerUser.id}`;
      const partnerMediaKey = `likedMedia_${partnerUser.id}`;
      const partnerMoodKey = `currentMood_${partnerUser.id}`;
      
      const partnerLoves = parseInt(localStorage.getItem(partnerLoveKey) || '0');
      const partnerMedia = JSON.parse(localStorage.getItem(partnerMediaKey) || '[]').length;
      const partnerMoodValue = localStorage.getItem(partnerMoodKey) || '😊';
      
      setPartnerLoveCount(partnerLoves);
      setPartnerLikedMedia(partnerMedia);
      setPartnerMood(partnerMoodValue);
    }

  }, []);

  const changeMood = (newMood) => {
    setMood(newMood.emoji);
    setUserSpecificData('currentMood', newMood.emoji);
    setShowMoodSelector(false);
    
    // Ažuriraj u Firebase
    updateUserActivity({
      currentMood: newMood.emoji,
      moodLabel: newMood.label,
      moodChanged: new Date().toISOString()
    });

    // Dodaj notifikaciju
    addNotification(`Promenio/la si raspoloženje na ${newMood.emoji} ${newMood.label}`);
  };

  const sendHeartNotification = async () => {
    try {
      // Ažuriraj statistike - dodaj Dashboard srce u "poslate ljubavi"
      const totalClicks = parseInt(getUserSpecificData('totalLoveClicks') || '0') + 1;
      setUserSpecificData('totalLoveClicks', totalClicks.toString());
      setLoveCount(totalClicks); // Ažuriraj lokalno stanje
      trackLoveButtonClick(totalClicks);
      
      // Ovde bi trebalo da implementiraš push notifikacije
      // Za sada ću dodati localStorage notifikaciju
      const notificationData = {
        from: currentUser.displayName,
        to: partner.displayName,
        message: `${currentUser.displayName} misli na tebe! 🤎`,
        timestamp: new Date().toISOString(),
        type: 'heart'
      };

      // Sačuvaj notifikaciju za partnera
      const partnerNotifications = JSON.parse(
        localStorage.getItem(`notifications_${partner.id}`) || '[]'
      );
      partnerNotifications.unshift(notificationData);
      localStorage.setItem(`notifications_${partner.id}`, JSON.stringify(partnerNotifications.slice(0, 10)));

      // Ažuriraj Firebase
      await updateUserActivity({
        sentHeartTo: partner.id,
        heartSentTime: new Date().toISOString()
      });

      addNotification(`Poslao/la si 🤎 za ${partner.displayName}!`);
      
    } catch (error) {
      console.error('Greška pri slanju srca:', error);
      addNotification('Greška pri slanju srca ❌');
    }
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    // Ukloni notifikaciju nakon 5 sekundi
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      left: '90px', // Pomereno desno da ne koliduje sa temama
      zIndex: 1000,
      fontFamily: '"Montserrat", sans-serif'
    },
    dashboardButton: {
      background: 'linear-gradient(135deg, #8b4559, #a05570)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dashboard: {
      position: 'absolute',
      top: '70px',
      left: '0',
      width: '380px',
      maxHeight: '80vh',
      overflowY: 'auto',
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      border: '2px solid rgba(139, 69, 89, 0.2)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '2px solid #f0f0f0'
    },
    userInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #fae7e6, #FFD1DC)',
      padding: '15px',
      borderRadius: '15px',
      marginBottom: '20px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '15px',
      marginBottom: '20px'
    },
    statCard: {
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '12px',
      border: '1px solid #e0e0e0'
    },
    moodSection: {
      background: 'linear-gradient(135deg, #e8f5e8, #f0fff0)',
      padding: '15px',
      borderRadius: '15px',
      marginBottom: '15px'
    },
    moodSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '8px',
      marginTop: '10px'
    },
    moodButton: {
      background: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'all 0.2s ease'
    },
    heartButton: {
      background: 'linear-gradient(135deg, #8b4559, #a05570)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      padding: '15px',
      width: '100%',
      fontSize: '1.1rem',
      cursor: 'pointer',
      marginBottom: '15px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    logoutButton: {
      background: '#ff6b6b',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '10px 15px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '0.9rem'
    },
    notifications: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    notification: {
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      fontSize: '0.9rem',
      animation: 'slideInRight 0.3s ease-out',
      maxWidth: '300px'
    }
  };

  const [showDashboard, setShowDashboard] = useState(false);

  // Funkcija za ažuriranje statistika
  const refreshStats = () => {
    const user = getCurrentUser();
    const partnerUser = getPartner();
    
    if (user) {
      // Ažuriraj svoje statistike
      const savedLoveCount = parseInt(getUserSpecificData('totalLoveClicks') || '0');
      const savedLikedMedia = JSON.parse(getUserSpecificData('likedMedia') || '[]').length;
      setLoveCount(savedLoveCount);
      setLikedMedia(savedLikedMedia);
    }
    
    if (partnerUser) {
      // Ažuriraj statistike partnera
      const partnerLoveKey = `totalLoveClicks_${partnerUser.id}`;
      const partnerMediaKey = `likedMedia_${partnerUser.id}`;
      const partnerMoodKey = `currentMood_${partnerUser.id}`;
      
      const partnerLoves = parseInt(localStorage.getItem(partnerLoveKey) || '0');
      const partnerMedia = JSON.parse(localStorage.getItem(partnerMediaKey) || '[]').length;
      const partnerMoodValue = localStorage.getItem(partnerMoodKey) || '😊';
      
      setPartnerLoveCount(partnerLoves);
      setPartnerLikedMedia(partnerMedia);
      setPartnerMood(partnerMoodValue);
    }
  };

  // Ažuriraj statistike svake 2 sekunde
  useEffect(() => {
    if (showDashboard) {
      const interval = setInterval(refreshStats, 2000);
      return () => clearInterval(interval);
    }
  }, [showDashboard]);

  return (
    <>
      {/* CSS animacije */}
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .dashboard-button:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 24px rgba(0,0,0,0.3);
          }
          
          .heart-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(139, 69, 89, 0.3);
          }
          
          .mood-button:hover {
            border-color: #8b4559;
            transform: scale(1.1);
          }
        `}
      </style>

      {/* Notifikacije */}
      <div style={styles.notifications}>
        {notifications.map(notification => (
          <div key={notification.id} style={styles.notification}>
            {notification.message}
          </div>
        ))}
      </div>

      {/* Dashboard */}
      <div style={styles.container}>
        <button
          style={styles.dashboardButton}
          className="dashboard-button"
          onClick={() => setShowDashboard(!showDashboard)}
          title="Otvori Dashboard"
        >
          📊
        </button>

        {showDashboard && (
          <div style={styles.dashboard}>
            <div style={styles.header}>
              <h2 style={{ margin: '0 0 10px 0', color: '#8b4559' }}>
                💕 Naš Dashboard
              </h2>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                Dobrodošao/la, {currentUser?.displayName}!
              </p>
            </div>

            {/* User info */}
            <div style={styles.userInfo}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {currentUser?.avatar} {currentUser?.displayName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Online sada
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>
                {mood}
              </div>
            </div>

            {/* Statistike oba korisnika */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 'bold', color: '#8b4559' }}>
                  {currentUser?.avatar} Moje statistike
                </div>
                <div style={{ display: 'grid', gap: '5px', fontSize: '0.9rem' }}>
                  <div>💕 Poslate ljubavi: <strong>{loveCount}</strong></div>
                  <div>🖼️ Sviđanja slika: <strong>{likedMedia}</strong></div>
                  <div>😊 Raspoloženje: <strong>{mood}</strong></div>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 'bold', color: '#8b4559' }}>
                  {partner?.avatar} {partner?.displayName}
                </div>
                <div style={{ display: 'grid', gap: '5px', fontSize: '0.9rem' }}>
                  <div>💕 Poslate ljubavi: <strong>{partnerLoveCount}</strong></div>
                  <div>🖼️ Sviđanja slika: <strong>{partnerLikedMedia}</strong></div>
                  <div>😊 Raspoloženje: <strong>{partnerMood}</strong></div>
                </div>
              </div>
            </div>

            {/* Raspoloženje */}
            <div style={styles.moodSection}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
                🌟 Trenutno raspoloženje: {mood}
              </h4>
              <button
                onClick={() => setShowMoodSelector(!showMoodSelector)}
                style={{
                  background: 'white',
                  border: '2px solid #4CAF50',
                  borderRadius: '8px',
                  padding: '8px 15px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: '#2e7d32'
                }}
              >
                Promeni raspoloženje
              </button>
              
              {showMoodSelector && (
                <div style={styles.moodSelector}>
                  {moods.map((moodOption, index) => (
                    <button
                      key={index}
                      style={styles.moodButton}
                      className="mood-button"
                      onClick={() => changeMood(moodOption)}
                      title={moodOption.label}
                    >
                      {moodOption.emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dugme za slanje srca */}
            <button
              style={styles.heartButton}
              className="heart-button"
              onClick={sendHeartNotification}
            >
              🤎 Pošalji srce za {partner?.displayName}
            </button>

            {/* Logout */}
            <button
              style={styles.logoutButton}
              onClick={handleLogout}
            >
              🚪 Odjavi se
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
