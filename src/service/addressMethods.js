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

const ERROR_TEXT = {
    name: 'Please fill out this field',
    mobile: 'Please enter 10-digit mobile number',
    state: 'Please select a state',
    city: 'Please enter a city/town/district',
    locality: 'Please fill out this field',
    address: 'Please enter street name and house number'
},
REQUIRED = ['name', 'mobile', 'pincode', 'locality', 'city', 'state', 'address'];

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
        (item === 'locality' && !validateLocality(inputObj[item])) || 
        (item === 'address' && !validateAddress(inputObj[item])) || 
        (item === 'city' && !validateEmpty(inputObj[item])) || 
        (item === 'state' && !validateEmpty(inputObj[item]))){
            errorObj[item] = ERROR_TEXT[item];
        }
    });
    res.errors = errorObj;
    return res;
}

const requiredFieldsFilled = (inputObj) => {
    let res = [],
    keys = Object.keys((inputObj || {}));
    res = REQUIRED.filter( item => {
        return keys.indexOf(item) === -1;
    })
    return {'required': res}
},
validateAddress = (address) => {
    return address && address.trim().length > 0;
},
validateMobileNumber = (num) => {
    return /^[6-9]\d{9}$/.test(num);
},
validatePincode = (pincode) => {
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode);
},
validateEmpty = (val) => {
    return val && val.trim().length > 0;
},
validateLocality = (locality) => {
    return locality && locality.trim() !== "";
},
validateAlpha = (str) => {
    return validateEmpty(str) && /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(str);
}

