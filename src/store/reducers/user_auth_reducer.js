const initialState = {
    success: false,
    pending: true,
    user: null,
    error: null
}

export function userAuthReducer(state = initialState, action) {
    switch(action.type) {
        case 'USER_AUTH_PENDING': 
            return initialState;
        case 'USER_AUTH_SUCCSESS':
            return {
                ...state,
                pending: false,
                success: true,
                user: action.data
            }
        case 'USER_AUTH_ERROR':
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export const getUser = state => state.user;
