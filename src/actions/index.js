import axios from 'axios';

const API_KEY = "";
const ROOT_URL = "";

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGGED_OUT = 'LOGGED_OUT';
// action-creators
export function selectBook(book){
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}

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
    type: LOGIN_PENDING,
    error: response.error
  }
}
export const fetchUser = () => {
  return (dispatch) => {
    axios.get('')
      .then(response => {
        
      })
      .catch(error => {
        console.error(error.message);
      })
  }
}
