import { fetchStateError, fetchStateSuccess, fetchStatePending } from './../actions/index';
import PRODUCTS from './products';
function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
function fetchItems() {
    return dispatch => {
        dispatch(fetchStatePending());
        simulateNetworkRequest()
        .then(() => {
            dispatch(fetchStateSuccess(res.products));
            return res.products;
        })
        .catch(error => {
            dispatch(fetchStateError(error));
        })
    }
}

export default fetchItems;