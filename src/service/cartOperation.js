import { addToCartSuccess, addToCartPending, removeFromCartPending, removeFromCartSuccess, fetchCartPending, fetchCartSuccess, cartError } from '../store/actions/index';
import { MockGetCart, MockAddItemToCart, MockRemoveItemFromCart } from './../mock/api/mock-cart-api';

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
                console.log('addToCart: ', INVALID_PRODUCT, product);
                //DISPATCH ERROR
                dispatch(cartError({error: CART_ADD_ERROR, cart: CartService.active_cart}));
                return;
            }
            
            MockAddItemToCart(product).then( res => {
                CartService.setCart(CartService.parseCart(res));
                console.log('addToCart: MockGetCart: parsed cart', CartService.active_cart);
                dispatch(addToCartSuccess(CartService.getCart()));
            }).catch( error => {
                console.log('addToCart: MockGetCart: error', error);
                dispatch(cartError({error: CART_ADD_ERROR, cart: CartService.active_cart}));
            });
        }
        
    },
    removeFromCart: (product, decrement) => {
        return (dispatch) => {
            dispatch(removeFromCartPending(CartService.active_cart));
            if(!CartService.validateProduct(product)){
                console.log('removeFromCart: ', INVALID_PRODUCT, product);
                //DISPATCH ERROR
                if(decrement){
                    dispatch(cartError({error: CART_DECR_ERROR, cart: CartService.active_cart}));
                }else {
                    dispatch(cartError({error: CART_REMOVE_ERROR, cart: CartService.active_cart}));
                }
                return;
            }
            
           
            MockRemoveItemFromCart(product, decrement).then( res => {
                CartService.setCart(CartService.parseCart(res));
                console.log('removeFromCart: MockGetCart: parsed cart', CartService.active_cart);
                dispatch(removeFromCartSuccess(CartService.getCart()));
            }).catch( error => {
                console.log('removeFromCart: MockGetCart: error', error);
                dispatch(cartError({error: CART_REMOVE_ERROR, cart: CartService.active_cart}));
            })
            
        }
        
    },
    fetchCart: () => {
        return (dispatch) => {
            dispatch(fetchCartPending(EMPTY_CART));

            MockGetCart().then( res => {
                CartService.setCart(CartService.parseCart(res));
                console.log('MockGetCart: parsed cart', CartService.active_cart);
                dispatch(fetchCartSuccess(CartService.active_cart));
            }).catch( error => {
                console.log('fetchCart: MockGetCart: error', error);
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
        //CartService.writeCartToCookie();
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