/* 
name
house_no
addr_line_1
addr_line_2
state
country
zipcode
*/
import simulateNetworkRequest from './simulateNetworkRequest';
import { validateAlpha, validateAlphaNumeric, validateMobileNumber, validatePincode, validateEmpty } from './validation';
export const ERROR_TEXT = {
    name: 'Please fill out this field',
    mobile: 'Please enter 10-digit mobile number',
    state: 'Please select a state',
    city: 'Please enter a city/town/district',
    locality: 'Please fill out this field',
    address: 'Please enter street name and house number'
},
REQUIRED = ['name', 'mobile', 'pincode', 'locality', 'city', 'state', 'address'];

const requiredFieldsFilled = (inputObj) => {
    let res = [],
    keys = Object.keys((inputObj || {}));
    res = REQUIRED.filter( item => {
        return keys.indexOf(item) === -1;
    })
    return {'required': res}
}

export const addAddress = (inputObj) => {

}
export const updateAddress = (inputObj) => {

}
export const deleteAddress = (inputObj) => {

}

export const checkDeliveryAvailability = (pincode) => {
    if(validatePincode(pincode)){
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({valid: true, msg: 'We deliver at this location!'}), 2000)
          });
    }else {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({valid: false, msg: 'Please enter a valid pincode'}), 500)
          });
    }
}
export const validateAddressForm = (inputObj) => {
    let errorObj = {},
    /* inputObj = inputObj || {},  */keys = Object.keys(inputObj),
    res = requiredFieldsFilled(inputObj);

    keys.forEach((item) => {
        if((item === 'name' && !validateAlpha(inputObj[item])) || 
        (item === 'mobile' && !validateMobileNumber(inputObj[item])) || 
        (item === 'pincode' && !validatePincode(inputObj[item])) || 
        (item === 'locality' && !validateAlphaNumeric(inputObj[item])) || 
        (item === 'address' && !validateAlphaNumeric(inputObj[item])) || 
        (item === 'city' && !validateEmpty(inputObj[item])) || 
        (item === 'state' && !validateEmpty(inputObj[item]))){
            errorObj[item] = ERROR_TEXT[item];
        }
    });
    res.errors = errorObj;
    return res;
}
