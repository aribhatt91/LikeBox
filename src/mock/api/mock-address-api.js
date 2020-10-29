import obj from '../addresses.json';
import { readFromCookie, writeToCookie } from './../../service/helper';
import { MockUdateUser } from './mock-user-api';
const CNAME = "addresses",
getLocalAddresses = () => {
    try{
        let ads = JSON.parse(readFromCookie(CNAME) || "{}");
        return ads
    }catch(e){
        return obj || {};
    }
}
export function MockGetAddresses(){
    return (new Promise( (resolve, reject) => {
        let ads = getLocalUser();
        writeToCookie(CNAME, ads);
        setTimeout(() => resolve(ads), 2000);
    }));
}
export function MockUpdateAddress(id,obj){
    return (new Promise( (resolve, reject) => {
        let add_obj = getLocalAddresses(), addrs = add_obj.addresses;
        
        for (let index = 0; index < addrs.length; index++) {
            if(addrs[index].id === id){
                (Object.keys(obj) || []).forEach( k => {
                    addrs[index][k] = obj[k];
                })
                break;
            }
        }
        add_obj.addresses = addrs;
        writeToCookie(CNAME, add_obj);
        setTimeout(() => resolve(add_obj), 2000);
    }));
}
export function MockDeleteAddress(id){
    return (new Promise( (resolve, reject) => {
        let add_obj = getLocalAddresses(), addrs = add_obj.addresses;
        
        for (let index = 0; index < addrs.length; index++) {
            if(addrs[index].id === id){
                addrs.splice(index, 1);
                break;
            }
        }
        add_obj.addresses = addrs;
        writeToCookie(CNAME, add_obj);
        MockUdateUser({'addrId': id, 'removeAdr': true}).then( res => {
            resolve(add_obj)
        });
    }));
}
export function MockAddAddress(id, obj){
    return (new Promise( (resolve, reject) => {
        let add_obj = getLocalAddresses(), addrs = add_obj.addresses;
        obj.id = "ad0000" + (addrs.length + 1);
        addrs.unshift(obj);
        add_obj.addresses = addrs;
        writeToCookie(CNAME, user);
        MockUdateUser({'addrId': obj.id, 'addAdr': true}).then( res => {
            resolve(add_obj)
        });
    }));
}