import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import ConfigPanel from './ConfigPanel';
import clipService from '../api/services/clipService';

const VideoProcessor = ({ onProcessComplete }) => {
  const [url, setUrl] = useState('');
  const [processando, setProcessando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [status, setStatus] = useState('');

  React.useEffect(() => {
    clipService.onProgress(({ progress, status }) => {
      setProgresso(progress);
      setStatus(status);
    });
  }, []);

  const handleProcessar = async () => {
    if (!url) {
      alert('Por favor, insira uma URL do YouTube');
      return;
    }

    setProcessando(true);
    try {
      const config = JSON.parse(localStorage.getItem('clipConfig') || '{}');
      const resultado = await clipService.processarClip(url, config);
      onProcessComplete(resultado);
    } catch (error) {
      alert('Erro ao processar: ' + error.message);
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div className="video-processor">
      <div className="url-input-group">
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={processando}
        />
        <button 
          onClick={handleProcessar}
          disabled={processando || !url}
          className="btn-primary"
        >
          {processando ? '⏳ Processando...' : '🚀 Criar Clipe'}
        </button>
      </div>

      {processando && (
        <ProgressBar progress={progresso} status={status} />
      )}

      <ConfigPanel disabled={processando} />
    </div>
  );
};

export default VideoProcessor;