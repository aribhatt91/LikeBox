import { db } from './../firebase';
import { getUser, updateUserByEmail } from './user';

/* {
    housenum,
    street,
    postcode,
    name,
    city
} */

const collection = db.collection('users');

const validateAddressFields = (address={}) => {
    if(!address || !address.name || !address.postcode || !address.street || !address.housenum || !address.city){
        return false;
    }
    return true;
}
export const getUserAddressBook = async (email) => {
    let addressBook = [];
    try {
        let user = await getUser(email);
        //console.log(querySnapshot);
        if(user){
            addressBook = user.addresses || [];
        }else {
            throw new Error('User not found');
        }
    }catch(err){
        console.error('getUserAddresses:Error ', err);
    }
    return new Promise((resolve, reject) => resolve(addressBook));
}

export const addNewAddress = async (email="", address={}) => {
    let addressBook = [], isPresent = false;
    try {
        addressBook = await getUserAddressBook(email);
        addressBook = addressBook || [];
        if(!validateAddressFields(address)){
            throw new Error('Address not valid');
        }
        addressBook.forEach((item, index) => {
            if(!isPresent){
                isPresent = (address.name || "").toLowerCase() === (item.name || "").toLowerCase()
                && (address.postcode || "").toLowerCase() === (item.postcode || "").toLowerCase()
                && (address.street || "").toLowerCase() === (item.street || "").toLowerCase()
                && (address.housenum || "").toLowerCase() === (item.housenum || "").toLowerCase();
            }
        });

        if(isPresent){
            throw new Error('Address is already present');
        }else {
            address.id = (addressBook.length + 1);
            addressBook.push(address);
            let res = await updateUserByEmail(email, {'addresses': addressBook});
            console.log(res);
        }
        
    }catch(err){
        console.log('AddAddressError:', err);
    }
    return new Promise((resolve, reject) => resolve(addressBook));
}

export const updateAddress = async (email="", address) => {
    let addressBook = [], i = -1;
    try {
        addressBook = await getUserAddressBook(email);
        addressBook = addressBook || [];
        if(!validateAddressFields(address)){
            throw new Error('Address not valid');
        }
        addressBook.forEach((item, index) => {
            if((address.id || "").toLowerCase() === (item.id || "").toLowerCase()){
                i = index;
            }
        });
        if(i === -1){
            throw new Error('Address is not present');
        }else {
            addressBook[i] = address;
            let res = await updateUserByEmail(email, {'addresses': addressBook});
            console.log(res);
        }
        
    }catch(err){
        console.log('UpdateAddressError:', err);
    }
    return new Promise((resolve, reject) => resolve(addressBook));
}

export const removeAddressById = async (email, addressId) => {
    let addressBook = [], i = -1;
    try {
        addressBook = await getUserAddressBook(email);
        addressBook = addressBook || [];
        if(!addressId){
            throw new Error('Address not valid');
        }
        addressBook.forEach((item, index) => {
            if(addressId === (item.id || "").toLowerCase()){
                i = index;
            }
        });
        if(i === -1){
            throw new Error('Address is not present');
        }else {
            addressBook.splice(i,1)
            let res = await updateUserByEmail(email, {'addresses': addressBook});
            console.log(res);
        }
        
    }catch(err){
        console.log('UpdateAddressError:', err);
    }
    return new Promise((resolve, reject) => resolve(addressBook));
}


