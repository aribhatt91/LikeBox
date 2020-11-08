import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import LoginModule from './../components/LoginModule';
import SignupModule from './../components/SignupModule';
import UserLoginSignupModule from './../components/UserLoginSignupModule';

const LoginPage = (props) => {
    console.log('LoginPage', props);
    let redirectTo = props.location.state && props.location.state.from ? props.location.state.from.pathname || "/" : "/",
    page = props.match.params.page;
    return (
        <div className="page d-flex justify-content-center">
            <div className="mt-4 mb-4 d-inline-flex shadow">
                <UserLoginSignupModule/>
            </div>
        </div>
    )
}

export default LoginPage;