import apiService from '../apiService';

class ClipService {
  constructor() {
    this.progress = 0;
    this.status = 'idle';
    this.currentClip = null;
    this.listeners = [];
  }

  onProgress(callback) {
    this.listeners.push(callback);
  }

  updateProgress(progress, status) {
    this.progress = progress;
    this.status = status;
    this.listeners.forEach(cb => cb({ progress, status }));
  }

  async processarClip(url, config) {
    try {
      this.updateProgress(5, 'Iniciando processamento...');
      
      // 1. Validar URL
      if (!this.validarUrl(url)) {
        throw new Error('URL do YouTube inválida');
      }
      
      // 2. Baixar vídeo
      this.updateProgress(15, 'Baixando vídeo do YouTube...');
      const videoInfo = await this.baixarVideo(url);
      
      // 3. Extrair áudio
      this.updateProgress(30, 'Extraindo áudio...');
      const audioPath = await this.extrairAudio(videoInfo.path);
      
      // 4. Cortar vídeo
      this.updateProgress(45, 'Cortando trecho de 1 minuto...');
      const videoCortado = await this.cortarVideo(videoInfo.path, {
        inicio: config.inicio || 0,
        duracao: Math.min(config.duracao || 60, 60)
      });
      
      // 5. Gerar legenda animada
      this.updateProgress(65, 'Gerando legenda animada...');
      const legenda = await this.gerarLegenda(audioPath, {
        estilo: config.estiloLegenda || 'moderno',
        cor: config.corLegenda || '#FFFFFF',
        tamanho: config.tamanhoLegenda || 24
      });
      
      // 6. Sincronizar legenda com vídeo
      this.updateProgress(80, 'Sincronizando legenda...');
      const videoFinal = await this.sincronizarLegenda(videoCortado.path, legenda.id);
      
      // 7. Postar nas plataformas
      this.updateProgress(90, 'Postando nas plataformas...');
      const posts = await this.postarPlataformas(videoFinal, legenda, config);
      
      this.updateProgress(100, 'Concluído! 🎉');
      
      return {
        success: true,
        video: videoFinal,
        legenda: legenda,
        posts: posts
      };
    } catch (error) {
      this.updateProgress(0, 'Erro: ' + error.message);
      throw error;
    }
  }

  validarUrl(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    return patterns.some(pattern => pattern.test(url));
  }

  async baixarVideo(url) {
    return await apiService.request(
      'youtube',
      '/baixar',
      'POST',
      { url, qualidade: '1080p' }
    );
  }

  async extrairAudio(videoPath) {
    return await apiService.request(
      'youtube',
      '/extrair-audio',
      'POST',
      { video: videoPath }
    );
  }

  async cortarVideo(videoPath, config) {
    return await apiService.request(
      'video',
      '/cortar',
      'POST',
      {
        video: videoPath,
        inicio: config.inicio || 0,
        duracao: config.duracao || 60,
        resolucao: '1080x1920'
      }
    );
  }

  async gerarLegenda(audioPath, config) {
    return await apiService.request(
      'legenda',
      '/criar',
      'POST',
      {
        audio: audioPath,
        estilo: config.estilo || 'moderno',
        cor: config.cor || '#FFFFFF',
        tamanho: config.tamanho || 24
      }
    );
  }

  async sincronizarLegenda(videoPath, legendaId) {
    return await apiService.request(
      'legenda',
      '/sincronizar',
      'POST',
      {
        video: videoPath,
        legenda: legendaId,
        delay: 0
      }
    );
  }

  async postarPlataformas(videoPath, legenda, config) {
    const resultados = [];
    
    if (config.plataformas?.tiktok) {
      const tiktokPost = await apiService.request(
        'tiktok',
        '/postar',
        'POST',
        {
          video: videoPath,
          legenda: legenda.texto,
          descricao: config.descricao || '🎬 Clipe automático!',
          hashtags: config.hashtags || '#clip #viral'
        }
      );
      resultados.push({ plataforma: 'TikTok', ...tiktokPost });
    }
    
    if (config.plataformas?.youtube) {
      const youtubePost = await apiService.request(
        'youtubePost',
        '/postar',
        'POST',
        {
          video: videoPath,
          titulo: config.titulo || 'Clipe Automático',
          descricao: config.descricao || '',
          legenda: legenda.texto
        }
      );
      resultados.push({ plataforma: 'YouTube', ...youtubePost });
    }
    
    return resultados;
  }

  getProgress() {
    return { progress: this.progress, status: this.status };
  }
}

export default new ClipService();