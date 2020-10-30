import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import LoginModule from './../components/LoginModule';
import SignupModule from './../components/SignupModule';

const LoginPage = (props) => {
    console.log('LoginPage', props);
    let redirectTo = props.location.state && props.location.state.from ? props.location.state.from.pathname || "/" : "/"; 
    return (
        <div className="page">
            <BrowserRouter basename="/login">
                <div className="login-body d-flex justify-content-center ml-auto mr-auto mt-3 mb-3">
                    <Switch>
                        <Route exact path="/signup" render={props => <SignupModule {...props} redirectTo={redirectTo} />} />
                        <Route path="*" render={props => <LoginModule {...props} redirectTo={redirectTo} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default LoginPage;