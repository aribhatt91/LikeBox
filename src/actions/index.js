import axios from 'axios';

const API_KEY = "";
const ROOT_URL = "";

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
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
export function fetchStateSuccess(items){
  return {
    type: FETCH_SUCCESS,
    items: items
  }
}
export function fetchStateError(error){
  return {
    type: FETCH_ERROR,
    error: error
  }
}

export const FETCH_WEATHER = "FETCH_WEATHER";

export function fetchWeather(city){
  console.log("Selected city", city);
  // return {
  //   type: FETCH_WEATHER
  // }
}
