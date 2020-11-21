import { MockGetAllOrders } from './../mock/api/mock-orders-api';

export const fetchOrders = () => {
    return MockGetAllOrders();
}