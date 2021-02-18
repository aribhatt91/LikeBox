import React, { useEffect } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';
import { AuthProvider, AuthContext } from './store/contexts/AuthContext';

function Splash() {
    return (
        <div className="splash-screen">
            
        </div>
    )
}

function App() {
    useEffect(()=>{},[])
    return ( 
            <div className="App">
            
                <AuthProvider>
                    <Header/>
                    <AppBody/>
                    <Footer></Footer>
                </AuthProvider>
            </div>
            );
    
}

export default App;