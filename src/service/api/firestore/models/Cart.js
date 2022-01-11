/* 
// Cart
{
    id: String,
    count: Number,
    total: Number,
    currency: String,
    products: Array<CartProduct>
}
*/
export default function Cart({id, products, currency="GBP"}) {
    const cart = {
        count: 0,
        total: 0,
        currency,
        products: []
    };
    if(id){
        cart.id = id;
    }else {
        cart.id = (new Date()).getTime();
    }
    if(products && Array.isArray(products)){
        
        let count = 0, total = 0;
        products.forEach(product => {
            if(!product.quantity){
                product.quantity = 1;
            }
            count += product.quantity;
            total += ((product.price || 0) * product.quantity);
        })
        cart.products = products;
        cart.count = count;
        cart.total = total;
    }

    return cart;
}