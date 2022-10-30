import {API_PATH} from '../constants';
import { HttpService } from './HttpService';

class ApiService extends HttpService {
    login(authData) {
        return this.post(`${API_PATH}/orders`, authData);
    }

    getOrders(access_token) {
        return fetch(`${API_PATH}/orders`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          })
            .then(response => response.json())
    }
}

export default new ApiService();