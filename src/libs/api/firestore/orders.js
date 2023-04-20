
/* 
{
    "order_id": "order0001",
    "status": "in-progress",
    "items": [{
        "id": "product0001",
        "quantity": 1,
        "price": 30,
        "size": "S"
    },
    {
        "id": "product0021",
        "quantity": 1,
        "price": 70,
        "size": "XL"
    }],
    "payment": {
        "method": "card",
        "value": 100
    },
    "user": {
        "email": "admin@gmail.com"
    },
    "delivery": {
        "address": {
            "housenumber": "123",
            "street": "",
            "city": "",
            "postcode": ""
        },
        "delivery_date": "",
        "delivery_option": "FAST",
        "delivery_charge": 10
    }
} 
*/
const validateOrder = (order) => {
    if(!order){
        return false;
    }
    
    return true;
}

export const getOrders = async (userId, page, limit=10) => {

}

export const addOrder = async (userId, order) => {

}