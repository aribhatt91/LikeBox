import { db } from './../firebase';

/* {
    user: {
        email, 
        name,
        address: {
            housenum,
            pincode,
            street
        }
    },
    total,
    date_placed,
    date_delivered,
    expected_date,
    items: [{
        sku,
        name,
        thumbnail,
        size,
        colour,
        price,
        quantity
    }]
} */
const collection = db.collection('orders');

export const getAllUserOrders = async (email) => {
    let data = [];
    try {
        let orders = await collection.where("user.email", "==", email).get();
        orders.forEach( doc => {
            data.push(doc.data());
        })
    }catch(err){

    }
    return new Promise( (resolve, reject) => resolve(orders));
}

export const addOrder = (order) => {
    let data = [];
    try {
        collection.add(order).then( docRef => {
            console.log("Document written with ID: ", docRef);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }catch(err){

    }
}

export const cancelOrder = (order) => {

}