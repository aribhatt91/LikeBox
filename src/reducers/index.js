import { combineReducers } from 'redux';
import { loginStateReducer } from './login_reducer';
import { fetchItemsReducer } from './fetch_state_reducer';
import { fetchCartReducer } from './cart_reducer';

const rootReducer = combineReducers(
  {loginReducer: loginStateReducer,
  itemsReducer: fetchItemsReducer,
  cartReducer: fetchCartReducer}
);

export default rootReducer;
