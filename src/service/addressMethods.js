/* 
name
house_no
addr_line_1
addr_line_2
state
country
zipcode
*/
import { addNewAddress, updateAddress, getUserAddressBook , removeAddressById } from './api/firestore/address';

export const ERROR_TEXT = {
    name: 'Please fill out this field',
    mobile: 'Please enter 10-digit mobile number',
    state: 'Please select a state',
    city: 'Please enter a city/town/district',
    locality: 'Please fill out this field',
    address: 'Please enter street name and house number'
},
REQUIRED = ['name', 'mobile', 'pincode', 'locality', 'city', 'state', 'address'];


export const fetchAddresses = (email) => {
    //return MockGetAddresses()
    return getUserAddressBook(email);
}

export const addAddress = (email, inputObj) => {
    return addNewAddress(email, inputObj)
}
export const updateExistingAddress = (email, inputObj) => {
    return updateAddress(email, inputObj)
}
export const deleteAddress = (email, addressId) => {
    return removeAddressById(email, addressId);
    //return null;
}

/* 
TODO 
*/
export const checkDeliveryAvailability = (pincode) => {
    return true;
}
export const validateAddressForm = (inputObj) => {
    return true
}
