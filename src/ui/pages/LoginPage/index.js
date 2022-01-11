import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventTracker from '../../../service/api/EventTracker';
import LoginForm from '../../components/forms/LoginForm';
import SignupForm from '../../components/forms/SignupForm';
import Page from '../Page';
import ForgotPasswordForm from './../../components/forms/ForgotPasswordForm';

const LoginPage = (props) => {
    const location = useLocation();
    const login = location.pathname.indexOf('login') > -1;

    useEffect(() => {
        const viewName = (login ? 'login' : location.pathname.indexOf('forgot-password') > -1 ? 'reset-password' : 'register');
        EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, viewName);
        EventTracker.trackEvent(EventTracker.events.page.PAGE_VIEW, (login ? 'Sign in' : location.pathname.indexOf('forgot-password') > -1 ? 'Reset password' : 'Register'), viewName);
    }, [location.pathname]);

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