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
        if(window.dataLayer){
            window.dataLayer.pageName = this.props.pageName;
            window.dataLayer.pageMbox = "mbox-" + this.props.pageName + "-page";
        }
        
        var event = new CustomEvent("react-view-change", {detail: {view: window.dataLayer.pageName, mbox: window.dataLayer.pageMbox}});
        document.dispatchEvent(event);
        document.title = this.props.pageName;
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
