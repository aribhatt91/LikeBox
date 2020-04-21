import { combineReducers } from 'redux';
import booksReducer from './reducer_books';
import activeBook from './reducer_active_book';
import shoppingListReducer from './reducer_items';
const rootReducer = combineReducers({
  books: booksReducer,
  activeBook: activeBook
},
{
  shoppingList: shoppingListReducer
});

export default rootReducer;
