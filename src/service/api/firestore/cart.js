import { db } from './../firebase';
import { getUser, updateUserByEmail } from './user';
import CartProduct from './models/CartProduct';
import Cart from './models/Cart';

const collection = db.collection('users');
/*
// Cart
{
    id: String,
    count: Number,
    total: Number,
    currency: String,
    products: Array<CartProduct>
}
// CartProduct
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

export const updateUserCart = async ({products, email}) => {
    let cart = null, id = null;
    
    try {
        let user = await getUser(email);
        cart = user.cart || null;
        if(cart){
            id = cart.id;
        }
        cart = Cart({id, products});
        /* 
        Use this to clear the cart and set a new cart for future use
        */
        if(!products || products.length === 0){
            cart = Cart({products: []});
        }

        let update = await updateUserByEmail(email, {cart});
        window.mlog('api:firestore:updateUserCart::response', update);
        return new Promise((resolve, reject) => resolve(cart));

    }catch(error){
        console.error('getUserCart:Error ', error);
        //return new Promise((resolve, reject) => reject(err));
        return new Promise((resolve, reject) => reject(error));
    }
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
export const addProductToCart = async (email, product, variant=null) => {
    let cart = null, id = null;
    let cartProduct = CartProduct(product, variant);
    try {
        cart = await getUserCart(email);
        id = cart ? cart.id : null;
        if(!cart){
            cart = {};
        }

        let products = cart.products || [],
        present = false;
        for(let p in products){
            /* Check product id and size - if product with different size exists, add a new instance, else increment */
            if(products[p].id === cartProduct.id && ((!cartProduct.size && !products[p].size) || (products[p].size === cartProduct.size))){
                products[p].quantity = Number(products[p].quantity) + Number(cartProduct.quantity);
                present = true;
            }
        }
        if(!present){
            products.push(cartProduct);
        }
        window.mlog('Products after adding -> ', present, products);
        cart = Cart({id, products});

        let update = await updateUserByEmail(email, {cart});
        window.mlog('api:firestore:addProductToCart::response', update);
        
    }catch(error){
        console.error('api:firestore:addProductToCart::response', error);
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
