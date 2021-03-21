import React, { useEffect, useState } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';
import { AuthProvider, AuthContext } from './store/contexts/AuthContext';
import { auth } from './service/api/firebase';
import LoadingModule from './ui/components/LoadingModule';
function Splash() {
    return (
        <div className="splash-screen">
            
        </div>
    )
}

function App() {
    const [loading, setLoading] = useState(true)
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
                console.log(auth);
            })
        }
    },[])
    return ( 
            <div className="App">
            
                <AuthProvider>
                    <Header/>
                    <AppBody/>
                    <Footer></Footer>
                </AuthProvider>
                {loading && <LoadingModule />}
            </div>

            );
    
}

export default App;