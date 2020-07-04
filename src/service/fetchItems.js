import { fetchStateError, fetchStateSuccess, fetchStatePending } from './../actions/index';
import PRODUCTS from './products';
import simulateNetworkRequest from './simulateNetworkRequest';
/*
filter = {
    category: (MEN, WOMEN, KIDS, TRENDING),
    type: (SNEAKERS, CASUAL, FLIP-FLOP etc),
    sort_by: string,
    brands: [],
    price_range: [],
    discounts: [],
    search: ()
}
*/
function _sortBy(products, key){
    //return products.sort()
}
function fetchItems(filter) {
    return dispatch => {
        dispatch(fetchStatePending());
        simulateNetworkRequest()
        .then(() => {
            var products = PRODUCTS;
            console.log(products, filter);
            // Filter by category
            if(filter && filter.category){
                if(filter.category === 'sale'){
                    products = products.filter((product) => {return product.onSale === 'true'});
                }else{
                    products = products.filter((product) => {return (product.category.toLowerCase()).split(', ').indexOf(filter.category.toLowerCase()) > -1});
                }
            }
            if(filter && filter.price_range){
                temp = []; 
                    
                filter.price_range.forEach((pair)=>{
                    temp.push(products.filter((product) => {
                            var res = false;
                        if(pair.min){
                            res = Number(product.price) >= Number(min)
                        }
                        if(pair.min){
                            res = Number(product.price) <= Number(min)
                        }
                        return res;
                    }));
                })
                products = temp;
            }
            if(filter && filter.discount) {
                temp = []; 
                    
                filter.discount.forEach((d)=>{
                    temp.push(products.filter((product) => {
                        return (Number( (product.discount || "") ) === Number(d));
                    }))
                })
                products = temp;
            }
            if(filter && filter.brands) {
                temp = []; 
                    
                filter.brands.forEach((brand)=>{
                    temp.push(products.filter((product) => {
                        return (product.brand || "").toLowerCase().indexOf(brand.toLowerCase()) > -1;
                    }))
                })
                products = temp;
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