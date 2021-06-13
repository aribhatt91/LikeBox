import { 
    fetchFirestoreProducts, 
    fetchFirestoreProductsBySkus, 
    fetchFirestoreProduct, 
    fetchProductBrands,
    fetchAvailableCategories } from './api/firestore/product';

export const fetchProducts = async (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    let categories = [],
    paths = path.split('-');
    try {
        let availableKeywords = await getAvailableKeywords();
        availableKeywords = availableKeywords || [];
        let len = availableKeywords.length;
        for (let j = 0; j < paths.length; j++) {
            for (let i = 0; i < len; i++) {
                if(availableKeywords[i].toLowerCase().indexOf(paths[j].toLowerCase()) === 0){
                    categories.push(availableKeywords[i]);
                }
            }
        }
        
    }catch(err){
        console.error('getBrands:error: ', err);
    }
    return fetchFirestoreProducts(categories, page, LIMIT, LAST_NODES, filter);
}

export const fetchProductsBySkus = (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
    return fetchFirestoreProductsBySkus(skus, page, LIMIT, LAST_DOC, exclusion)
}

export const fetchProduct = (sku) => {
    return fetchFirestoreProduct(sku);
}

export const getBrands = async (slug) => {
    console.log('getBrands', slug);
    let paths = slug.split('-');
    let categories = [];
    try {
        let availableKeywords = await getAvailableKeywords();
        availableKeywords = availableKeywords || [];
        let len = availableKeywords.length;
        for (let j = 0; j < paths.length; j++) {
            for (let i = 0; i < len; i++) {
                if(availableKeywords[i].toLowerCase().indexOf(paths[j].toLowerCase()) === 0){
                    categories.push(availableKeywords[i]);
                }
            }
        }
        
    }catch(err){
        console.error('getBrands:error: ', err);
    }
    return fetchProductBrands(categories);   
}

export const getAvailableKeywords = async () => {
    let res = [];
    if(window.sessionStorage && sessionStorage.getItem('available_keys')){
        
        res = JSON.parse(sessionStorage.getItem('available_keys'));
        //window.mlog('Fetching from storage', res);
    }else {
        res = await fetchAvailableCategories();
        sessionStorage.setItem('available_keys', JSON.stringify(res));
    }
    return new Promise(resolve => resolve(res));   
}

const isSearchKeyPresent = async (query) => {
    let available = false, res = new Set();
    try {
        let search = query.toLowerCase().split('-'),
        avkeys = await getAvailableKeywords();
        
        avkeys = avkeys || [];

        for (let i = 0; i < avkeys.length; i++) {
            if(search.indexOf(avkeys[i].toLowerCase()) > -1){
                available = true;
                res.add(avkeys[i]);
                if(res.size() === search.length){
                    break;
                }
            }
        }
    }catch(err) {

    }

    return new Promise(resolve => resolve(Array.from(res)));
}

const getNearestMatches = async (query) => {

}
