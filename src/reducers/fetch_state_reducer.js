import {FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR} from '../actions/index'

const initialState = {
    pending: false,
    items: [],
    error: null
}

export function fetchStateReducer(state = initialState, action) {
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
                items: action.payload
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

export const getItems = state => state.items;
export const getItemsPending = state => state.pending;
export const getItemsError = state => state.error;
