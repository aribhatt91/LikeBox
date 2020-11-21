import obj from '../orders.json';
import { readFromLocalStorage, writeToLocalStorage } from './../../service/helper';
const CNAME = "orders",
getLocalOrders = () => {
    try{
        let orders = null;
        if(readFromLocalStorage(CNAME)){
            orders = (JSON.parse(readFromLocalStorage(CNAME) || "{}")).orders || [];
        }else {
            orders = obj.orders;
        }
        return orders.sort((a, b) => {
            if(a.order_date && b.order_date) {
                try{
                    var a_date = new Date(Number(a.order_date)), 
                    b_date = new Date(Number(b.order_date));
                    return b_date.getTime() - a_date.getTime();
                }catch(e){
                    return 0;
                }
            }
        })
    }catch(e){
        return obj.orders || [];
    }      
}
export const MockGetAllOrders = () => {
    return (new Promise( (resolve, reject) => {
        let orders = getLocalOrders();
        console.log('Orders ', orders);
        //writeToLocalStorage(CNAME, {orders});
        setTimeout(() => resolve(orders), 2000);
    }));
}
export const MockAddNewOrder = (order) => {
    return (new Promise( (resolve, reject) => {
        let orders = getLocalOrders(), present = false;
        orders.push(order);
        order.order_date = (new Date()).getTime();
        writeToLocalStorage(CNAME, {orders});
        setTimeout(() => resolve(orders), 2000);
    }));
}
export const MockRemoveOrder = (orderId, productId) => {
    return (new Promise( (resolve, reject) => {
        let orders = getLocalOrders(), index = -1,
        order = orders.find(item => item.id === orderId);
        if(!order) {
            reject({error: 'Order item not found'});
        }else {
            let i = -1, status;
            (order.products || []).forEach((item, index) => {
                if(item.sku === productId) {
                    i = index;
                    status = item.transaction.status;
                }
            })
            if(i > -1 && status && status !== "4"){
                order.products = order.products.slice(i, 1);
            }
            if(order.products.length === 0) {

            }
        }
        writeToLocalStorage(CNAME, {orders});
        setTimeout(() => resolve(orders), 2000);
    }));
}
