import { getAllUserOrders } from './api/firestore/transaction';

const fetchPastOrders = (email) => {
    return getAllUserOrders(email);
}

export default {
    fetchPastOrders
}