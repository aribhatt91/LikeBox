import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { triggerCustomEvent } from './../../service/api/adobe/target-methods';
import { capitaliseAll } from './../../service/helper';
//import DataLayer from './../../service/api/DataLayer';
//import { addProductMetadata, addListingMetadata } from './../../service/data/metadata';
//import { logPageView } from './../../service/api/analytics/index';
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
    componentDidMount(){
        //window.mlog('Mounted Page ->', this.props.pageName);
        let pageName = this.props.pageName || null, viewName = pageName;
        triggerCustomEvent(viewName);
        //document.title = capitaliseAll(pageName);
        window.scrollTo({left:0, top: 0, behavior: 'smooth'});
        
        
    }
    getPageTitle(){
        let {pageName, category, product} = this.props;
        if(!pageName || pageName === 'home-page'){
            return 'LikeBox';
        }
        if(pageName === 'pdp') {
            pageName = product ? product.title : null;
        }
        else if(pageName === 'category-page') {
            pageName = category || null;
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
        //DataLayer.setPageName(pagetitle);
        
        /* GA Logging */
        if(!this.visitedOnce && pageName !== 'pdp'){
            window.mlog('Page:', pageName, product, EventTracker.events.page.PAGE_VIEW);
            //logPageView(this.getPageTitle(), window.location.href, window.location.pathname);
            EventTracker.trackEvent(EventTracker.events.page.PAGE_VIEW, pageTitle, pageName);
            this.visitedOnce = true;
        }
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
