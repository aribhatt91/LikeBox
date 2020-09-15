import { fetchStateError, fetchStateSuccess, fetchStatePending } from './../store/actions/index';
import PRODUCTS from './products';
function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
/*
filter = {
    category: (MEN, WOMEN, KIDS, TRENDING),
    type: (SNEAKERS, CASUAL, FLIP-FLOP etc),
    sortBy: (),
    brand: (),a
    priceRange: (),
    brand: (),
    search: ()
}
*/
function fetchProduct(sku) {
    return dispatch => {
        dispatch(fetchStatePending());
        simulateNetworkRequest()
        .then(() => {
            var products = PRODUCTS;
            console.log(products, sku);
            // Filter by category
            if(sku){
                products = products.filter((product) => {return (product.sku.toLowerCase() === sku)});
            }
            dispatch(fetchStateSuccess(products));
            return products;
        })
        .catch(error => {
            dispatch(fetchStateError(error));
        })
    }
}

export default fetchProduct;