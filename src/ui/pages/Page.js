import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { triggerCustomEvent } from './../../service/api/adobe/target-methods';
import { capitaliseAll } from './../../service/helper';
import { DataLayer } from './../../service/data/dataLayer';
import { addProductMetadata, addListingMetadata } from './../../service/data/metadata';
class Page extends Component {
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
        if(!pageName){
            return 'LikeBox';
        }
        if(pageName === 'pdp') {
            pageName = product ? product.name : null;
        }
        else if(pageName === 'category') {
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
        let pagetitle = this.getPageTitle();
        DataLayer.setPageName(pagetitle);
        if(product){
            DataLayer.setProduct(product);
        }
        return (
            <div className={"page" + (className ? (" " + className) : "")}>
                <Helmet>
                    <title>
                        {pagetitle}
                    </title>
                    <meta property="og:site_name" content="LikeBox" />
                    <meta property="og:title" content={pagetitle} />
                </Helmet>
                { this.props.children }
            </div>
        );
    }
}

export default Page;
