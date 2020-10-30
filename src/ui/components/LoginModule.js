import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../service/authService';
import TextInput from './generic/TextInput';
import ThemedButton from './generic/ThemedButton';
import { validateEmail, validatePassword } from './../../service/validation';

const PWORD_ERROR = 'Please enter a password with atleast 8 characters',
EMAIL_ERROR = 'Please enter a valid email id',  
validateLoginForm = inputObj => {
  let validation = {};
  validation.error = {};
  validation.required ={};
  ['email', 'password'].forEach(item => {
    if(Object.keys((inputObj || {})).indexOf(item === -1)){
      validation.required[item] = true;
    }
  });
  if(!inputObj || Object.keys(inputObj) === 0){
    return validation;
  }
  if(inputObj.hasOwnProperty('email') && !validateEmail(inputObj.email)){
    validation.error.email = EMAIL_ERROR;
  }
  if(inputObj.hasOwnProperty('password') && !validatePassword(inputObj.password)){
    validation.error.password = PWORD_ERROR;
  }
  return validation;
}
const LoginModule = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [errorObj, setErrorObj] = useState({});
  let inputObj = {};
  const validate = (name, value) =>{
    
    if(value && value.trim() !== ""){
        inputObj[name] = value;
    }else {
      delete inputObj[name];
    }
    let validation = validateLoginForm(inputObj) || {};
    console.log('validateField -> ', name, ' - ', value, validation);
    setErrorObj(validation.error || {});
    setFormValid(Object.keys(validation.errors || {}).length === 0 && Object.keys(validation.required || {}).length === 0);
  },
  submitForm = (e) => {
    e.preventDefault();
    //console.log(props);
    const {signInUser} = props;
    signInUser({'email': 'aribhatt@adobe.com', 'password': 'ari'});
  }
  return (
    <div className="col-12 p-0 m-0">
        {props.loggedIn && <div>Hi {props.user.userName}, You are now logged in</div>}
        {!props.loggedIn && 
        <div className={"login-form-container p-4"}>
          <div className="login-form-header mb-4 pl-2 pr-2 h3">Log in</div>
          <form className={"login-form"}>
            <div className="row m-0">
              <div className="col-md-10 col-lg-8 pl-2 pr-2 clearfix float-none">
                <TextInput
                  name="email"
                  label="Email"
                  required={true}
                  type="email"
                  error={EMAIL_ERROR}
                  handler={validate}
                  validate={validateEmail}
                />
              </div>
              <div className="col-md-10 col-lg-8 pl-2 pr-2 clearfix float-none">
                <TextInput
                  name="password"
                  label="Password"
                  required={true}
                  type="password"
                  error={PWORD_ERROR}
                  handler={validate}
                  validate={validatePassword}
                />
              </div>
              <div className="col-12 clearfix float-none pl-2 pr-2">
                <label className="p-0 mt-2">
                  <input className="mr-2" type="checkbox" onChange={() => {inputObj.keepSigned = this.checked}}/>
                  Keep me signed in
                </label>
              </div>
            </div>
            
          
          <div className="row m-0 mt-3 d-flex justify-content-start">
              <div className="pl-2 pr-2">
                  <div className="d-inline-block pr-4">
                      <ThemedButton
                          btnState={!formValid ? "disabled" : "active"}
                          btnText="Login"
                          theme="accent"
                          size="medium"
                          _click={submitForm}
                      />
                  </div>
              </div>
          </div>
        </form>
        </div>}
        
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
