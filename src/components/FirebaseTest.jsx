import React, { useState } from 'react';
import { updateUserActivity, getUserId } from '../firebase/userActivity';

const FirebaseTest = () => {
  const [status, setStatus] = useState('Nije testirano');
  const [userId, setUserId] = useState('');

  const testFirebase = async () => {
    setStatus('Testiram...');
    try {
      const id = getUserId();
      setUserId(id);
      
      await updateUserActivity({
        testMessage: 'Firebase test uspešan!',
        testTime: new Date().toISOString()
      });
      
      setStatus('✅ Firebase radi!');
    } catch (error) {
      setStatus(`❌ Greška: ${error.message}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: '2px solid #ff69b4',
      fontSize: '14px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4>🔥 Firebase Test</h4>
      <p><strong>Status:</strong> {status}</p>
      {userId && <p><strong>User ID:</strong> {userId.substring(0, 15)}...</p>}
      <button 
        onClick={testFirebase}
        style={{
          background: '#ff69b4',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Testiraj Firebase
      </button>
    </div>
  );
};

export default FirebaseTest;
