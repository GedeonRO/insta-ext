// App.js
import React, { useState } from 'react';

function App() {
  const [accounts, setAccounts] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleStart = () => {
    // Envoyer les informations au background script
    chrome.runtime.getBackgroundPage((backgroundPage) => {
      backgroundPage.startAutoCommenting(accounts, hashtags);
    });
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Auto-Commenter sur Instagram</h2>
      
      <label>Comptes Instagram :</label>
      <textarea
        placeholder="Entrez les comptes séparés par des virgules"
        value={accounts}
        onChange={(e) => setAccounts(e.target.value)}
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Hashtags ou lieux :</label>
      <textarea
        placeholder="Entrez les hashtags ou lieux séparés par des virgules"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button onClick={handleStart} style={{ padding: '10px', cursor: 'pointer' }}>
        Démarrer le commentaire automatique
      </button>
    </div>
  );
}

export default App;
