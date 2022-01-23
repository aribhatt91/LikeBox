import { getAllUserOrders } from './api/firestore/transaction';

export const fetchPastOrders = (email) => {
    return getAllUserOrders(email);
}

export const updateOrder = (email, update) => {

}

export const cancelOrder = (email, orderid) => {}