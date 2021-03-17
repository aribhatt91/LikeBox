import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import UserLoginSignupModule from './../components/UserLoginSignupModule';
import SignupForm from './../components/forms/SignupForm';
import { AuthContext } from './../../store/contexts/AuthContext';

const LoginPage = (props) => {
    const location = useLocation();
    const {currentUser} = useContext(AuthContext)

    console.log('LoginPage', props);
    let redirectTo = props.location.state && props.location.state.from ? props.location.state.from.pathname || "/" : "/",
    page = props.match.params.page;
    return (
        <div className="page d-flex justify-content-center">
            <div className="mt-5 mb-5 d-flex align-center">
                {/* <UserLoginSignupModule/> */}
                {
                    location.pathname.indexOf('login') > -1 && <LoginForm/>
                }
                {
                    location.pathname.indexOf('register') > -1 && <SignupForm/>
                }
            </div>
        </div>
    )
}

export default LoginPage;