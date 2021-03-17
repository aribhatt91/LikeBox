import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
const UserLoginSignupModule = (props) => {
    const [switchSignup, setSwitchSignup] = useState(false);
    return (
        <div className="login-body d-flex flex-column justify-content-center overflow-hidden m-auto">
            <div className={"d-flex login-signup-container" + (switchSignup ? " slide-signup" : " slide-login")}>
                <div className={"d-flex module login-module p-4"} >
                    {/* <AuthProvider> */}
                        <LoginForm/>
                    {/* </AuthProvider> */}
                </div>
                <div className={"d-flex module signup-module p-4"} >
                    {/* <AuthProvider> */}
                        <SignupForm/>
                    {/* </AuthProvider> */}
                </div>
            </div>
            <div className="row m-0 switch-link p-4">
            <div className="col-xs-12 pl-2 pr-2">
                <a className="text-decoration-none" href="#" onClick={() => {setSwitchSignup(!switchSignup)}}>{switchSignup ? "Already have an account?" : "Or create an account?"}</a>
            </div>
            </div>
        </div>
    )
}

export default UserLoginSignupModule;