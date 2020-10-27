import PRODUCTS from '../products';

export function MockFetchAllProducts(filter, filterFn, sortFn, sort_by){
    return (new Promise( (resolve, reject) => {
        var products = PRODUCTS;
        if(filter && typeof filterFn === 'function'){
           products = filterFn(filter, products);
        }
        if(sort_by && typeof sortFn === 'function'){
            products = sortFn(products, sort_by);
        }
        setTimeout(() => resolve(products), 2000);
    }));
}
export function MockFetchProduct(sku){
    return (new Promise( (resolve, reject) => {
        var products = PRODUCTS;
        console.log(products, sku);
        if(sku){
            products = products.filter((product) => {return (product.sku.toLowerCase() === sku.toLowerCase())});
        }
        setTimeout(() => resolve(products), 2000);
    }));
}