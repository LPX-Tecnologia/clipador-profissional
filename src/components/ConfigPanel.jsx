import React, { useState, useEffect } from 'react';

const ConfigPanel = ({ disabled }) => {
  const [config, setConfig] = useState({
    duracao: 60,
    inicio: 0,
    estiloLegenda: 'moderno',
    corLegenda: '#FFFFFF',
    tamanhoLegenda: 24,
    plataformas: {
      tiktok: true,
      youtube: false
    },
    hashtags: '#clip #viral #shorts',
    descricao: '🎬 Clipe automático!'
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('clipConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    localStorage.setItem('clipConfig', JSON.stringify(newConfig));
  };

  return (
    <div className="config-panel">
      <h3>⚙️ Configurações do Clipe</h3>
      
      <div className="config-grid">
        <div className="config-item">
          <label>Duração (segundos)</label>
          <input
            type="number"
            value={config.duracao}
            onChange={(e) => handleChange('duracao', parseInt(e.target.value))}
            min="5"
            max="60"
            disabled={disabled}
          />
        </div>

        <div className="config-item">
          <label>Início (segundos)</label>
          <input
            type="number"
            value={config.inicio}
            onChange={(e) => handleChange('inicio', parseInt(e.target.value))}
            min="0"
            disabled={disabled}
          />
        </div>

        <div className="config-item">
          <label>Estilo da Legenda</label>
          <select
            value={config.estiloLegenda}
            onChange={(e) => handleChange('estiloLegenda', e.target.value)}
            disabled={disabled}
          >
            <option value="moderno">Moderno</option>
            <option value="classico">Clássico</option>
            <option value="animado">Animado</option>
            <option value="minimalista">Minimalista</option>
          </select>
        </div>

        <div className="config-item">
          <label>Cor da Legenda</label>
          <input
            type="color"
            value={config.corLegenda}
            onChange={(e) => handleChange('corLegenda', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="config-item full-width">
          <label>Hashtags</label>
          <input
            type="text"
            value={config.hashtags}
            onChange={(e) => handleChange('hashtags', e.target.value)}
            placeholder="#clip #viral #shorts"
            disabled={disabled}
          />
        </div>

        <div className="config-item full-width">
          <label>Descrição</label>
          <input
            type="text"
            value={config.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
            placeholder="Descrição do vídeo..."
            disabled={disabled}
          />
        </div>

        <div className="config-item full-width">
          <label>Plataformas para postagem</label>
          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={config.plataformas.tiktok}
                onChange={(e) => handleChange('plataformas', {
                  ...config.plataformas,
                  tiktok: e.target.checked
                })}
                disabled={disabled}
              />
              📱 TikTok
            </label>
            <label>
              <input
                type="checkbox"
                checked={config.plataformas.youtube}
                onChange={(e) => handleChange('plataformas', {
                  ...config.plataformas,
                  youtube: e.target.checked
                })}
                disabled={disabled}
              />
              ▶️ YouTube
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;