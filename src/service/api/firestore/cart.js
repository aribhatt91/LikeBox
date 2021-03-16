import { db, auth } from './../firebase';
import { fetchUser, updateUserByEmail } from './user';

const collection = db.collection('users');
/*
// Cart
{
    count: Number,
    subTotal: Number,
    total: Number,
    savings: Number,
    currency: String,
    products: Array,
    promoCode: String,
    promoApplied: Boolean,
}
// Product
{
    sku: String,
    name: String,
    thumbnail: String,
    price: Number,
    quantity: Number,
    size: String, //optional
    colour: String //optional
}
*/
export const getUserCart = async (email) => {
    let cart = null;
    
    try {
        let querySnapshot = await fetchUser(email);
        console.log(querySnapshot, querySnapshot.size);
        if(querySnapshot.size === 1){
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let data = doc.data() || {};
                cart = data.cart || null;
            });
        }else {
            throw new Error('User not found');
        }
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
        if(cart){
            let products = cart.products || [],
            present = false, itemCount = 0, subTotal = 0, total = 0;
            for(let p in products){
                /* Check product id and size - if product with different size exists, add a new instance, else increment */
                if(products[p].sku === product.sku && (Number(products[p].size) === Number(product.size) || (!product.size && !products[p].size))){
                    products[p].quantity = Number(products[p].quantity) + 1;
                    present = true;
                }
                itemCount += Number(products[p].quantity);
                subTotal += (products[p].full_price || products[p].price) * products[p].quantity;
                total += products[p].price * products[p].quantity; 
            }
            if(!present){
                products.push(product);
                itemCount++;
                subTotal += (product.full_price || product.price) * product.quantity;
                total += product.price * product.quantity;
            }
            console.log('Products after adding -> ', present, products);
            cart.products = products;
            cart.count = itemCount;
            cart.subTotal = subTotal;
            cart.total = total;
            //writeToCookie(CNAME, cart, 30);
            //setTimeout(() => resolve(JSON.stringify(cart)), 2000);
        }
        

        
    }catch(err){

    }
    return new Promise((resolve, reject) => resolve(cart));
}

export const removeProductFromCart = async (email, product, decrement=false) => {
    let cart = null;
    try {
        cart = await getUserCart(email);
        if(cart){
            let products = cart.products || [],
            itemCount = cart.count, 
            subTotal = cart.subTotal, 
            total = cart.total;

            for(let p in products){
                if(products[p].sku === product.sku && (Number(products[p].size) === Number(product.size) || (!product.size && !products[p].size))){
                    var q = 1;
                    if(decrement && products[p].quantity > 1){
                        products[p].quantity = Number(products[p].quantity) - 1;
                    }else {
                        q = Number(products[p].quantity);
                        products.splice(p, 1);
                    }
                    itemCount -= q;
                    subTotal -= (products[p].full_price || products[p].price)  * q;
                    total -= products[p].price * q;
                    break;
                }
                
            }
            cart.products = products;
            cart.count = itemCount;
            cart.subTotal = subTotal;
            cart.total = total;
        }
        

    }catch(err){

    }
    return new Promise((resolve, reject) => resolve(cart));
}
