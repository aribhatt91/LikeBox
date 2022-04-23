import React, { useContext, useState, useEffect } from 'react'
import { auth, GoogleSignIn } from '../../api/firebase';
//import signup from './../../libs/signupService';
import EventTracker from '../../api/EventTracker';
import { addUserProfile } from '../../UserService';

export const AuthContext = React.createContext();

export function useAuth() {
    useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    function signup({email, password, fname, lname, mobile}){ 
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    async function logout() {
        try{
            await auth.signOut();
            EventTracker.trackEvent(EventTracker.events.user.LOGOUT);
            //setUser(null);
            window.logerror('AuthProvider::logout::success', currentUser);
        }catch(error){
            window.logerror('AuthProvider::logout::error', error);
        }
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function fetchSignInMethods(email) {
        return auth.fetchSignInMethodsForEmail(email);
    }

    function setUserAvatar(userObj){
        if(userObj){
            setUserProfile(userObj);
        }
    }

    function updateName(displayName){
        return currentUser.updateProfile({
            displayName
        })
    }
    function updatePhotoUrl(photoURL){
        return currentUser.updateProfile({
            photoURL
        })
    }

    function signInWithToken(){
        if(localStorage.getItem('user_token')){
            let token = localStorage.getItem('user_token');
            auth.signInWithCustomToken(token)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                window.loginfo("User signed in", user);
                EventTracker.trackEvent(EventTracker.events.user.AUTHENTICATED, user);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                EventTracker.trackEvent(EventTracker.events.user.AUTHENTICATTION_ERROR, error);
                // ...
            });
        }
    }

    async function signInWithGoogle(){
        try{
            EventTracker.trackEvent(EventTracker.events.user.LOGIN_START, "google");
            const res = await GoogleSignIn(auth);
            window.loginfo('Google sign in res', res);
            if(res.user){

                try{
                    /* Add User Object to Database */
                    let user = {},
                    name = (res.user.displayName || "").trim().split(' ');
                    user.email = res.user.email;
                    user.name = {};
                    user.name.fname = name[0] || "";
                    user.name.lname = name.length > 1 ? name[name.length - 1] || "" : "";
                    await addUserProfile(user);
                }catch(error){
                    window.logerror('signInWithGoogle::addUserProfile::error', error)
                }
                
                setUser(res.user);
                const token = await res.user.getIdToken();
                localStorage.setItem('user_token', res.user, token);
                EventTracker.trackEvent(EventTracker.events.user.LOGIN_COMPLETE, "google");
            }
        }catch(error){
            window.logerror('signInWithGoogle::error::', error);
            EventTracker.trackEvent(EventTracker.events.user.LOGIN_ERROR, error);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user, error) => {
            setLoading(true);
            window.loginfo('AuthProvider::onAuthStateChanged::user', user);
            if(user){
                setUser(user)
                const token = await user.getIdToken();
                localStorage.setItem('user_token', token);
                //EventTracker.trackEvent(EventTracker.events.user.AUTHENTICATED, {id: user.email, status: "logged-in"});
                //setUserId(user.uid);
            }else {
                setUser(null);
            }
            if(error){
                EventTracker.trackEvent(EventTracker.events.user.AUTHENTICATTION_ERROR, error);
            }
            /* TODO Add Authentication error event tracker */
            setLoading(false);
        });
        return unsubscribe;
    }, [])

    const value = {
        pendingAuthentication: loading,
        currentUser,
        userProfile,
        login,
        signup,
        logout,
        fetchSignInMethods,
        resetPassword,
        updateEmail,
        updatePassword,
        updateName,
        updatePhotoUrl,
        signInWithGoogle
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
