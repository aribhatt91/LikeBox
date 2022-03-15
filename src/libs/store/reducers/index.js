import { combineReducers } from 'redux';
import { loginStateReducer } from './login_reducer';
import { fetchItemsReducer } from './fetch_state_reducer';
import { cartReducer } from './cart_reducer';

const rootReducer = combineReducers(
  {
    'loginReducer': loginStateReducer,
    'itemsReducer': fetchItemsReducer,
    'cartReducer': cartReducer
  }
);

export default rootReducer;
