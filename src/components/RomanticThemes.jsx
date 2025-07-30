import React, { useState, useEffect } from 'react';

const RomanticThemes = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  const themes = {
    default: {
      name: "Roze Ljubav",
      emoji: "💖",
      colors: {
        background: '#fae7e6',
        primary: '#FFD1DC',
        secondary: '#FFDFD3',
        accent: '#FEC8D8',
        text: '#2c1810'
      }
    },
    sunset: {
      name: "Zalazak Sunca",
      emoji: "🌅",
      colors: {
        background: '#ffe4e1',
        primary: '#ffb3ba',
        secondary: '#ffc3a0',
        accent: '#ff8a80',
        text: '#5d3321'
      }
    },
    ocean: {
      name: "Okean Ljubavi",
      emoji: "🌊",
      colors: {
        background: '#e8f4f8',
        primary: '#b3e5fc',
        secondary: '#c8e6c9',
        accent: '#81c784',
        text: '#1a3a4a'
      }
    },
    forest: {
      name: "Šumska Bajka",
      emoji: "🌿",
      colors: {
        background: '#f1f8e9',
        primary: '#c8e6c9',
        secondary: '#dcedc8',
        accent: '#aed581',
        text: '#2e4324'
      }
    },
    lavender: {
      name: "Lavanda Snova",
      emoji: "💜",
      colors: {
        background: '#f3e5f5',
        primary: '#e1bee7',
        secondary: '#f8bbd9',
        accent: '#ce93d8',
        text: '#4a148c'
      }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('romanticTheme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(themes[savedTheme]);
    }
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.style.setProperty('--background-main', theme.colors.background);
    root.style.setProperty('--primary-pink', theme.colors.primary);
    root.style.setProperty('--secondary-peach', theme.colors.secondary);
    root.style.setProperty('--accent-rose', theme.colors.accent);
    root.style.setProperty('--text-dark', theme.colors.text);
    root.style.setProperty('--background-gradient', 
      `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary} 50%, ${theme.colors.secondary} 100%)`
    );
  };

  const changeTheme = (themeKey) => {
    setCurrentTheme(themeKey);
    applyTheme(themes[themeKey]);
    localStorage.setItem('romanticTheme', themeKey);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      left: '15px',
      zIndex: 1000
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid #8b4559',
          borderRadius: '50%',
          width: 'clamp(45px, 10vw, 55px)',
          height: 'clamp(45px, 10vw, 55px)',
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          cursor: 'pointer',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Promeni temu"
      >
        🎨
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '1rem',
          boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
          minWidth: '200px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '0.8rem',
            color: '#2c1810',
            textAlign: 'center'
          }}>
            Romantične Teme
          </div>
          
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => changeTheme(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.6rem',
                margin: '0.3rem 0',
                backgroundColor: currentTheme === key ? theme.colors.primary : 'transparent',
                border: '1px solid #8b4559',
                borderRadius: '10px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '0.5rem', fontSize: '1.1rem' }}>
                {theme.emoji}
              </span>
              <span style={{ color: '#2c1810', fontWeight: currentTheme === key ? '600' : '400' }}>
                {theme.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RomanticThemes;
