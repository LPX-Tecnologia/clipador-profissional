import React, { useState } from 'react';
import apiService from '../api/apiService';

const PlatformManager = () => {
  const [plataformas, setPlataformas] = useState({
    tiktok: false,
    youtube: false
  });

  const handleAuth = async (plataforma) => {
    try {
      const response = await apiService.request(
        plataforma === 'tiktok' ? 'tiktok' : 'youtubePost',
        '/autenticar',
        'POST'
      );
      
      if (response.url) {
        window.open(response.url, '_blank');
        setPlataformas({ ...plataformas, [plataforma]: true });
        localStorage.setItem(`${plataforma}_auth`, 'true');
      }
    } catch (error) {
      alert('Erro ao autenticar com ' + plataforma);
    }
  };

  return (
    <div className="platform-manager">
      <h2>🔗 Conectar Plataformas</h2>
      
      <div className="platform-list">
        <div className="platform-item">
          <span>📱 TikTok</span>
          <button 
            onClick={() => handleAuth('tiktok')}
            className={plataformas.tiktok ? 'connected' : ''}
          >
            {plataformas.tiktok ? '✅ Conectado' : '🔌 Conectar'}
          </button>
        </div>

        <div className="platform-item">
          <span>▶️ YouTube</span>
          <button 
            onClick={() => handleAuth('youtube')}
            className={plataformas.youtube ? 'connected' : ''}
          >
            {plataformas.youtube ? '✅ Conectado' : '🔌 Conectar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformManager;