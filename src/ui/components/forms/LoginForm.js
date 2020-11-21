import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../../service/authService';
import PageMessage from './../generic/PageMessage';
import AppTextInput from './../generic/AppTextInput';
import AppForm from './AppForm';
import { LOGIN_FORM_SCHEMA } from './../../../service/validationSchema';
import AppSubmitButton from './../generic/AppSubmitButton';

const validationSchema = LOGIN_FORM_SCHEMA;

const LoginForm = (props) => {
  const { signInUser, error, pending, user, loggedIn } = props;
  const submitForm = (userInput, {setSubmitting}) => {
    console.log('submitForm', userInput);
    signInUser(userInput, setSubmitting);
  }
  return (
    <div className="col-12 p-0 m-0">
        {loggedIn && <div>Hi {user.userName}, You are now logged in</div>}

        <div className={"login-form-container p-4" + (loggedIn ? " d-none": "")}>
          <div className="login-form-header mb-4 pl-2 pr-2 h3 font-weight-normal">Log in</div>
          <form className={"login-form"}>
          {/* Older form component */}
          <AppForm
            initialValues={{email: '', password: ''}}
            onSubmit= {submitForm}
            validationSchema={validationSchema}>
              {error && <PageMessage type="error" text={error} dismissable={true} />}
              <div className="row m-0">
                <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                  <AppTextInput
                    name="email"
                    label="Email"
                    type="email"
                  />
                </div>

                <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                  <AppTextInput
                    name="password"
                    label="Password"
                    type="password"
                  />
                </div>

                <div className="col-12 clearfix float-none pl-2 pr-2">
                  <label className="p-0 mt-2">
                    <input className="mr-2" type="checkbox" onChange={() => console.log('checked')}/>
                    Keep me signed in
                  </label>
                </div>
              </div>

              <div className="row m-0 mt-3 d-flex justify-content-start">
                <div className="pl-2 pr-2">
                  <div className="d-inline-block pr-4">
                    <AppSubmitButton
                      btnText="Login"
                      theme="accent"
                      size="medium"
                    />
                  </div>
                </div>
              </div>

          </AppForm>
          </form>
        </div>
        
      </div>
  )
}


const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    loggedIn: state.loginReducer.loggedIn,
    pending: state.loginReducer.pending,
    user: state.loginReducer.user,
    error: state.loginReducer.error
  }
}
//Anything returned from this function will end up as props to BookList container
const mapDispatchToProps = (dispatch) => bindActionCreators({signInUser: signin}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
