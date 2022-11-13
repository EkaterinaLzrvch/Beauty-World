import axios from 'axios';
import TokenService from './TokenService';
import PubSub from './PubSub';
import { API_PATH, TOKEN_KEY } from '../constants';



const httpClient = axios.create({
  baseURL: API_PATH,
  withCredentials: true
});

// перехватываем ответ от сервера
httpClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const hasAccessToken = localStorage.getItem(TOKEN_KEY);

    if (error.response.status === 401 && error.config && !error.config._isRetry && Boolean(hasAccessToken)) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get(`${API_PATH}/refresh`, { withCredentials: true });
        TokenService.setToken(response.data.access_token)

        return httpClient.request(originalRequest);
      } catch (e) {
        PubSub.emit('logout');
        throw e;
      }
    }

    throw error;
  }
);

export class HttpService {
  private baseApi: string = '';

  constructor(baseApiPath: string = API_PATH) {
    this.baseApi = baseApiPath;
  }

  get baseHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TokenService.getToken()}`
    };
  }

  async get(path: string, params={}) {
    const response = await httpClient.get(
        `${this.baseApi}/${path}`,
        {
          params,
          headers: this.baseHeaders
        }
    );

    return response.data;
  }

  async post<T>(path: string, body?: T) {
    const response = await httpClient.post(
      `${this.baseApi}/${path}`, body,
        { headers: this.baseHeaders }
    );
    return response.data;
    
  }

  // РЕДАКТИРОВАЬ ЗАПИСЬ!
  async patch<T>(path: string, body?: T) {
    const response = await httpClient.patch(
      `${this.baseApi}/${path}`, body,
        { headers: this.baseHeaders }
    );
    return response.data;
  }

  delete(path:string) {
    return httpClient.delete(`${this.baseApi}/${path}`, {
      headers: this.baseHeaders
    }
    );
  }
}
