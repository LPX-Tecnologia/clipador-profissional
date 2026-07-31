import React from 'react';

const ProgressBar = ({ progress, status }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      <p className="status-text">{status || 'Processando...'}</p>
    </div>
  );
};

export default ProgressBar;