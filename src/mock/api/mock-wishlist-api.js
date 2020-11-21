import obj from '../wishlist.json';
import { readFromCookie, writeToCookie } from './../../service/helper';
const CNAME = "wishlist",
getLocalWishList = () => {
    try{
        let wlist = null;
        if(readFromCookie(CNAME)){
            wlist = JSON.parse(readFromCookie(CNAME) || "{}");
        }else {
            wlist = obj || {};
        }
        return wlist.items || [];
    }catch(e){
        return (obj || {}).items || [];
    }
}
export function MockGetWishlist(){
    return (new Promise( (resolve, reject) => {
        let wlist = getLocalWishList();
        writeToCookie(CNAME, wlist);
        setTimeout(() => resolve(wlist), 2000);
    }));
}
export function MockAddToWishlist(product){
    return (new Promise( (resolve, reject) => {
        let wlist = getLocalWishList(), present = false;
        (wlist.items || []).forEach(witem => {
            if(witem.sku === product.sku) {
                present = true;
            }
        })
        if(!present){
            product.saved = (new Date()).toDateString();
            wlist.items = (wlist.items || []).push(product);
        }
        writeToCookie(CNAME, wlist);
        setTimeout(() => resolve(wlist), 2000);
    }));
}
export function MockRemoveFromWishlist(product){
    return (new Promise( (resolve, reject) => {
        let wlist = getLocalWishList(), index = -1;
        (wlist.items || []).forEach((witem, i) => {
            if(witem.sku === product.sku) {
                index = i;
            }
        })
        if(index > -1){
            wlist.items = wlist.items.splice(index, 1);
        }
        writeToCookie(CNAME, wlist);
        setTimeout(() => resolve(wlist), 2000);
    }));
}

export function MockCheckProductInWishlist(product) {
    return (new Promise( (resolve, reject) => {
        let wlist = getLocalWishList(), present = false;
        (wlist.items || []).forEach(witem => {
            if(witem.sku === product.sku) {
                present = true;
            }
        });
        setTimeout(() => resolve(present), 2000);
    }));
}