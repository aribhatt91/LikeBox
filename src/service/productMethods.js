import { fetchFirestoreProducts, 
    fetchFirestoreProductsBySkus, 
    fetchFirestoreProduct, 
    fetchProductBrands,
    fetchAvailableCategories } from './api/firestore/product';


/* export const fetchProducts = (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    return fetchAwinProducts(path, page, LIMIT, LAST_NODES, filter);
}

export const fetchProductsBySkus = (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
    return fetchAwinProductsBySkus(skus, page, LIMIT, LAST_DOC, exclusion);
}

export const fetchProduct = (sku) => {
    return fetchAwinProduct(sku);
} */

export const fetchProducts = (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    return fetchFirestoreProducts(path, page, LIMIT, LAST_NODES, filter);
}

export const fetchProductsBySkus = (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
    return fetchFirestoreProductsBySkus(skus, page, LIMIT, LAST_DOC, exclusion)
}

export const fetchProduct = (sku) => {
    return fetchFirestoreProduct(sku);
}

export const getBrands = async (category) => {
    let res = [];
    /* if(sessionStorage.getItem('available_brands')){
        res = JSON.parse(sessionStorage.getItem('available_brands'));
    } */
    return fetchProductBrands(category);   
}

export const getAvailableKeywords = async () => {
    let res = [];
    if(sessionStorage.getItem('available_keys')){
        res = JSON.parse(sessionStorage.getItem('available_keys'));
    }else {
        res = await fetchAvailableCategories();
        sessionStorage.setItem('available_keys', JSON.stringify(res));
    }
    return new Promise(resolve => resolve(res));   
}

const isSearchKeyPresent = async (key) => {
    let available = false;
    try {
        let key = key.toLowerCase(),
        keys = await getAvailableKeywords(), res = [];
        keys = keys || [];

        for (let i = 0; i < keys.length; i++) {
            if(keys[i] === key){
                available = true;
                break;
            }
        }
    }catch(err) {

    }

    return available;
}
