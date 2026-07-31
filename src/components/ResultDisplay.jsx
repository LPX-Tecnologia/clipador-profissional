import React from 'react';

const ResultDisplay = ({ resultado }) => {
  if (!resultado) return null;

  return (
    <div className="result-display">
      <h3>✅ Clipe Criado com Sucesso!</h3>
      
      <div className="result-info">
        <p>📹 Vídeo: {resultado.video?.nome || 'Processado'}</p>
        <p>📝 Legenda: {resultado.legenda?.texto ? 'Sincronizada' : 'Gerada'}</p>
        <p>📤 Postado em: {resultado.posts?.map(p => p.plataforma).join(', ') || 'Nenhuma'}</p>
      </div>

      {resultado.posts && resultado.posts.length > 0 && (
        <div className="posts-preview">
          {resultado.posts.map((post, index) => (
            <div key={index} className="post-card">
              <h4>{post.plataforma}</h4>
              <p>{post.mensagem || 'Publicado com sucesso!'}</p>
              {post.url && (
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  Ver postagem ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;