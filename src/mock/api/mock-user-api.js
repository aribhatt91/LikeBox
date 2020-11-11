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
export const MockGetUser = (token) => {
    return (new Promise( (resolve, reject) => {
        let user = {};
        //writeToCookie(CNAME, user);
        if(token === 'aribhatt'){
            user = getLocalUser();
        }else {
            user = {error: 'user not found'}
        }
        setTimeout(() => resolve(JSON.stringify(user)), 2000);
    }));
}
export const MockAuthenticate = (email, password) => {
    return (new Promise( (resolve, reject) => {
        let token = {access_token: null};
        //writeToCookie(CNAME, user);
        if(email.indexOf('aribhatt') > -1){
            token.access_token = "aribhatt";
        }
        setTimeout(() => resolve(JSON.stringify(token)), 2000);
    }));
}
export const  MockUpdateUser = (obj) => {
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

export const MockSignupUser = (data) => {

}