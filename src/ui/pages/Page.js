import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { triggerCustomEvent } from './../../service/api/adobe/target-methods';
import { capitaliseAll } from './../../service/helper';
class Page extends Component {
    constructor(props){
        super(props); 
    }
    componentWillMount(){}
    componentDidUpdate(){
        //Implement updates to data layer and meta data
        
    }
    componentDidMount(){
        console.log('Mounted Page ->', this.props.pageName);
        let pageName = this.props.pageName || null, viewName = pageName;
        if(window.dataLayer){
            window.dataLayer.pageName = viewName;
        }
        triggerCustomEvent(viewName);
        //document.title = capitaliseAll(pageName);
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
        return (
            <div className={"page" + (className ? (" " + className) : "")}>
                <Helmet>
                    <title>
                        {this.getPageTitle()}
                    </title>
                </Helmet>
                { this.props.children }
            </div>
        );
    }
}

export default Page;
