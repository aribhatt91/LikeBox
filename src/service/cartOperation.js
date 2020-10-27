import { addToCartSuccess, addToCartPending, removeFromCartPending, removeFromCartSuccess, fetchCartPending, fetchCartSuccess, cartError } from '../store/actions/index';
import { MockGetCart } from './../mock/api/mock-cart-api';
import { fetchCartError } from './../store/actions/index';

/*
// Cart
{
    count: Number,
    loggedIn: Boolean,
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
    productId: String,
    productName: String,
    productImg: String,
    fullPrice: Number,
    salePrice: Number,
    quantity: Number,
    size: Number
}
*/
const CART_ADD_ERROR = "Failed to add the product to the cart!",
CART_INCR_ERROR = "Failed to increase quantity of the product!",
CART_DECR_ERROR = "Failed to decrease quantity of the product!",
CART_REMOVE_ERROR = "Encountered an error while trying to remove the product from your cart!",
CART_FETCH_ERROR = "Failed to fetch your cart!",
INVALID_PRODUCT = "Product is not valid";

const EMPTY_CART = {
    count: 0,
    loggedIn: false,
    subTotal: 0,
    total: 0,
    savings: 0,
    currency: "&#8377;",
    products: [],
    promoCode: null,
    promoApplied: false
}
let CartService = {
    active_cart: EMPTY_CART,
    addToCart: (product) => {
        return dispatch => {
            dispatch(addToCartPending(CartService.active_cart));
            if(!CartService.validateProduct(product)){
                console.error(INVALID_PRODUCT, product);
                //DISPATCH ERROR
                dispatch(cartError({error: CART_ADD_ERROR, cart: CartService.active_cart}));
                return;
            }
            
            let cart = CartService.getCart(),
            products = cart.products || [],
            present = false, itemCount = 0, subTotal = 0, total = 0;
            for(let p in products){
                if(products[p].productId === product.productId && products[p].size === product.size){
                    products[p].quantity = Number(products[p].quantity) + 1;
                    present = true;
                }
                itemCount += products[p].quantity;
                subTotal += (products[p].fullPrice || products[p].salePrice) * products[p].quantity;
                total += products[p].salePrice * products[p].quantity; 
            }
            if(!present){
                products.push(product);
            }
            CartService.setCart({
                ...cart,
                'products': products,
                'count': itemCount,
                'subTotal': subTotal,
                'total': total
            });
            /*
            TODO - Make a post request with the product as a parameter
            */
            dispatch(addToCartSuccess(CartService.getCart()));
        }
        
    },
    removeFromCart: (product, decrement) => {
        return (dispatch) => {
            dispatch(removeFromCartPending(CartService.active_cart));
            if(!CartService.validateProduct(product)){
                console.error('Product is not valid', product);
                //DISPATCH ERROR
                if(decrement){
                    dispatch(cartError({error: CART_DECR_ERROR, cart: CartService.active_cart}));
                }else {
                    dispatch(cartError({error: CART_REMOVE_ERROR, cart: CartService.active_cart}));
                }
                
                return;
            }
            
           let cart = CartService.getCart(),
           products = cart.products || [],
           itemCount = cart.count, subTotal = cart.subTotal, total = cart.total;
            for(let p in products){
                if(products[p].productId === product.productId){
                    var q = 1;
                    if(decrement && products[p].quantity > 1){
                        products[p].quantity = Number(products[p].quantity) - 1;
                    }else {
                        q = products[p].quantity;
                        products.splice(p, 1);
                    }
                    itemCount -= q;
                    subTotal -= (products[p].fullPrice || products[p].salePrice)  * q;
                    total -= products[p].salePrice * q;
                    break;
                }
                
            }
            CartService.setCart({
                ...cart,
                'products': products,
                'count': itemCount,
                'subTotal': subTotal,
                'total': total
            });
            /*
            TODO - Make a post request with the product as a parameter
            */
            dispatch(removeFromCartSuccess(CartService.getCart()));
        }
        
    },
    fetchCart: () => {
        return (dispatch) => {
            dispatch(fetchCartPending(EMPTY_CART));
            var cart = CartService.readCartFromCookie();
            console.log('fetchCart: cart from cookie', cart);
            if(!cart){
                console.log('fetchCart: calling MockGetCart()');
                //CartService.setCart(EMPTY_CART);
                MockGetCart().then( res => {
                    CartService.setCart(CartService.parseCart(res));
                    console.log('fetchCart: MockGetCart() parsed cart', CartService.active_cart);
                    dispatch(fetchCartSuccess(CartService.active_cart));
                }).catch( error => {
                    console.log('fetchCart: MockGetCart: error', error);
                    dispatch(fetchCartError())
                })
            }else {
                CartService.setCart(CartService.parseCart(cart));
                console.log('fetchCart: parsed cart', CartService.active_cart);
                dispatch(fetchCartSuccess(CartService.active_cart));
            }
        }  
    },
    parseCart: (cartString) => {
        try{
            let cart = JSON.parse(cartString);
            cart.count = cart.count ? Number(cart.count) || 0 : 0;
            cart.total = cart.total ? Number(cart.total) || 0 : 0;
            cart.subTotal = cart.subTotal ? Number(cart.subTotal) || 0 : 0;
            cart.loggedIn = cart.loggedIn === 'true';
            cart.promoApplied = cart.promoApplied === 'true';
            cart.products = cart.products || [];
            cart.products.forEach((item, index) => {
                item.size = item.quantity ? Number(item.quantity) || 0 : 0;
                item.quantity = item.quantity ? Number(item.quantity) || 0 : 0;
                item.fullPrice = item.fullPrice ? Number(item.fullPrice) || 0 : 0;
                item.salePrice = item.salePrice ? Number(item.salePrice) || 0 : 0;
            });
            return cart;
        }catch(e){
            console.log('parseCart Error', e);
            cartError({error: CART_FETCH_ERROR, cart: CartService.active_cart});
        }
        return EMPTY_CART;
    },
    getCart: () => {
        return CartService.active_cart;
    },
    setCart: (cart) => {
        CartService.active_cart = cart;
        CartService.calculateSavings();
        CartService.writeCartToCookie();
    },
    calculateSavings: () => {
        let that = CartService;
        CartService.active_cart.savings = 0;
        (CartService.active_cart.products || []).forEach((item, index) => {
            that.active_cart.savings += (item.fullPrice - item.salePrice)*item.quantity;
        });
    },
    getCartItemCount: () => {
        return CartService.active_cart.count || 0;
    },
    getCartTotal: () => {
        return CartService.active_cart.total || 0;
    },
    getCartSubTotal: () => {
        return CartService.active_cart.subTotal|| 0;
    },
    writeCartToCookie: () => {
        var d = new Date();
        d.setTime(d.getTime() + (30*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "active_cart=" + JSON.stringify(CartService.active_cart) + ";" + expires + ";path=/";
    },
    readCartFromCookie: () => {
        let name = "active_cart=",
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },
    validateProduct: (product) => {
        if(!product || !product.hasOwnProperty('productId') || !product.hasOwnProperty('productName') || !product.hasOwnProperty('salePrice') || !product.hasOwnProperty('quantity') || !product.hasOwnProperty('size')){
            return false;
        }
        if(product.quantity <= 0){
            return false;
        }
        return true;
    },
    isEmpty: () => {        
        return CartService.active_cart.count === 0;
    }
};

export default CartService;