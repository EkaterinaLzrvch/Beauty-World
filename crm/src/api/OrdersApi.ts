import { OrderStatus } from "../common/dto/enums/OrderStatus";
import { API_PATH } from "../constants";
import { HttpService } from "../services/HttpService";

class OrdersApi extends HttpService {
    constructor() {
        super(`${API_PATH}/orders`);
    }
    
    getAll(status: OrderStatus) {
        return this.get('', { status });
    }

    create(data:any) {
        return this.post('', data);
    }

    // ОБНОВИТЬ ДАННЫЕ 
    edit(data:any, orderId:number) {
        return this.patch(`/${orderId}`);
    }

    closeOrder(orderId: number) {
        // return this.patch(`close/${orderId}`);
    }

    remove(orderId:number) {
        return this.delete(`${orderId}`);
    }
}

export default new OrdersApi();;