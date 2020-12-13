import CART from '../cart.json';
import { readFromCookie, writeToCookie } from './../../service/helper';
const CNAME = "active_cart",
parseCart = (cartStr) => {
    if(!cartStr){
        return null;
    }
    try{
        let cart = null; 
        if(typeof cartStr === 'string'){
            JSON.parse(cartStr);
        }else {
            cart = cartStr || {};
        }
        cart.count = cart.count ? Number(cart.count) || 0 : 0;
        cart.total = cart.total ? Number(cart.total) || 0 : 0;
        cart.subTotal = cart.subTotal ? Number(cart.subTotal) || 0 : 0;
        cart.loggedIn = cart.loggedIn === 'true';
        cart.promoApplied = cart.promoApplied === 'true';
        cart.products = cart.products || [];
        cart.products.forEach((item, index) => {
            item.size = item.size ? Number(item.size) || 0 : 0;
            item.quantity = item.quantity ? Number(item.quantity) || 0 : 0;
            item.fullPrice = item.fullPrice ? Number(item.fullPrice) || 0 : 0;
            item.salePrice = item.salePrice ? Number(item.salePrice) || 0 : 0;
        });
        return cart;
    }catch(e){
        
    }
    return null;
},
getCartLocal = () => {
    let cart = parseCart(readFromCookie(CNAME));
    if(!cart){
        cart = CART;
    }
    return cart;
}

export function MockGetCart(){
    return (new Promise( (resolve, reject) => {
        let cart = getCartLocal();
        console.log('MockGetCart: ', cart);
        writeToCookie(CNAME, cart, 30);
        setTimeout(() => resolve(JSON.stringify(cart)), 2000);
    }));
}

export function MockGetCartItemCount() {
    return (new Promise( (resolve, reject) => {
        let cart = getCartLocal() || {}, products = cart.products || [];
        console.log('MockGetCartItemCount: ', products);
        setTimeout(() => resolve(products.length), 2000);
    }));
}

export function MockAddItemToCart(product) {
    return (new Promise( (resolve, reject) => {
        let cart = getCartLocal(),
        products = cart.products || [],
        present = false, itemCount = 0, subTotal = 0, total = 0;
        for(let p in products){
            /* Check product id and size - if product with different size exists, add a new instance, else increment */
            if(products[p].productId === product.productId && Number(products[p].size) === Number(product.size)){
                products[p].quantity = Number(products[p].quantity) + 1;
                present = true;
            }
            itemCount += Number(products[p].quantity);
            subTotal += (products[p].fullPrice || products[p].salePrice) * products[p].quantity;
            total += products[p].salePrice * products[p].quantity; 
        }
        if(!present){
            products.push(product);
            itemCount++;
            subTotal += (product.fullPrice || product.salePrice) * product.quantity;
            total += product.salePrice * product.quantity;
        }
        console.log('Products after adding -> ', present, products);
        cart.products = products;
        cart.count = itemCount;
        cart.subTotal = subTotal;
        cart.total = total;
        writeToCookie(CNAME, cart, 30);
        setTimeout(() => resolve(JSON.stringify(cart)), 2000);
    }));
}
export function MockRemoveItemFromCart(product, decrement) {
    return (new Promise( (resolve, reject) => {
        let cart = getCartLocal(),
        products = cart.products || [],
        itemCount = cart.count, subTotal = cart.subTotal, total = cart.total;
        for(let p in products){
            if(products[p].productId === product.productId && Number(products[p].size) === Number(product.size)){
                var q = 1;
                if(decrement && products[p].quantity > 1){
                    products[p].quantity = Number(products[p].quantity) - 1;
                }else {
                    q = Number(products[p].quantity);
                    products.splice(p, 1);
                }
                itemCount -= q;
                subTotal -= (products[p].fullPrice || products[p].salePrice)  * q;
                total -= products[p].salePrice * q;
                break;
            }
            
        }
        cart.products = products;
        cart.count = itemCount;
        cart.subTotal = subTotal;
        cart.total = total;
        writeToCookie(CNAME, cart, 30);
        setTimeout(() => resolve(JSON.stringify(cart)), 2000);
    }));
}