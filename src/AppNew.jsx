import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import LoveButton from './components/LoveButton';
import LoveReason from './components/LoveReason';
import MediaGalleryNew from './components/MediaGalleryNew';
import WhatsAppButton from './components/WhatsAppButton';
import PrebuiltBackgroundHearts from './components/PrebuiltBackgroundHearts';
import DailyCounter from './components/DailyCounter';
import DailyMessage from './components/DailyMessage';
import RelationshipCounter from './components/RelationshipCounter';
import RomanticThemes from './components/RomanticThemes';
import Dashboard from './components/Dashboard';
import { useUserActivityTracking } from './hooks/useUserActivityTracking';
import { isAuthenticated, getCurrentUser } from './services/auth';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentReason, setCurrentReason] = useState(null);
  const [showReason, setShowReason] = useState(false);
  
  // Aktiviraj praćenje aktivnosti korisnika samo ako je ulogovan
  useUserActivityTracking();

  useEffect(() => {
    // Proveri autentifikaciju nakon loading-a
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      const user = getCurrentUser();
      
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
    };

    // Simuliraj loading (2 sekunde)
    const timer = setTimeout(() => {
      setIsLoading(false);
      checkAuth();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentReason(null);
    setShowReason(false);
  };

  const handleReasonRevealed = (reason) => {
    setCurrentReason(reason);
    setShowReason(true);
    
    // Automatically hide reason after 8 seconds
    setTimeout(() => {
      setCurrentReason(null);
      setShowReason(false);
    }, 8000);
  };

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : !isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          {/* Pozadinska srca */}
          <PrebuiltBackgroundHearts />
          
          {/* Romantične teme */}
          <RomanticThemes />
          
          {/* Dashboard (umesto UserStats) */}
          <Dashboard onLogout={handleLogout} />
          
          {/* Glavni sadržaj */}
          <div className="main-content">
            {/* Daily Counter */}
            <DailyCounter />
            
            {/* Relationship Counter */}
            <RelationshipCounter />
            
            {/* Daily Message */}
            <DailyMessage />
            
            {/* Love Button Section */}
            <LoveButton onReasonRevealed={handleReasonRevealed} />
            
            {/* Love Reason Display */}
            {showReason && currentReason && (
              <LoveReason 
                reason={currentReason} 
                onClose={() => setShowReason(false)} 
              />
            )}
            
            {/* Media Gallery */}
            <MediaGalleryNew />
            
            {/* Personalized closing message */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 className="romantic-heading" style={{ 
                fontSize: 'clamp(1.2rem, 4vw, 2rem)', 
                marginBottom: '1rem' 
              }}>
                Moja draga {currentUser?.displayName === 'Nenad 💙' ? 'Mašo' : 'Nenede'} 💕
              </h2>
              <p className="elegant-text" style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {currentUser?.displayName === 'Nenad 💙' ? 
                  'Svaki dan se sve više zaljubljujem u tebe. Kilometri između nas nisu ništa u odnosu na ljubav u mom srcu. Ti si moja sreća, moja radost i moja zauvijek. Jedva čekam dan kada će udaljenost biti samo uspomena, a ja ću te moći zagrljati svaki dan.' :
                  'Hvala ti što postojiš u mom životu. Svaki trenutak koji provodimo zajedno je dragocen. Ti si razlog mog osmeha i moja najveća ljubav. Volim te beskrajno!'
                }
                <br/><br/>
                {currentUser?.displayName === 'Nenad 💙' ? '-Nenad🤎' : '-Tvoja Masa💖'}
              </p>
              <div style={{ 
                fontSize: '2rem', 
                marginTop: '1.5rem',
                animation: 'heartbeat 2s ease-in-out infinite'
              }}>
                💕
              </div>
            </div>
          </div>
          
          {/* WhatsApp dugme (samo za Nenada) */}
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default App;
