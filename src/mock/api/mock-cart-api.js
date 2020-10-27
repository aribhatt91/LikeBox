import CART from '../cart.json';
export function MockGetCart(){
    return (new Promise( (resolve, reject) => {
        setTimeout(() => resolve(JSON.stringify(CART)), 2000);
    }));
}