import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LoveButton from './components/LoveButton';
import LoveReason from './components/LoveReason';
import MediaGalleryNew from './components/MediaGalleryNew';
import WhatsAppButton from './components/WhatsAppButton';
import PrebuiltBackgroundHearts from './components/PrebuiltBackgroundHearts';
import DailyCounter from './components/DailyCounter';
import DailyMessage from './components/DailyMessage';
import RelationshipCounter from './components/RelationshipCounter';
import RomanticThemes from './components/RomanticThemes';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentReason, setCurrentReason] = useState(null);
  const [showReason, setShowReason] = useState(false);

  // You can customize her name here
  const herName = "Za Moju Mašu 🤎"; // Change this to her actual name

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleReasonRevealed = (reason) => {
    setCurrentReason(reason);
    setShowReason(true);
    
    // Automatically hide reason after 8 seconds
    setTimeout(() => {
      setShowReason(false);
    }, 8000);
  };

  return (
    <div className="app">
      {/* Prebuilt background animacije srca */}
      <PrebuiltBackgroundHearts />
      
      {isLoading && (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          herName={herName}
        />
      )}
      
      {!isLoading && (
        <div className="main-content">
          {/* Brojač dana u vezi - fiksiran u gornjem desnom uglu */}
          <RelationshipCounter />
          
          {/* Romantične teme - levi gornji ugao */}
          <RomanticThemes />
          
          <LoveButton onReasonRevealed={handleReasonRevealed} />
          
          <LoveReason 
            reason={currentReason} 
            isVisible={showReason}
          />
          
          <DailyCounter />
          
          <MediaGalleryNew />
          
          <DailyMessage />
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 className="romantic-heading" style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', marginBottom: '1rem' }}>
              Bez obzira na udaljenost
            </h2>
            <p className="elegant-text" style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Svaki dan se sve više zaljubljujem u tebe. Kilometri između nas nisu ništa u odnosu na ljubav u mom srcu. 
              Ti si moja sreća, moja radost i moja zauvijek. Jedva čekam dan kada će udaljenost biti samo uspomena, 
              a ja ću te moći zagrljiti svaki dan.
              <br/><br/>
              -Nenad🤎
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
      )}
      
      {/* WhatsApp dugme */}
      {!isLoading && <WhatsAppButton />}
    </div>
  );
}

export default App;
