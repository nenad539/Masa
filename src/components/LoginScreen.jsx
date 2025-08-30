import React, { useState } from 'react';
import { login } from '../services/auth';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Dodaj malo delay za animaciju
    setTimeout(() => {
      const result = login(username, password);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }, 800);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fae7e6 0%, #FFD1DC 50%, #FFDFD3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Montserrat", sans-serif'
    },
    loginCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      margin: '20px',
      border: '2px solid rgba(139, 69, 89, 0.2)',
      transform: isLoading ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.3s ease'
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '0.5rem',
      color: '#8b4559',
      fontFamily: '"Parisienne", cursive'
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '1rem',
      marginBottom: '2rem',
      color: '#666',
      fontStyle: 'italic'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '15px 20px',
      fontSize: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      background: 'white',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#8b4559',
      boxShadow: '0 0 0 3px rgba(139, 69, 89, 0.1)'
    },
    label: {
      position: 'absolute',
      top: '-8px',
      left: '15px',
      background: 'white',
      color: '#8b4559',
      fontSize: '0.85rem',
      fontWeight: '500',
      padding: '0 5px'
    },
    button: {
      padding: '15px',
      fontSize: '1.1rem',
      fontWeight: '600',
      background: isLoading ? '#ccc' : 'linear-gradient(135deg, #8b4559, #a05570)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    error: {
      background: '#ffe6e6',
      color: '#d32f2f',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      textAlign: 'center',
      border: '1px solid #ffcdd2'
    },
    hearts: {
      textAlign: 'center',
      fontSize: '1.5rem',
      margin: '1rem 0',
      animation: 'heartbeat 2s ease-in-out infinite'
    },
    accountHints: {
      marginTop: '2rem',
      padding: '1rem',
      background: 'rgba(139, 69, 89, 0.05)',
      borderRadius: '10px',
      fontSize: '0.85rem',
      color: '#666'
    }
  };

  return (
    <div style={styles.container}>
      
      {/* CSS za animacije */}
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .login-card {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .floating-hearts {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
          }
          
          .floating-heart {
            position: absolute;
            font-size: 20px;
            animation: float 6s ease-in-out infinite;
            opacity: 0.7;
          }
          
          @keyframes float {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* Plutajuća srca u pozadini */}
      <div className="floating-hearts">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            💖
          </div>
        ))}
      </div>

      <div style={styles.loginCard} className="login-card">
        <h1 style={styles.title}>Ljubavna prica Tanje i Stefana</h1>
        <p style={styles.subtitle}>Ulogujte se da biste pristupili 💕</p>

        <div style={styles.hearts}>💖 💝 💖</div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Korisničko ime</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
              disabled={isLoading}
              placeholder="Unesite korisničko ime"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              disabled={isLoading}
              placeholder="Unesite lozinku"
            />
          </div>

          {error && (
            <div style={styles.error}>
              ❌ {error}
            </div>
          )}

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⭕</span>
                Prijavljivanje...
              </>
            ) : (
              <>
                🔐 Prijavite se
              </>
            )}
          </button>
        </form>
      </div>
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginScreen;
