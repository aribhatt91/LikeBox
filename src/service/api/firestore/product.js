import { max, reject } from 'lodash';
import products from '../../../mock/products.json';
import { CATEGORY_URL_MAPPING } from '../../constants';

/* 
Filter Schema
{
    brand,
    category,
    sub_category,
    price: {
        min,
        max
    },
    size,//optional
    colour,//optional
    gender,
    sort_by
} */
export const fetchProducts = (path, filter) => {
    console.log('Product category ->', path);
    path = path.toLowerCase() || "";
    let obj = CATEGORY_URL_MAPPING[path], category = null;
    if(obj){
        category = !obj.subcategory ? obj.category : obj.subcategory;
        console.log('Product category ->', obj, category);
        return new Promise((resolve, reject) => {
            var data = (products || []).filter((item, index) => {
                let comparator = item.sub_category;
                if(!comparator || comparator === "-" || category === "shoes" || category === "clothes" || category === "accessories"){
                    comparator = item.category
                }
                comparator = comparator.toLowerCase();
                let shirt = category === 'shirt' || category === 'shirts';
                shirt = !shirt || (shirt && comparator.indexOf('sweat') === -1 && comparator.indexOf('polo') === -1);
                return shirt && (comparator || "").toLowerCase().indexOf(category) > -1
            })
            /* Filter products */
    
            /*  */
            setTimeout(() => {
                resolve(data)
            }, 2000);
        })
    }else {
        return new Promise(resolve => resolve([]));
    }
    
}

export const fetchProductsByPage = (page, max) => {
    return new Promise((resolve, reject) => {
        if(page >= 0 && max > 0) {
            setTimeout(() => {
                resolve(products.slice(page*max, page*max + max))
            }, 1000);
        }else {
            reject([]);
        }
    })
}
export const fetchProductsByIds = (productIds=[]) => {
    return new Promise((resolve, reject) => {
        var data = (products || []).filter((item, index) => {
            let isPresent = false;
            productIds.forEach(p => {
                if(p === item.sku){
                    isPresent = true;
                }
            })
            return isPresent;
        })
        console.log(productIds, data);
        resolve(data);
    })
}

export const fetchProduct = (sku) => {
    sku = (sku || "").toLowerCase();
    return new Promise((resolve, reject) => {
        var data = (products || []).filter((item, index) => {
            return (item.sku || "") === sku
        })
        setTimeout(() => {
            resolve(...data)
        }, 2000);
    })
}