import {CART_FETCH_SUCCESS, CART_FETCH_PENDING, CART_ERROR,  CART_ADD_SUCCESS, CART_REMOVE_SUCCESS} from '../actions/index';

const initialState = {
    fetch_pending: false,
    add_pending: false,
    remove_pending: false,
    cart: {},
    error: null
}

export function cartReducer(state = initialState, action) {
    switch(action.type) {
        case CART_FETCH_PENDING: 
            return {
                ...state,
                fetch_pending: true
            }
        case CART_FETCH_SUCCESS:
            return {
                ...state,
                fetch_pending: false,
                cart: action.cart,
                error: null
            }
        /* case CART_ADD_PENDING: 
            return {
                ...state,
                add_pending: true
            } */
        case CART_ADD_SUCCESS:
            return {
                ...state,
                add_pending: false,
                cart: action.cart,
                error: null
            }
        /* case CART_ADD_ERROR:
            return {
                ...state,
                add_pending: false,
                error: action.error
            }
        case CART_REMOVE_PENDING: 
            return {
                ...state,
                remove_pending: true
            } */
        case CART_REMOVE_SUCCESS:
            return {
                ...state,
                remove_pending: false,
                cart: action.cart,
                error: null
            }
        /*case CART_REMOVE_ERROR:
            return {
                ...state,
                remove_pending: false,
                error: action.error
            }*/
        case CART_ERROR:
            return {
                ...state,
                remove_pending: false,
                error: action.error,
                cart: action.cart
            }
        default: 
            return state;
    }
}
/*

        case CART_INCR_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CART_INCR_SUCCESS:
            return {
                ...state,
                pending: false,
                cart: action.cart
            }
        case CART_INCR_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case CART_DECR_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CART_DECR_SUCCESS:
            return {
                ...state,
                pending: false,
                cart: action.cart
            }
        case CART_DECR_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
*/