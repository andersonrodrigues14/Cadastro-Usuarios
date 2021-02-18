import axios from 'axios';

const api = axios.create({ //credenciaais da api
  baseURL: 'http://andersonapi1-com-br.umbler.net/'
});

export default api;