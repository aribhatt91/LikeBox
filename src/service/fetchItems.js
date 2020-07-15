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
    if(!products || products.length <= 1){
        return products;
    }
    //return products.sort()
    if(key === 'price-asc'){
        return products.sort(function(a,b){
            return Number(a.price) - Number(b.price)
        })
    }else if(key === 'price-desc'){
        return products.sort(function(a,b){
            return Number(b.price) - Number(a.price)
        })
    }else if(key === 'popularity'){
        return products.sort(function(a,b){
            return Number(b.ratings) - Number(a.ratings)
        })
    }
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
                let temp = []; 
                    
                filter.price_range.forEach((pair)=>{
                    temp.push(products.filter((product) => {
                            var res = false;
                        if(pair.min){
                            res = Number(product.price) >= Number(pair.min)
                        }
                        if(pair.max){
                            res = Number(product.price) <= Number(pair.max)
                        }
                        return res;
                    }));
                })
                products = temp;
            }
            if(filter && filter.discount) {
                let temp = []; 
                    
                filter.discount.forEach((d)=>{
                    temp.push(products.filter((product) => {
                        return (Number( (product.discount || "") ) === Number(d));
                    }))
                })
                products = temp;
            }
            if(filter && filter.brands) {
                let temp = []; 
                    
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