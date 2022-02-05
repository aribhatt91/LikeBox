import { db } from '../firebase';
import Order from './models/Order';

const collection = db.collection('transaction');

const validateOrder = ({order_id, order_date, payment, user, delivery}) => {
    
    if(!order_id || !payment || !delivery || !user || !order_date) {
        return false;
    }
    if(!delivery.address) {
        return false;
    }
    if(!payment.value) {
        return false;
    }
    if(!user.email) {
        return false;
    }
    return true;
}

export const getAllUserOrders = async (email) => {
    let data = [];
    try {
        let orders = await collection.where("user.email", "==", email).get();
        orders.forEach( doc => {
            data.push(doc.data());
        })
    }catch(error){

    }
    return new Promise( (resolve, reject) => resolve(data));
}

export const addOrder = async (order) => {
    try {
        order = Order(order);
        if(!validateOrder(order)){
            throw new Error('Missing or incorrect information');
        }
        const res = await collection.add(order);
        window.mlog('api:firestore:transaction::addOrder', res.data);
        return new Promise( (resolve, reject) => resolve(res.data));
    }catch(error){
        return new Promise( (resolve, reject) => reject(error));
    }
}

export const cancelOrder = (order_id) => {

}