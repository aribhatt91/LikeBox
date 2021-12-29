import { db } from './../firebase';
import { getUser, updateUserByEmail } from './user';

const collection = db.collection('users');
/*
// Cart
{
    id: String,
    count: Number,
    sub_total: Number,
    total: Number,
    savings: Number,
    currency: String,
    products: Array,
    promo_code: String,
}
// Product
{
    id: String,
    parent_product_id: String,
    name: String,
    thumbnail: String,
    price: Number,
    quantity: Number,
    size: String, //optional
    colour: String //optional
}
*/
const EMPTY_CART = {
    count: 0,
    total: 0,
    products: []
}
export const getUserCart = async (email) => {
    let cart = null;
    
    try {
        let user = await getUser(email);
        cart = user.cart || null;
    }catch(err){
        console.error('getUserCart:Error ', err);
        //return new Promise((resolve, reject) => reject(err));
    }
    return new Promise((resolve, reject) => resolve(cart));
}
export const getCartCount = async (email) => {
    let cart = null, count = 0;
    try {
        cart = await getUserCart(email);
        if(cart){
            let products = cart.products || [];
            products.forEach(item => {
                count += Number(item.quantity);
            })
        }
    }catch(err){

    }
    return new Promise(resolve => resolve(count));
}
export const addProductToCart = async (email, product) => {
    let cart = null;
    try {
        cart = await getUserCart(email);
        if(!cart){
            cart = EMPTY_CART;
            cart.id = (new Date()).getTime();
        }
        if(cart){
            let products = cart.products || [],
            present = false, itemCount = 0, total = 0;
            for(let p in products){
                /* Check product id and size - if product with different size exists, add a new instance, else increment */
                if(products[p].id === product.id && ((!product.size && !products[p].size) || (products[p].size === product.size))){
                    products[p].quantity = Number(products[p].quantity) + Number(product.quantity);
                    present = true;
                }
                itemCount += Number(products[p].quantity);
                total += products[p].price * products[p].quantity; 
            }
            if(!present){
                products.push(product);
                itemCount++;
                total += product.price * product.quantity;
            }
            window.mlog('Products after adding -> ', present, products);
            cart.products = products;
            cart.count = itemCount;
            cart.total = total;
            //writeToCookie(CNAME, cart, 30);
            //setTimeout(() => resolve(JSON.stringify(cart)), 2000);
            let update = await updateUserByEmail(email, {cart})
            window.mlog(update);
        }
        

        
    }catch(err){

    }
    return new Promise((resolve, reject) => resolve(cart));
}

export const removeProductFromCart = async (email, product, decrement=false) => {
    let cart = null;
    try {
        cart = await getUserCart(email);
        if(!cart){
            window.mlog('No cart found');
        }
        if(cart){
            let products = cart.products || [],
            itemCount = Number(cart.count) || 0, 
            total = Number(cart.total) || 0;
            let q = 1, price = 0, full_price = 0, index = -1;

            for(let p in products){
                if(products[p].id === product.id && (Number(products[p].size) === Number(product.size) || (!product.size && !products[p].size))){
                    q = 1, 
                    price = products[p].price;

                    if(decrement && products[p].quantity > 1){
                        products[p].quantity = Number(products[p].quantity) - 1;
                    }else {
                        q = Number(products[p].quantity);
                        index = p;
                        
                    }
                    
                    window.mlog()
                    break;
                }
                
            }

            if(index > -1){
                products.splice(index, 1);
                itemCount -= q;
                total -= (Number(price) * q);
            }
            cart.products = products;
            cart.count = itemCount;
            cart.total = total;
            window.mlog(cart);

            let update = await updateUserByEmail(email, {cart})
            window.mlog(update);
        }
        

    }catch(err){

    }
    return new Promise((resolve, reject) => resolve(cart));
}
