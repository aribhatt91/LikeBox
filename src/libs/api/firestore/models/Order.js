/* 
{
    order_id: String,
    order_date: DateString(ISO),
    status: String(["in-progress", "complete", "placed", "cancelled"]),
    user: {
        email: String
    },
    "payment": {
        value: Number,
        method: String,
        currency: String
    },
    delivery: {
        delivery_date: DateString(ISO),
        address: Address,
        delivery_option: String,
        delivery_charge: Number,
    },
    items: Array<CartProduct>
} 
*/

export default function Order({
    user,
    address /* Address */,
    delivery_option={},
    payment_method,
    cart
}) {
    const order = {
        payment: {
            currency: "GBP"
        },
        user: {},
        delivery: {}
    };

    if(user){
        order.user.email = user.email;
    }

    if(cart){
        
        order.items = cart.products;
        order.payment.value = cart.total;
        order.order_id = cart.id;
    }

    if(payment_method){
        order.payment.method = payment_method;
    }

    if(address){
        order.delivery.address = address;
    }

    order.delivery.delivery_option = delivery_option.title || "FREE";
    order.delivery.delivery_charge = delivery_option.cost || 0;
    order.payment.value += order.delivery_charge;

    order.delivery.delivery_date = (new Date(new Date().getTime()+((delivery_option.time || 7)*24*60*60*1000))).toISOString();

    order.order_date = (new Date()).toISOString();

    return order;
}