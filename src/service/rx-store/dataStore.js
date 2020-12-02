import { writeToLocalStorage, readFromLocalStorage } from '../helper';

let userObject = null;

export const setUserObject = (obj) => {
    writeToLocalStorage('user', JSON.stringify(obj));
    userObject = obj;
}

export const getUserObject = () => {
    return userObject || readFromLocalStorage('user');
}

export const removeUserobject = () => {
    userObject = null;
    localStorage.removeItem('user');
}