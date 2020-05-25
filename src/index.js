import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logger from './service/logger_middleware';
// eslint-disable-next-line
import ReduxPromise from 'redux-promise';
const initialState = {
    loggedIn: false,
    user: null,
    pending: false,
    error: null
}
const middlewares = [logger, thunk];
const appStore = createStore(rootReducer, applyMiddleware(...middlewares)) //applyMiddleware(ReduxPromise)(createStore);
console.log('appstore -> ', appStore.getState())
ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();