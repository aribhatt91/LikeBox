import React, {Component, useEffect, useContext} from 'react';
import { Helmet } from 'react-helmet';
import { capitaliseAll } from '../../libs/Helper';
import EventTracker from './../../libs/api/EventTracker';
import { AuthContext } from '../../libs/store/contexts/AuthContext';

function Page({className, pageName, category, product, children}) {
    const {currentUser, pendingAuthentication } = useContext(AuthContext);

    const getPageTitle = () => {
        if(!pageName || pageName === 'home-page'){
            return 'LikeBox';
        }
        if(pageName === 'product-page') {
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
/* 
class Page extends Component {
    visitedOnce = false;

    constructor(props){
        super(props); 
    }

    componentWillMount(){}

    componentDidUpdate(){
        //Implement updates to data layer and meta data
    }

    componentDidMount() {
        let pageName = this.props.pageName || null;
        window.scrollTo({left:0, top: 0, behavior: 'smooth'});

        if(['product-page', 'login', 'register', 'reset-password', 'category-page'].indexOf(pageName) === -1 && pageName){
            EventTracker.trackEvent(EventTracker.events.page.PAGE_VIEW, this.getPageTitle(), pageName);
            EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, pageName);          
        }
    }

    getPageTitle(){
        let {pageName, category, product} = this.props;
        if(!pageName || pageName === 'home-page'){
            return 'LikeBox';
        }
        if(pageName === 'product-page') {
            pageName = product ? product.title : null;
        }
        else if(pageName === 'register') {
            pageName = 'Sign up';
        }
        else if(pageName === 'login') {
            pageName = 'Sign in';
        }
        else if(pageName === 'reset-password') {
            pageName = 'Reset password';
        }
        else if(pageName === 'category-page') {
            pageName = category || null;
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
    render(){
        let {className, pageName, category, product} = this.props;
        let pageTitle = this.getPageTitle();
        
        return (
            <div className={"page" + (className ? (" " + className) : "")}>
                <Helmet>
                    <title>
                        {pageTitle}
                    </title>
                    <meta property="og:site_name" content="LikeBox" />
                    <meta property="og:title" content={pageTitle} />
                </Helmet>
                { this.props.children }
            </div>
        );
    }
}
 */
export default Page;
