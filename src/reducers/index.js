import { combineReducers } from 'redux';
import booksReducer from './reducer_books';
import activeBook from './reducer_active_book';
import shoppingListReducer from './reducer_items';
import {loginStateReducer} from './login_reducer';
import {fetchItemsReducer} from './fetch_state_reducer';
const rootReducer = combineReducers(
  {loginReducer: loginStateReducer,
  itemsReducer: fetchItemsReducer}
);

export default rootReducer;
