import React, {useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../store/contexts/AuthContext';
import Page from '../Page';
import CategoryTiles from './components/CategoryTiles';
import BrandCarousel from './components/BrandCarousel';
import LandingPage from './components/LandingPage';
import './index.css';

export default function Home() {
    const {currentUser} = useContext(AuthContext);
    const [show, setShow] = useState(0);

    useEffect(() => {
        if(currentUser){
            (async () => {
                /* let firstSession = await isFirstSession(currentUser.email);
                window.mlog('LikeBox:isFirstSession', firstSession);
                if(firstSession){
                    //setShow(2);
                }else {
                    setShow(4);                    
                } */
            })()
        }
    }, [currentUser])

    return (
        <Page className="like-box container-fluid">
                {!currentUser && <LandingPage
                    slideOut={false}
                    slideIn={true}
                />}
                {currentUser && <CategoryTiles/>}
            {/* <BrandCarousel /> */}
        </Page>
    )
}
