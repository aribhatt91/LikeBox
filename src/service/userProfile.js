
import { addUser, isFirstLoad, updateUserByEmail } from './api/firestore/user';
import { getUser } from './../store/reducers/login_reducer';

export const addUserProfile = (user) => {
    return addUser(user);
}

export const fetchUserProfile = async (email) => {
    /* let res = {};
    try {
        let user = await getUser(email);
        
        res = {
            name: (user.name || {}),
            mobile: (user.mobile || ""),
            email: user.email,
            gender: (user.gender || "")
        }
        console.log('fetchUserProfile:getUser: res', res);
    }catch(err){

    }
    return new Promise(resolve => resolve(res)) */
    let res = getUser(email);
    console.log('fetchUserProfile:getUser: res', res);
    return res;
}

export const updateUserProfile = (email, update) => {
    return updateUserByEmail(email, update);
}

export const isFirstSession = async (email) => {
    let res = true;
    if(!localStorage.getItem('notFirstSession')){
        res = await isFirstLoad(email);
        localStorage.setItem('notFirstSession', res);
    }else {
        res = localStorage.getItem('notFirstSession') === 'true'
    }
    return new Promise(resolve => resolve(res));
}

 /* let user = {
     email,
     name: {
         fname,
         lname
     },
     mobile,
     addresses: [{
         housenum,
         street,
         city,
         zipcode,
         country
     }],
     cart : {
         items:[],
         total,
         date,
         size
     },
     wishlist,
     orders,
     payments,
     sizing: {
         shoesize,
         neck,
         chest,
         height,
         waist
     }
 } */