import { loginError, loginSuccess, loginPending } from '../store/actions/index';
import { setUserObject } from './rx-store/dataStore';
import { MockAuthenticate, MockGetUser } from './../mock/api/mock-user-api';

const getAuthToken = () => {
    return localStorage.getItem('access_token') || null;
}
export const authenticate = () => {
    return dispatch => {
        dispatch(loginPending());
        
        let token = getAuthToken();
        console.log('authenticate: res -> ', token);
        if(!token){
            dispatch(loginError({error: 'User not signed in'}));
        }else {
            MockGetUser(token).then( res => {
                try {
                    let user = JSON.parse(res);
                    console.log('MockGetUser: res -> ', user);
                    if(user && user.id){
                        setUserObject(user);
                        dispatch(loginSuccess(user));
                    }else {
                        dispatch(loginError({error: 'Token not valid. Authentication failed!'}));
                        localStorage.removeItem('access_token');
                    }
                }catch(err){
                    dispatch(loginError({error: 'Authentication failed!'}));
                } 
            }).catch(err => {
                dispatch(loginError({error: 'Authentication failed!'}));
            })
        }
    }
}
export const signin = (data, setSubmitting) => {
    return dispatch => {
        dispatch(loginPending());
        if(!data.email || !data.password){
            dispatch(loginError({error: 'Username or password invalid'}));
            if(typeof setSubmitting === "function") {
                setSubmitting(false);
            }
        }
        MockAuthenticate(data.email, data.password).then( res => {
            try{
                let r = JSON.parse(res) || {}, 
                token = r.access_token || null;
                console.log('MockAuthenticate: res -> ', token);
                
                if(token) {
                    console.log('calling MockGetUser');
                    localStorage.setItem('access_token', token);
                    return MockGetUser(token);
                }else {
                    dispatch(loginError({error: 'Invalid token. Authentication failed!'}));
                    throw new Error("Invalid token");
                }
            }catch(err){
                dispatch(loginError({error: 'Authentication failed!'}));
                throw new Error("Error occurred while parsing token")
            }
        }).then (res => {
            try {
                let user = JSON.parse(res);
                console.log('MockGetUser: res -> ', user);
                if(user && user.id){
                    setUserObject(user);
                    dispatch(loginSuccess(user));
                }else {
                    dispatch(loginError({error: 'In valid credentials. Authentication failed!'}));
                    localStorage.removeItem('access_token');
                }
                if(typeof setSubmitting === "function") {
                    setSubmitting(false);
                }
            }catch(err){
                dispatch(loginError({error: 'Failed to sign in!'}));
                if(typeof setSubmitting === "function") {
                    setSubmitting(false);
                }
            }
        }).catch(err => {
            console.error(err);
            dispatch(loginError({error: 'Failed to sign in!'}));
            if(typeof setSubmitting === "function") {
                setSubmitting(false);
            }
        });
    }
}
