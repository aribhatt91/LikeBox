import React, {useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import Page from '../Page';
import CategoryTiles from './components/CategoryTiles';
import LandingPage from './components/LandingPage';
import './style.page.css';

export default function Home() {
    const {currentUser} = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);

    window.loginfo('HOMEPAGE::user', currentUser);

    useEffect(() => {
        if(currentUser){
            setLoggedIn(true);
        }else {
            setLoggedIn(false);
        }
    }, [currentUser])

    return (
        <Page pageName="home-page" className="like-box container-fluid">
                {!currentUser && <LandingPage
                    slideOut={false}
                    slideIn={true}
                />}
                {currentUser && <CategoryTiles/>}
            {/* <BrandCarousel /> */}
        </Page>
    )
}
