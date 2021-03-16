import { db } from './../firebase';
import { fetchUser, updateUserByEmail } from './user';

/* {
    housenumber,
    street,
    pincode,
    name,
    contact
} */

const collection = db.collection('users');

export const getUserAddressBook = async (email) => {
    let addressBook = [];
    try {
        let querySnapshot = await fetchUser(email);
        console.log(querySnapshot);
        if(querySnapshot.size === 1){
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let data = doc.data() || {};
                addressBook = data.addresses || [];
            });
        }else {
            throw new Error('User not found');
        }
    }catch(err){
        console.error('getUserAddresses:Error ', err);
    }
    return new Promise((resolve, reject) => resolve(addressBook));
}

export const addNewAddress = async (email, address) => {
    let addressBook = [];
    try {
        addressBook = await getUserAddressBook(email);
        
    }catch(err){

    }
    return new Promise((resolve, reject) => resolve(addressBook));
}

export const updateAddress = (address) => {}

export const removeAddress = (address) => {}


