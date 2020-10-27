import { fetchStateError, fetchStateSuccess, fetchStatePending } from '../store/actions/index';
import { MockFetchAllProducts, MockFetchProduct } from './../mock/api/mock-products-api';
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
let products_fetched = [];
function _sortBy(_products, key){
    let products = _products || products_fetched;
    if(!products || products.length <= 1 || !key || key.trim() === ""){
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
    }else {
        return products;
    }
}
export const filterProducts = (filter, _products) => {
    let products = _products || products_fetched;
    if(filter && filter.hasOwnProperty('category')){
        if(filter.category === 'sale'){
            products = products.filter((product) => {return product.onSale === 'true' || product.onSale === true});
        }else{
            products = products.filter((product) => {return (product.category.toLowerCase()).split(', ').indexOf(filter.category.toLowerCase()) > -1});
        }
    }
    if(filter && filter.hasOwnProperty('price_range')){
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
    if(filter && filter.hasOwnProperty('discount')) {
        let temp = []; 
            
        filter.discount.forEach((d)=>{
            temp.push(products.filter((product) => {
                return (Number( (product.discount || "") ) === Number(d));
            }))
        })
        products = temp;
    }
    if(filter && filter.hasOwnProperty('brands')) {
        let temp = []; 
            
        filter.brands.forEach((brand)=>{
            temp.push(products.filter((product) => {
                return (product.brand || "").toLowerCase().indexOf(brand.toLowerCase()) > -1;
            }))
        })
        products = temp;
    }
    return products;
}
export const fetchAllProducts = (filter) => {
    return dispatch => {
        dispatch(fetchStatePending());
        MockFetchAllProducts(filter, filterProducts)
        .then((products) => {
            products_fetched = products;
            dispatch(fetchStateSuccess(products));
            //return products;
        })
        .catch(error => {
            dispatch(fetchStateError(error));
        })
    }
}

export const fetchSingleProduct = (sku) => {
    return dispatch => {
        dispatch(fetchStatePending());
        MockFetchProduct(sku)
        .then((products) => {
            
            dispatch(fetchStateSuccess(products));
            //return products;
        })
        .catch(error => {
            dispatch(fetchStateError(error));
        })
    }
}



export const getAllProducts = () => products_fetched