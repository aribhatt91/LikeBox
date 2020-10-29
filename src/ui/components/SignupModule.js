import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../service/authService';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function validateName(name){
  return name && name.trim() !== "" && /^[a-zA-Z]+\s{0,1}[a-zA-Z]+$/.test(name.trim());
}
function validateEmail(email){
  return email && /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/.test(email);
}
function validatePassword(pword){
  return pword && pword.trim().length >=8;
}
const PWORD_ERROR = 'Please enter a password with atleast 8 characters',
EMAIL_ERROR = 'Please enter a valid email id',
FNAME_ERROR = 'Please enter your first name',
LNAME_ERROR = 'Please enter your lirst name';

const validateSignupForm = inputObj => {
  let validation = {};
  validation.error = {};
  validation.required ={};
  ['fname', 'lname', 'email', 'password'].forEach(item => {
    if(Object.keys((inputObj || {})).indexOf(item === -1)){
      validation.required[item] = true;
    }
  });
  if(!inputObj || Object.keys(inputObj) === 0){
    return validation;
  }
  if(inputObj.hasOwnProperty('fname') && !validateName(inputObj.fname)){
    validation.error.fname = FNAME_ERROR;
  }
  if(inputObj.hasOwnProperty('lname') && !validateName(inputObj.lname)){
    validation.error.lname = LNAME_ERROR;
  }
  if(inputObj.hasOwnProperty('email') && !validateName(inputObj.email)){
    validation.error.email = EMAIL_ERROR;
  }
  if(inputObj.hasOwnProperty('fname') && !validateName(inputObj.password)){
    validation.error.password = PWORD_ERROR;
  }
  return validation;
}

function SignupModule(props){

    const [loggedIn, setLoggedIn] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [errorObj, setErrorObj] = useState({});
    let inputObj = {};
    validateField = (name, value) => {
        console.log('validateField -> ', name, ' - ', value);
        if(value && value.trim() !== ""){
            inputObject[name] = value;
        }else {
          delete inputObj[name];
        }
        let validation = validateSignupForm(inputObject) || {};
        setErrorObj(validation.errors || {});
        setFormValid(Object.keys(validation.errors || {}).length === 0 && Object.keys(validation.required || {}).length === 0);
    }
    submitForm = () => {

    }
    return (
        <div>
          {loggedIn && <div>Hi {props.user.userName}, You are now signed up</div>}
          {!loggedIn && <div className={"signup-form-container p-3"}>
            <div className="signup-form-header mb-4 pl-2 pr-2 h3">{header ? header : "Create an account"}</div>
            <form className={"signup-form"}>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="fname"
                            error={errorObj.fname} 
                            type="text"
                            label="First name*"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="lname"
                            error={errorObj.lname} 
                            type="text"
                            label="Last name*"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="email"
                            error={errorObj.email} 
                            type="email"
                            label="Email*"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <TextInput
                            name="password"
                            error={errorObj.password} 
                            type="password"
                            label="Password*"
                            required="true"
                            handler={validateField}
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
                                btnState={formValid ? "disabled" : "active"}
                                btnText="Register"
                                theme="accent"
                                size="medium"
                                _click={submitForm}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="row mt-2">
              <div className="col-xs-12 pl-2 pr-2">
                  <Link to="/login">Already have an account?</Link>
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
