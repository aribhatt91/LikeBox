import { getAllUserOrders } from './api/firestore/orders';

export const fetchOrders = (email) => {
    return getAllUserOrders(email);
}