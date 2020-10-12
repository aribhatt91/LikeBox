import axios from 'axios';
import simulateNetworkRequest from './simulateNetworkRequest';

let user = {
    id: 'user001',
    email: 'aribhatt91@gmail.com',
    firstName: 'Aritra',
    lastName: 'Bhattacharyya',
    mobile: '9836592425',
    gender: 'M',
    type: 'Prime'
}

export const authenticateUser = (authToken) => {
    simulateNetworkRequest().then(res => {

    }).catch(err => {
        
    })
}