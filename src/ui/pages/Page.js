import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { capitaliseAll } from './../../service/helper';
import EventTracker from './../../service/api/EventTracker';

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

export default Page;
