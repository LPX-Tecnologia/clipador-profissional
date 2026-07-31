export const API_CONFIGS = {
  youtube: {
    baseURL: 'https://baixar-de-v-deos-do-youtube.onrender.com',
    endpoints: {
      baixar: '/baixar',
      info: '/informacoes',
      audio: '/extrair-audio'
    }
  },
  video: {
    baseURL: 'https://api-video-qiqm.onrender.com',
    endpoints: {
      cortar: '/cortar',
      processar: '/processar',
      converter: '/converter'
    }
  },
  imagem: {
    baseURL: 'https://api-edicao-de-imagens-profissional.onrender.com',
    endpoints: {
      redimensionar: '/redimensionar',
      sobrepor: '/sobrepor'
    }
  },
  imagem1: {
    baseURL: 'https://api-edicao-de-imagens-profissional1.onrender.com',
    endpoints: {
      processar: '/processar'
    }
  },
  legenda: {
    baseURL: 'https://api-legendas-animadas.onrender.com',
    endpoints: {
      criar: '/criar',
      animar: '/animar',
      sincronizar: '/sincronizar'
    }
  },
  tiktok: {
    baseURL: 'https://api-postagem-no-tiktok.onrender.com',
    endpoints: {
      postar: '/postar',
      agendar: '/agendar',
      autenticar: '/autenticar'
    }
  },
  youtubePost: {
    baseURL: 'https://api-postagem-no-youtube.onrender.com',
    endpoints: {
      postar: '/postar',
      autenticar: '/autenticar'
    }
  },
  usuarios: {
    baseURL: 'https://api-usu-rios-cadastro-login.onrender.com',
    endpoints: {
      login: '/login',
      cadastro: '/cadastro',
      salvarConfig: '/salvar-config'
    }
  },
  notificacoes: {
    baseURL: 'https://api-notifica-es.onrender.com',
    endpoints: {
      enviar: '/enviar',
      status: '/status'
    }
  },
  sorteio: {
    baseURL: 'https://api-sorteio-e-torneios.onrender.com',
    endpoints: {
      criar: '/criar',
      participar: '/participar'
    }
  },
  pagamentos: {
    baseURL: 'https://api-pagamentos-wc3d.onrender.com',
    endpoints: {
      criar: '/criar',
      confirmar: '/confirmar'
    }
  },
  geolocalizacao: {
    baseURL: 'https://api-localiza-o-geolocaliza-o.onrender.com',
    endpoints: {
      localizar: '/localizar',
      cep: '/cep'
    }
  },
  emails: {
    baseURL: 'https://api-e-mails-disparados.onrender.com',
    endpoints: {
      enviar: '/enviar',
      listar: '/listar'
    }
  },
  iaRecursos: {
    baseURL: 'https://api-ia-gerenciadora-de-recursos.onrender.com',
    endpoints: {
      gerenciar: '/gerenciar',
      otimizar: '/otimizar'
    }
  }
};