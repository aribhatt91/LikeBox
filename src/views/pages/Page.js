import React, {Component} from 'react';
import createTargetComponent from '@adobe/target-react-component';
//https://tylermcginnis.com/react-router-pass-props-to-components/
let Target = createTargetComponent(React);
class Page extends Component {
    componentWillMount(){}
    componentDidUpdate(){}
    componentDidMount(){
        if(window.dataLayer){
            window.dataLayer.pageName = this.props.pageName;
            window.dataLayer.pageMbox = "mbox-" + this.props.pageName + "-page";
        }
        var event = new CustomEvent("react-view-change", {detail: {view: window.dataLayer.pageName, mbox: window.dataLayer.pageMbox}});
        document.dispatchEvent(event);
    }
    render(){
        return "";
    }
}

export default Page;
