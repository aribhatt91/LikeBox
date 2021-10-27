import React from 'react';
import AppButton from './generic/AppButton';

const SignInMessage = (props) => {
    return (
        <section className="d-flex align-items-center justify-content-center pt-5 pb-5">
            <div className="w-100 h-100 d-flex align-center">
                <div className="container d-flex flex-column align-center justify-content-center">
                    <h1 className="font-weight-bold text-uppercase col-lg-5">
                        Please sign in to use our site.
                    </h1>
                    <div className="d-flex mt-5 mb-5  col-lg-5">
                        <AppButton label="Sign in" className="pr-5 pl-5" href="/login"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SignInMessage;