import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import SignupForm from '../../components/forms/SignupForm';
import Page from '../Page';
import ForgotPasswordForm from './../../components/forms/ForgotPasswordForm';

const LoginPage = (props) => {
    const location = useLocation();
    console.log(location.pathname);
    const login = location.pathname.indexOf('login') > -1;

    return (
        <Page className="d-flex justify-content-center" pageName={login ? 'Sign in' : location.pathname.indexOf('forgot-password') > -1 ? 'Reset password' : 'Register'}>
            <div className="mt-5 mb-5 d-flex align-center justify-content-center w-100">
                {
                    location.pathname.indexOf('login') > -1 && <LoginForm/>
                }
                {
                    location.pathname.indexOf('register') > -1 && <SignupForm/>
                }
                {
                    location.pathname.indexOf('forgot-password') > -1 && <ForgotPasswordForm/>
                }
            </div>
        </Page>
    )
}

export default LoginPage;