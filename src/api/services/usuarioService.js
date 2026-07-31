import apiService from '../apiService';

class UsuarioService {
  async login(email, senha) {
    const response = await apiService.request(
      'usuarios',
      '/login',
      'POST',
      { email, senha }
    );
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
    }
    
    return response;
  }

  async cadastro(dados) {
    return await apiService.request(
      'usuarios',
      '/cadastro',
      'POST',
      dados
    );
  }

  async salvarConfig(config) {
    return await apiService.request(
      'usuarios',
      '/salvar-config',
      'POST',
      config
    );
  }

  getUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
  }
}

export default new UsuarioService();