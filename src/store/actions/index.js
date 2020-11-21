export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const CART_ADD_PENDING = 'CART_ADD_PENDING';
export const CART_ADD_SUCCESS = 'CART_ADD_SUCCESS';
export const CART_ADD_ERROR = 'CART_ADD_ERROR';
export const CART_REMOVE_PENDING = 'CART_REMOVE_PENDING';
export const CART_REMOVE_SUCCESS = 'CART_REMOVE_SUCCESS';
export const CART_REMOVE_ERROR = 'CART_REMOVE_ERROR';
export const CART_FETCH_PENDING = 'CART_FETCH_PENDING';
export const CART_FETCH_SUCCESS = 'CART_FETCH_SUCCESS';
export const CART_FETCH_ERROR = 'CART_FETCH_ERROR';
export const CART_ERROR = 'CART_ERROR';

export const CHECKOUT_ADDRESS_SELECTED = 'CHECKOUT_ADDRESS_SELECTED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGGED_OUT = 'LOGGED_OUT';
// action-creators

export function fetchStatePending(){
  return {
    type: FETCH_PENDING
  }
}
export function fetchStateSuccess(_items){
  return {
    type: FETCH_SUCCESS,
    items: _items
  }
}
export function fetchStateError(_error){
  return {
    type: FETCH_ERROR,
    error: _error
  }
}
export function loginSuccess(response){
  return {
    type: LOGIN_SUCCESS,
    user: response
  }
}
export function loginPending(response){
  return {
    type: LOGIN_PENDING
  }
}
export function loginError(response){
  return {
    type: LOGIN_ERROR,
    error: response.error
  }
}

// Cart operations
export function addToCartPending(_cart){
  return {
    type: CART_ADD_PENDING,
    cart: _cart
  }
}
export function addToCartSuccess(cart){
  return {
    type: CART_ADD_SUCCESS,
    cart: cart
  }
}
export function addToCartError(_error){
  return {
    type: CART_ADD_ERROR,
    error: _error
  }
}

export function removeFromCartPending(_cart){
  return {
    type: CART_REMOVE_PENDING,
    cart: _cart
  }
}
export function removeFromCartSuccess(cart){
  return {
    type: CART_REMOVE_SUCCESS,
    cart: cart
  }
}
export function removeFromCartError(_error){
  return {
    type: CART_REMOVE_ERROR,
    error: _error
  }
}

export function fetchCartPending(_cart){
  return {
    type: CART_FETCH_PENDING,
    cart: _cart
  }
}
export function fetchCartSuccess(_cart){
  return {
    type: CART_FETCH_SUCCESS,
    cart: _cart
  }
}
export function fetchCartError(_error){
  return {
    type: CART_FETCH_ERROR,
    error: _error
  }
}
export function cartError(param){
  return {
    type: CART_ERROR,
    error: param.error
  }
}


export function userAuthenticatePending(){
  return {
    type: 'USER_AUTH_PENDING'
  }
}

export function userAuthenticateSuccess(user){
  return {
    type: 'USER_AUTH_SUCCESS',
    data: user
  }
}

export function userAuthenticateError(e){
  return {
    type: 'USER_AUTH_ERROR',
    error: e
  }
}