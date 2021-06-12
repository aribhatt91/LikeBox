import { getUserWishList, addToWishList, removeFromWishList, isItemInWishList } from './api/firestore/wishlist';
import { fetchProductsBySkus } from './productMethods';


export const itemInWishList = (email, sku) => {
    return isItemInWishList(email, sku);
}
export const addItemToWishList = async (email, sku, product) => {
    /* let items = [], ids = [], data = null;
    try{
        data = await addToWishList(email, sku);
        //ids = ids;
        if(data.type === 'success'){
            ids = (data.items || []).map(item => item.sku);
        }
        window.mlog('addItemToWishList ->', ids);

    }catch(err){
        window.mlog('addItemToWishList:error', err);
    }
    
    items = await fetchProductsByIds(ids);
    window.mlog(items);
    
    return new Promise(resolve => resolve(items)); */
    return addToWishList(email, sku, product);
}
export const removeItemFromWishList = async (email, sku) => {
    /* let items = [], ids = [], data = null;
    try{
        data = await removeFromWishList(email, sku);
        if(data.type === 'success'){
            ids = (data.items || []).map(item => item.sku);
        }else {
            return new Promise((resolve, reject) => reject(data));
        }
        //ids = ids || [];
    }catch(err){
        window.mlog('fetchWishList:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    items = await fetchProductsByIds(ids);
    if(data){
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(items[index]){
                items[index].date_added = element.date_added;
            }
            
        }
        data.items = items;
    }
    window.mlog(items);
    return new Promise(resolve => resolve(data)); */
    return removeFromWishList(email, sku);
}

export const fetchWishList = async (email) => {
    let items = [], ids = [], data = null;
    try{
        data = await getUserWishList(email);
        if(data.type === 'success'){
            ids = (data.items || []).map(item => item.sku);
        }
        //ids = ids || [];
    }catch(err){
        window.mlog('fetchWishList:error', err);
    }
    items = await fetchProductsBySkus(ids);
    if(data){
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(items[index]){
                items[index].date_added = element.date_added;
            }
            
        }
    }
    window.mlog('fetchWishList', items);
    
    //return MockGetWishlist();
    return new Promise(resolve => resolve(items));
}
