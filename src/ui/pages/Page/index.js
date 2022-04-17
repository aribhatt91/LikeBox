import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { capitaliseAll } from '../../../libs/Helper';
import EventTracker from '../../../libs/api/EventTracker';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import './style.component.css';

function Page({className, pageName, category, product, children}) {
    const {currentUser, pendingAuthentication } = useContext(AuthContext);

    const getPageTitle = () => {
        if(!pageName){
            return 'LikeBox';
        }
        else if(pageName === 'home-page'){
            return 'LikeBox | Home';
        }
        else if(pageName === 'product-page') {
            return product ? product.title : "LikeBox" ;
        }
        else if(pageName === 'register') {
            return 'Sign up';
        }
        else if(pageName === 'login') {
            return 'Sign in';
        }
        else if(pageName === 'reset-password') {
            return 'Reset password';
        }
        else if(pageName === 'category-page') {
            return category || null;
        }else if(pageName === '404') {
            pageName = "Page not found";
        }else if(pageName === 'your-style') {
            pageName = "Your Style";
        }
        if(!pageName){
            pageName = 'LikeBox';
        }else {
            pageName = capitaliseAll(pageName);
        }
        return pageName;

    }

    const pageTitle = getPageTitle();

    useEffect(() => {
        window.scrollTo({left:0, top: 0, behavior: 'smooth'});
    }, [pageName])

    useEffect(() => {
        if(['product-page', 'login', 'register', 'reset-password', 'category-page'].indexOf(pageName) === -1 && pageName && !pendingAuthentication){
            EventTracker.trackEvent(EventTracker.events.page.PAGE_VIEW, pageTitle, pageName);
            EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, pageName);          
        }
    }, [pageName, pendingAuthentication])

    return (
        <div className={"page" + (className ? (" " + className) : "")}>
            <Helmet>
                <title>
                    {pageTitle}
                </title>
                <meta property="og:site_name" content="LikeBox" />
                <meta property="og:title" content={pageTitle} />
            </Helmet>
            { children }
        </div>
    );
}

export default Page;
