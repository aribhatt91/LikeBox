import React, { useEffect, useState, useContext } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';
import { AuthProvider, AuthContext } from './store/contexts/AuthContext';
import { auth } from './service/api/firebase';
import LoadingModule from './ui/components/LoadingModule';
import SplashPage from './ui/pages/SplashPage';

function App() {
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(AuthContext);
    useEffect(()=>{
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            setLoading(false);
            document.body.style.height = 'auto';
            document.body.style.overflow = 'auto';
        }, 4000);
        if(auth){
            auth.onAuthStateChanged((user) => {
                if(user){
                    window.mlog('App:onAuthStateChanged', user);
                    setLoading(false);
                    document.body.style.height = 'auto';
                    document.body.style.overflow = 'auto';
                }
            })
        }
    },[])
    return ( 
            <div className="App">
            
                {/* <AuthProvider> */}
                    <Header/>
                    <AppBody/>
                    <Footer></Footer>
                {/* </AuthProvider> */}
                {!(currentUser || !loading) && <SplashPage />}
            </div>

            );
    
}

export default App;