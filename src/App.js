import React, { useEffect, useState, useContext } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';
import { AuthContext } from './store/contexts/AuthContext';
import { auth } from './service/api/firebase';
import SplashPage from './ui/pages/SplashPage';
import { Helmet } from 'react-helmet';

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
                {/*  */
                    process.env.REACT_APP_ENV === "dev" && <Helmet>
                        <script src="https://assets.adobedtm.com/770d56ad37f4/63b7bc8dbb9f/launch-2aefcf817d42-development.min.js" async></script>
                        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-T5SSNJ9"></script>
                    </Helmet>
                }
                    <Header/>
                    <AppBody/>
                    <Footer/>
                {!(currentUser || !loading) && <SplashPage />}
            </div>

            );
    
}

export default App;