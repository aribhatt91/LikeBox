import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../service/api/firebase';
//import signup from './../../service/signupService';

export const AuthContext = React.createContext();

export function useAuth() {
    useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    function signup({email, password, fname, lname, mobile}){ 
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
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

    function signInWithToken(){
        if(localStorage.getItem('user_token')){
            let token = localStorage.getItem('user_token');
            auth.signInWithCustomToken(token)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("User signed in", user);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            ;
            if(user){
                setUser(user)
                user.getIdToken().then(token => {
                    console.log('received token', token);
                    localStorage.setItem('user_token', token);
                })
            }
            console.log('onAuthStateChanged', user, user.uid);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        fetchSignInMethods,
        resetPassword,
        updateEmail,
        updatePassword
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
