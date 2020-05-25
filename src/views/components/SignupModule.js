import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from './../../service/loginService';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function validateName(name){

}
function validateEmail(email){

}
function validatePassword(pword){

}
function validatePostCode(pcode){

}
function validateMobile(mobile){

}
function validateAll(user_input){

}
function onUserInput(key, value, user_input){
    console.log(key, value, user_input);
    var validation = null;
    if(key === 'name'){
        validation = validateName(value);
    }
    return {
        ...user_input,
        [key]: value
    };
}
function handleSubmit(){

}
function SignupModule(props){
    var initial_state = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        houseNumber: '',
        streetName: '',
        password: '',
        nameError: false,
        nameErrorText: '',
        emailError: false,
        emailErrorText: '',
        mobileError: false,
        mobileErrorText: '',
        addressError: false,
        addressErrorText: '',
        passwordError: false,
        passwordErrorText: '',
    }
    const [loggedIn, setLoggedIn] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [userinput, setUserInput] = useState(initial_state);
    return (
        <div>
          {loggedIn && <div>Hi {props.user.userName}, You are now signed up</div>}
          {!loggedIn && <p>Please fill in this form to create an account.</p>}
          {!loggedIn && <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control className="themed_text_input" type="text" name="name" placeholder="Name" onBlur={(e) => {setUserInput(onUserInput(e.target.name, e.target.value, userinput))}} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control className="themed_text_input" type="email" name="email" placeholder="Email" onBlur={(e) => {setUserInput(onUserInput(e.target.name, e.target.value, userinput))}} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="themed_text_input" type="password" name="password" placeholder="Password" onBlur={(e) => {setUserInput(onUserInput(e.target.name, e.target.value, userinput))}} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Stay signed in" />
            </Form.Group>
            <Button className="themed_btn themed_btn_dark" variant="primary" type="submit" disabled={!formValid}>
              Sign up
            </Button>
          </Form>}
          
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
