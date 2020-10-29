import obj from '../user.json';
import { readFromCookie, writeToCookie } from './../../service/helper';
const CNAME = "user",
getLocalUser = () => {
    try{
        let user = JSON.parse(readFromCookie(CNAME) || "{}");
        return user
    }catch(e){
        return obj || {};
    }
}
export function MockGetUser(){
    return (new Promise( (resolve, reject) => {
        let user = getLocalUser();
        writeToCookie(CNAME, user);
        setTimeout(() => resolve(user), 2000);
    }));
}
export function MockUpdateUser(obj){
    return (new Promise( (resolve, reject) => {
        let user = getLocalUser(), present = false;
        Object.keys((obj || {})).forEach(key => {
            if(key === 'addrId'){
                if(obj.addAdr){
                    if(user['addressIds'].indexOf(obj[key]) === -1){
                        user['addressIds'] = user['addressIds'].unshift(obj[key]);
                    }
                }else if(obj.removeAddr){
                    user['addressIds'] = user['addressIds'].splice(user['addressIds'].indexOf(obj[key]), 1);
                }
            }else {
                user[key] = obj[key];
            }
        })
        writeToCookie(CNAME, user);
        setTimeout(() => resolve(user), 2000);
    }));
}