import obj from '../addresses.json';
export function MockGetAddresses(){
    return (new Promise( (resolve, reject) => {
        setTimeout(() => resolve(obj), 2000);
    }));
}