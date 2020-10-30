export const validateAlpha = (str) => {
    return validateEmpty(str) && /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(str);
}
export const validateAlphaNumeric = (str) => {
    return validateEmpty(str) && /^[a-zA-Z0-9]*$/.test(str);
}
export const validateEmpty = (val) => {
    return val && val.trim().length > 0;
}
export const validateMobileNumber = (num) => {
    return /^[6-9]\d{9}$/.test(num);
}
export const validatePincode = (pincode) => {
    return /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode);
}
export const validateEmail = email => {
    return email && /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
}
export const validatePassword = pword => {
    return pword && pword.trim().length >=8;
}