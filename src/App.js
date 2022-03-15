import React, { useEffect, useState, useContext } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';
import { AuthContext } from './libs/store/contexts/AuthContext';
import { auth } from './libs/api/firebase';
import SplashPage from './ui/pages/SplashPage';
import { Helmet } from 'react-helmet';
import EventTracker from './libs/api/EventTracker';
import LogRocket from 'logrocket';

function App() {
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if(currentUser){
            EventTracker.trackEvent(EventTracker.events.user.AUTHENTICATED, currentUser);
        }
    }, [currentUser]);

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
                    window.loginfo('App:onAuthStateChanged', user);
                    setLoading(false);
                    document.body.style.height = 'auto';
                    document.body.style.overflow = 'auto';
                    LogRocket.identify(user.email, {
                        name: user.displayName,
                        email: user.email
                    });
                }
            })
        }
        LogRocket.init('ljgr4x/the-likebox');
    },[])
    return ( 
            <div className="App">
                {/*  */
                    window.DEV_MODE && <Helmet>
                        <script src="https://assets.adobedtm.com/770d56ad37f4/63b7bc8dbb9f/launch-2aefcf817d42-development.min.js" async></script>
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