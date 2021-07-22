import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import SignupForm from '../../components/forms/SignupForm';
import Page from '../Page';

const LoginPage = (props) => {
    const location = useLocation();

    const login = location.pathname.indexOf('login') > -1;

    return (
        <Page className="d-flex justify-content-center" pageName={login ? 'Sign in' : 'Register'}>
            <div className="mt-5 mb-5 d-flex align-center justify-content-center w-100">
                {/* <UserLoginSignupModule/> */}
                {
                    login && <LoginForm/>
                }
                {
                    location.pathname.indexOf('register') > -1 && <SignupForm/>
                }
            </div>
        </Page>
    )
}

export default LoginPage;