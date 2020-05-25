import { loginError, loginSuccess, loginPending } from './../actions/index';
import { useState } from 'react';

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
function validateUserInput(data){
    console.log('validating creds', data);
    var email = data.email, password = data.password;
    if(email === 'aribhatt' || email === 'aribhatt@adobe.com'){
        console.log('validated ', data);
        return {userId: 'aribhatt', userName: 'Aritra'}
    }
    return null;
}
export function getAuthToken(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
        return { 'Authorization': 'Bearer ' + user.userId };
    } else {
        return null;
    }
}
export function signin(data) {
    return dispatch => {
        dispatch(loginPending());
        simulateNetworkRequest()
        .then((res) => {
            console.log('response received -> ', res);
            var user = validateUserInput(data);
            if(user){
                console.log('dispatch success ', user);
                dispatch(loginSuccess(user));
            }else {
                dispatch(loginError({error: 'Username or Password invalid. Please try again'}));
            }
        })
        .catch(error => {
            dispatch(loginError({error: 'Something went wrong. Please try again'}));
        })
    }
}
