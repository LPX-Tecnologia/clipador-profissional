import React, { useState } from 'react';
import VideoProcessor from './components/VideoProcessor';
import PlatformManager from './components/PlatformManager';
import ResultDisplay from './components/ResultDisplay';
import usuarioService from './api/services/usuarioService';
import './styles/App.css';
import './styles/components.css';

function App() {
  const [resultado, setResultado] = useState(null);
  const [usuario, setUsuario] = useState(usuarioService.getUsuarioLogado());

  const handleProcessComplete = (result) => {
    setResultado(result);
  };

  const handleLogin = async () => {
    // Simular login
    const user = { id: 1, nome: 'Usuário Teste', email: 'teste@email.com' };
    localStorage.setItem('usuario', JSON.stringify(user));
    setUsuario(user);
  };

  const handleLogout = () => {
    usuarioService.logout();
    setUsuario(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Clipador Profissional</h1>
        <p>Cole a URL e deixe a mágica acontecer!</p>
        
        <div className="user-info">
          {usuario ? (
            <div>
              <span>👤 {usuario.nome}</span>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          ) : (
            <button onClick={handleLogin} className="btn-login">Entrar</button>
          )}
        </div>
      </header>

      <div className="dashboard">
        <div className="main-area">
          <VideoProcessor onProcessComplete={handleProcessComplete} />
          <ResultDisplay resultado={resultado} />
        </div>

        <div className="side-panel">
          <PlatformManager />
          
          <div className="info-box">
            <h3>💡 Como funciona</h3>
            <ol>
              <li>Cole a URL do YouTube</li>
              <li>Configure o clipe</li>
              <li>Conecte suas plataformas</li>
              <li>Clique em "Criar Clipe"</li>
              <li>O sistema faz tudo automaticamente!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;