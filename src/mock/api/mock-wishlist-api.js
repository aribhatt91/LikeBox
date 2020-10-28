import obj from '../wishlist.json';
export function MockGetWishlist(){
    return (new Promise( (resolve, reject) => {
        setTimeout(() => resolve(obj), 2000);
    }));
}