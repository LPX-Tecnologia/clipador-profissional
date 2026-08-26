import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoProcessor from './components/VideoProcessor';
import ConfigPanel from './components/ConfigPanel';
import PlatformManager from './components/PlatformManager';
import ProgressBar from './components/ProgressBar';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>🎬 Clipador Profissional</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <VideoProcessor />
                  <ConfigPanel />
                </div>
                <div>
                  <PlatformManager />
                  <ProgressBar />
                  <ResultDisplay />
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
