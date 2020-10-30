import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../service/authService';
import { Link } from 'react-router-dom';
import ThemedButton from './generic/ThemedButton';
import TextInput from './generic/TextInput';
import { validateAlpha, validateEmail, validatePassword, validateMobileNumber } from './../../service/validation';

const PWORD_ERROR = 'Please enter a password with atleast 8 characters',
EMAIL_ERROR = 'Please enter a valid email id',
FNAME_ERROR = 'Please enter your first name',
LNAME_ERROR = 'Please enter your last name', 
MOBILE_ERROR = 'Please enter 10-digit mobile number', 
validateSignupForm = inputObj => {
  let validation = {};
  validation.error = {};
  validation.required ={};
  ['fname', 'lname', 'email', 'mobile', 'password'].forEach(item => {
    if(Object.keys((inputObj || {})).indexOf(item === -1)){
      validation.required[item] = true;
    }
  });
  if(!inputObj || Object.keys(inputObj) === 0){
    return validation;
  }
  if(inputObj.hasOwnProperty('fname') && !validateAlpha(inputObj.fname)){
    validation.error.fname = FNAME_ERROR;
  }
  if(inputObj.hasOwnProperty('lname') && !validateAlpha(inputObj.lname)){
    validation.error.lname = LNAME_ERROR;
  }
  if(inputObj.hasOwnProperty('email') && !validateEmail(inputObj.email)){
    validation.error.email = EMAIL_ERROR;
  }
  if(inputObj.hasOwnProperty('mobile') && !validateMobileNumber(inputObj.mobile)){
    validation.error.mobile = EMAIL_ERROR;
  }
  if(inputObj.hasOwnProperty('password') && !validatePassword(inputObj.password)){
    validation.error.password = PWORD_ERROR;
  }
  return validation;
}

function SignupModule(props){
    console.log('SignupModule', props);
    const [loggedIn, setLoggedIn] = useState(false);
    const [formValid, setFormValid] = useState(false);
    //const [errorObj, setErrorObj] = useState({});
    let inputObj = {}, errorObj = {};
    const validateField = (name, value) => {
        
        if(value && value.trim() !== ""){
            inputObj[name] = value;
        }else {
          delete inputObj[name];
        }
        let validation = validateSignupForm(inputObj) || {};
        console.log('validateField -> ', name, ' - ', value, validation);
        errorObj = validation.error || {};
        setFormValid(Object.keys(errorObj || {}).length === 0 && Object.keys(validation.required || {}).length === 0);
    },
    submitForm = () => {

    }
    return (
        <div className="col-12 p-0 m-0">
          {loggedIn && <div>Hi {props.user.userName}, You are now signed up</div>}
          {!loggedIn && <div className={"signup-form-container p-4"}>
            <div className="signup-form-header mb-4 pl-2 pr-2 h3">Create an account</div>
            <form className={"signup-form"}>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="fname"
                            error={FNAME_ERROR} 
                            type="text"
                            label="First name*"
                            required={true}
                            handler={validateField}
                            validate={validateAlpha}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="lname"
                            error={LNAME_ERROR} 
                            type="text"
                            label="Last name*"
                            required={true}
                            handler={validateField}
                            validate={validateAlpha}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="email"
                            error={EMAIL_ERROR} 
                            type="email"
                            label="Email*"
                            required={true}
                            handler={validateField}
                            validate={validateEmail}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="mobile"
                            error={MOBILE_ERROR} 
                            type="number"
                            label="Mobile*"
                            required={true}
                            handler={validateField}
                            validate={validateMobileNumber}
                        />
                    </div>
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <TextInput
                            name="password"
                            error={PWORD_ERROR} 
                            type="password"
                            label="Password*"
                            required={true}
                            handler={validateField}
                            validate={validatePassword}
                        />
                    </div>
                </div>
                <div className="row m-0">
                  <div className="col-md-12 float-left pl-2 pr-2">

                  </div>
                </div>
                
                <div className="row m-0 mt-3 d-flex justify-content-start">
                    <div className="pl-2 pr-2">
                        <div className="d-inline-block pr-4">
                            <ThemedButton
                                btnState={!formValid ? "disabled" : "active"}
                                btnText="Register"
                                theme="accent"
                                size="medium"
                                _click={submitForm}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="row m-0 mt-2">
              <div className="col-xs-12 pl-2 pr-2">
                  <Link to="login">Already have an account?</Link>
              </div>
            </div>
        </div>}
          
        </div>
      );
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupModule);
