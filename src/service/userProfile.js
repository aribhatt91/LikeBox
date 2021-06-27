
import { addUser, isFirstLoad, updateUserByEmail, setUserSizing, getUserSizing, getUser, getUserLikeBox, getUserStyle, updateUserStyle } from './api/firestore/user';

export const addUserProfile = (user) => {
    return addUser(user);
}

export const fetchLikeBox = (email) => {
    return getUserLikeBox(email);
}

export const updateLikeBox = (email, likebox) => {
    return updateUserByEmail(email, likebox);
}
export const fetchUserProfile = async (email) => {
    //window.mlog('fetchUserProfile:getUser: request', email);
    let res = await getUser(email);
    //window.mlog('fetchUserProfile:getUser: response', res);
    return new Promise(resolve => resolve(res));
}

export const updateUserProfile = (email, update) => {
    return updateUserByEmail(email, update);
}

export const isFirstSession = async (email) => {
    let firstSession = localStorage.getItem('firstSession') !== 'false';
    if(firstSession){
        let firstSession = await isFirstLoad(email);
        localStorage.setItem('firstSession', firstSession);
    }
    window.mlog('isFirstSession', firstSession);
    return new Promise(resolve => resolve(firstSession));
}

export const setUserSizes = (email, sizes) => {
    return setUserSizing(email, sizes);
}

export const getUserSizes = (email) => {
    return getUserSizing(email);
}

export const updateUserStylePref = (email, sizes) => {
    return updateUserStyle(email, sizes);
}

export const getUserStylePref = (email) => {
    return getUserStyle(email);
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