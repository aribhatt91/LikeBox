import products from '../../../mock/products.json';

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
export const fetchProducts = (category, filter) => {
    category = category.toLowerCase() || "";
    return new Promise((resolve, reject) => {
        var data = (products || []).filter((item, index) => {
            return (item.category || "").toLowerCase().indexOf(category) > -1
        })
        /* Filter products */

        /*  */
        setTimeout(() => {
            resolve(data)
        }, 2000);
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