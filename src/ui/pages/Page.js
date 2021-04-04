import React, {Component} from 'react';
import createTargetComponent from '@adobe/target-react-component';
//https://tylermcginnis.com/react-router-pass-props-to-components/
let Target = createTargetComponent(React);
class Page extends Component {
    componentWillMount(){}
    componentDidUpdate(){
        //Implement updates to data layer and meta data
    }
    componentDidMount(){
        console.log('Mounted Page ->', this.props.pageName);
        let pageName = this.props.pageName || null, 
        mboxName = pageName ? ("mbox-" + pageName + "-page") : null;
        if(this.props.pageName === 'pdp' && this.props.product) {
            mboxName = 'mbox-product-page';
            pageName = this.props.product.name || null;
        }
        if(!pageName){
            pageName = 'LikeBox';
        }
        if(window.dataLayer){
            window.dataLayer.pageName = this.props.pageName;
            if(mboxName){
                window.dataLayer.pageMbox = "mbox-" + this.props.pageName + "-page";
            }
        }
        if(mboxName){
            var event = new CustomEvent("react-view-change", 
            {
                detail: {
                    view: window.dataLayer.pageName, 
                    mbox: window.dataLayer.pageMbox
                }
            });
            document.dispatchEvent(event);
            document.title = this.props.pageName;
        }
        
    }
    render(){
        let {className} = this.props;
        return (
            <div className={"page" + (className ? " " + className : "")}>
                { this.props.children }
            </div>
        );
    }
}

export default Page;
