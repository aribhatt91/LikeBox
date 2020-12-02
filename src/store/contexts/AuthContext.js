import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../../service/api/firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
    useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])
    const value = {
        user
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
