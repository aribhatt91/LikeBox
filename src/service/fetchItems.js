import { fetchStateError, fetchStateSuccess, fetchStatePending } from './../actions/index';
import PRODUCTS from './products';
function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
/*
filter = {
    category: (MEN, WOMEN, KIDS),
    type: (SNEAKERS, CASUAL, FLIP-FLOP etc),
    sortBy: (),
    brand: (),
    priceRange: (),
    brand: (),
    search: ()
}
*/
function fetchItems(filter) {
    return dispatch => {
        dispatch(fetchStatePending());
        simulateNetworkRequest()
        .then(() => {
            var products = PRODUCTS;
            console.log(products);
            if(filter && filter.category){
                products = products.filter((product) => {product.category.split(',').indexOf(filter.category) > -1})
            }
            dispatch(fetchStateSuccess(products));
            return products;
        })
        .catch(error => {
            dispatch(fetchStateError(error));
        })
    }
}

export default fetchItems;