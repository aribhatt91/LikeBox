import { addToCartSuccess, addToCartPending, removeFromCartPending, removeFromCartSuccess, fetchCartPending, fetchCartSuccess, cartError } from '../store/actions/index';
import { CURRENCY } from './constants';
import { getUserCart, addProductToCart, removeProductFromCart, getCartCount } from './api/firestore/cart';

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
    full_price: Number,
    price: Number,
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
    subTotal: 0,
    total: 0,
    savings: 0,
    currency: CURRENCY,
    products: []
}
let CartService = {
    active_cart: EMPTY_CART,
    addToCart: (email, product) => {
        
        return dispatch => {
            dispatch(addToCartPending(CartService.active_cart));
            if(!CartService.validateProduct(product)){
                window.mlog('addToCart: ', INVALID_PRODUCT, product);
                //DISPATCH ERROR
                dispatch(cartError({error: CART_ADD_ERROR, cart: CartService.active_cart}));
                return;
            }
            //Firestore
            addProductToCart(email, product).then( res => {
                CartService.setCart(CartService.parseCart(res));
                //window.mlog('addToCart: MockGetCart: parsed cart', CartService.active_cart);
                dispatch(addToCartSuccess(CartService.getCart()));
            }).catch( error => {
                //window.mlog('addToCart: MockGetCart: error', error);
                dispatch(cartError({error: CART_ADD_ERROR, cart: CartService.active_cart}));
            });
        }
        
    },
    removeFromCart: (email, product, decrement=false) => {
        return (dispatch) => {
            dispatch(removeFromCartPending(CartService.active_cart));
            if(!CartService.validateProduct(product)){
                window.mlog('removeFromCart: ', INVALID_PRODUCT, product);
                //DISPATCH ERROR
                if(decrement){
                    dispatch(cartError({error: CART_DECR_ERROR, cart: CartService.active_cart}));
                }else {
                    dispatch(cartError({error: CART_REMOVE_ERROR, cart: CartService.active_cart}));
                }
                return;
            }
            
           //TODO - Switch to Firestore
           removeProductFromCart(email, product, decrement).then( res => {
                CartService.setCart(CartService.parseCart(res));
                window.mlog('removeFromCart: removeProductFromCart: parsed cart', CartService.active_cart);
                dispatch(removeFromCartSuccess(CartService.getCart()));
            }).catch( error => {
                window.mlog('removeFromCart: removeProductFromCart: error', error);
                dispatch(cartError({error: CART_REMOVE_ERROR, cart: CartService.active_cart}));
            })
            
        }
        
    },
    fetchCart: (email) => {
        window.mlog('fetchCart: email -> ', email);
        return (dispatch) => {
            dispatch(fetchCartPending(EMPTY_CART));            
            getUserCart(email).then(res => {
                CartService.setCart(CartService.parseCart(res));
                window.mlog('getUserCart: parsed cart', CartService.active_cart);
                dispatch(fetchCartSuccess(CartService.active_cart));
            })
            .catch(err => {
                window.mlog('fetchCart: getUserCart: error', err);
                dispatch(cartError({error: CART_FETCH_ERROR, cart: CartService.active_cart}));
            })
        }  
    },
    parseCart: (cartString) => {
        try{
            let cart = null; 
            if(typeof cartString === 'string'){
                cart = JSON.parse(cartString);
            }else {
                cart = cartString || {};
            }
            cart.count = cart.count ? Number(cart.count) || 0 : 0;
            cart.total = cart.total ? Number(cart.total) || 0 : 0;
            cart.subTotal = cart.subTotal ? Number(cart.subTotal) || 0 : 0;
            cart.products = cart.products || [];
            cart.products.forEach((item, index) => {
                item.size = item.size ? Number(item.size) || 0 : 0;
                item.quantity = item.quantity ? Number(item.quantity) || 0 : 0;
                item.full_price = item.full_price ? Number(item.full_price) || 0 : 0;
                item.price = item.price ? Number(item.price) || 0 : 0;
                item.full_price = item.full_price === 0 ? item.price : item.full_price;
            });
            return cart;
        }catch(e){
            window.mlog('parseCart Error', e);
            cartError({error: CART_FETCH_ERROR, cart: CartService.active_cart});
        }
        return EMPTY_CART;
    },
    getCart: () => {
        return CartService.active_cart;
    },
    setCart: (cart) => {
        CartService.active_cart = cart || EMPTY_CART;
        CartService.calculateSavings();
        //CartService.writeCartToCookie();
    },
    calculateSavings: () => {
        let that = CartService;
        CartService.active_cart.savings = 0;
        (CartService.active_cart.products || []).forEach((item, index) => {
            that.active_cart.savings += (item.full_price - item.price)*item.quantity;
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
    validateProduct: (product) => {
        if(!product || !product.hasOwnProperty('sku') || !product.hasOwnProperty('name') || !product.hasOwnProperty('price') || !product.hasOwnProperty('quantity') /*|| !product.hasOwnProperty('size')*/){
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