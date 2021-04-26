import React from 'react';
import Page from './Page';
const FourZeroFour = (props) => {
    return (
        <Page className="d-flex align-items-center justify-content-center pt-5 pb-5" pageName={"404"}>
            <img src={require('../../assets/img/404.png')}/>
        </Page>
    )
}
export default FourZeroFour;