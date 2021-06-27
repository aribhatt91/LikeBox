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
import rootReducer from './store/reducers/index';
import thunk from 'redux-thunk';
import logger from './store/middleware/logger';
import { AuthProvider, AuthContext } from './store/contexts/AuthContext';
import NotificationProvider from './store/contexts/NotificationProvider';
// eslint-disable-next-line
//import ReduxPromise from 'redux-promise';

const middlewares = [logger, thunk];
const appStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middlewares)) //applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={appStore}>
        <AuthProvider>
            <NotificationProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </NotificationProvider>
        </AuthProvider>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();