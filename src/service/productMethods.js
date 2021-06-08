import { fetchFirestoreProducts, 
    fetchFirestoreProductsBySkus, 
    fetchFirestoreProduct, 
    fetchProductBrands } from './api/firestore/product';


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

export const getBrands = (category) => {
    return fetchProductBrands(category);   
}