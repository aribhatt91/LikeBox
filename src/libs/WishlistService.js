import { getUserWishList, addToWishList, removeFromWishList, isItemInWishList } from './api/firestore/wishlist';

export const itemInWishList = (email, sku) => {
    return isItemInWishList(email, sku);
}
export const addItemToWishList = async (email, sku, product) => {
    return addToWishList(email, sku, product);
}
export const removeItemFromWishList = async (email, sku) => {
    return removeFromWishList(email, sku);
}

export const fetchWishList = async (email) => {
    return getUserWishList(email);
}
