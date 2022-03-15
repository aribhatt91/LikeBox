import {CART_FETCH_SUCCESS, CART_FETCH_PENDING, CART_ERROR, CART_UPDATE_PENDING, CART_ADD_SUCCESS, CART_REMOVE_SUCCESS} from '../actions/index';

const initialState = {
    fetch_pending: false,
    update_pending: false,
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
        case CART_UPDATE_PENDING: 
            return {
                ...state,
                update_pending: true
            }
        case CART_FETCH_SUCCESS:
            return {
                ...initialState,
                cart: action.cart,
                fetch_pending: false
            }
        case CART_ADD_SUCCESS:
            return {
                ...state,
                cart: action.cart,
                update_pending: false,
                error: null
            }
        case CART_REMOVE_SUCCESS:
            return {
                ...state,
                cart: action.cart,
                update_pending: false,
                error: null
            }
        case CART_ERROR:
            return {
                ...state,
                fetch_pending: false,
                update_pending: false,
                error: action.error,
                cart: (action.cart || {})
            }
        default: 
            return state;
    }
}
