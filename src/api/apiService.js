import axios from 'axios';
import { API_CONFIGS } from './config';

class ApiService {
  constructor() {
    this.apis = {};
    this.initializeApis();
  }

  initializeApis() {
    Object.keys(API_CONFIGS).forEach(key => {
      this.apis[key] = axios.create({
        baseURL: API_CONFIGS[key].baseURL,
        timeout: 30000,
        headers: { 'Content-Type': 'application/json' }
      });

      this.apis[key].interceptors.request.use(
        config => {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => Promise.reject(error)
      );
    });
  }

  async request(apiName, endpoint, method = 'GET', data = null, params = {}) {
    try {
      const api = this.apis[apiName];
      if (!api) throw new Error(`API ${apiName} não encontrada`);

      const response = await api({
        method,
        url: endpoint,
        data,
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Erro na API ${apiName}:`, error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || 'Erro no servidor'
      };
    } else if (error.request) {
      return { status: 0, message: 'Servidor indisponível' };
    } else {
      return { status: -1, message: error.message };
    }
  }
}

export default new ApiService();