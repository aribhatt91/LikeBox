import {LOGIN_SUCCESS, LOGGED_OUT, LOGIN_ERROR, LOGIN_PENDING} from '../actions/index'

const initialState = {
    loggedIn: false,
    pending: false,
    user: null,
    error: null
}

export function loginStateReducer(state = initialState, action) {
    switch(action.type) {
        case LOGGED_OUT: 
            return initialState;
        case LOGIN_PENDING:
            return {
                ...state,
                pending: true
            }
        case LOGIN_SUCCESS:
            window.loginfo('LOGIN_SUCCESS');
            return {
                ...state,
                loggedIn: true,
                pending: false,
                user: action.user
            }
        case LOGIN_ERROR:
            window.loginfo('LOGIN_ERROR', action);
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const isLoggedIn = state => state.loggedIn;
export const getUser = state => state.user;
export const getLoginError = state => state.error;
export const isLoginPending = state => state.pending;
