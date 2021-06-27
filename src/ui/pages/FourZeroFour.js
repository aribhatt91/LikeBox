import React from 'react';
import AppButton from '../components/generic/AppButton';
import Page from './Page';
const FourZeroFour = (props) => {
    return (
        <Page className="d-flex align-items-center justify-content-center pt-5 pb-5" pageName={"404"}>
            <div className="w-100 h-100 d-flex align-center">
                <div className="container d-flex flex-column align-center justify-content-center">
                    <h1 className="font-weight-bold text-uppercase col-lg-5">
                        OOPS! THIS PAGE DOESN'T EXIST ANYMORE.
                    </h1>
                    <div className="d-flex mt-5 mb-5  col-lg-5">
                        <AppButton label="Go back to home" className="pr-5 pl-5" href="/"/>
                    </div>
                </div>
            </div>
        </Page>
    )
}
export default FourZeroFour;