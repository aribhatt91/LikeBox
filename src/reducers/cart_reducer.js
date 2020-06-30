import {FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR} from '../actions/index'

const initialState = {
    pending: false,
    items: [],
    error: null
}

export function fetchCartReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                pending: false,
                items: action.items
            }
        case FETCH_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
