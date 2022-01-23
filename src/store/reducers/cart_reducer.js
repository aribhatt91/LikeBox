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
                ...initialState,
                cart: action.cart
            }
        case CART_ADD_SUCCESS:
            return {
                ...initialState,
                cart: action.cart
            }
        case CART_REMOVE_SUCCESS:
            return {
                ...initialState,
                cart: action.cart
            }
        case CART_ERROR:
            return {
                ...initialState,
                error: action.error,
                cart: action.cart
            }
        default: 
            return state;
    }
}
