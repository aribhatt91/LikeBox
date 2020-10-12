/* 
name
house_no
addr_line_1
addr_line_2
state
country
zipcode
*/
function addAddress(){

}

function validateField(tag, value){
    
}

function validateAddress(address){
    return address && address.length > 0;
}

export function validateMobileNumber(num){
    return /^[6-9]\d{9}$/.test(num);
}

export function validateName(name){
    return /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(name);
}

export function validatePincode(pincode){
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode);
}

export function validateLocality(locality){
    return /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(locality);
}

export function validateAlpha(city){
    return /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(city);
}