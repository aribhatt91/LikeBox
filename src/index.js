import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';
// eslint-disable-next-line
import ReduxPromise from 'redux-promise';
const createStoreWithMiddleware = createStore(rootReducer) //applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();