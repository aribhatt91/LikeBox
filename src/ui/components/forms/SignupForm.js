import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../../service/authService';
import { SIGNUP_FORM_SCHEMA } from './../../../service/validationSchema';
import AppForm from './AppForm';
import AppTextInput from '../generic/AppTextInput';
import AppSubmitButton from './../generic/AppSubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { useAuth, AuthContext } from './../../../store/contexts/AuthContext';
import AppRadioInput from '../generic/AppRadioInput';
//import signup from './../../../service/signupService';

const validationSchema = SIGNUP_FORM_SCHEMA;
function SignupForm(props){
    console.log('SignupModule', props);
    //const { error, pending, user, loggedIn } = props;
    const [error, setError] = useState(null);
    const [ submitted, setSubmitted] = useState(false);

    const {signup, currentUser, updateName} = useContext(AuthContext);//useAuth();
    console.log('SignupForm', currentUser);
    const submitForm =  async (userInput, {setSubmitting}) => {
        setSubmitting(true);
        //console.log(userInput, setSubmitting);
        if(error){
            setError(null);
        }
        try{
            console.log('Logging', userInput);
            /* await signup(userInput);
            console.log('after await', currentUser);
            updateName(userInput.fname); */
            if(typeof props.onComplete === 'function'){
                props.onComplete();
            }
        }catch(err){
            console.error(err);
        }
        
        setSubmitting(false);
        setSubmitted(true);
    }
    return (
        <div className="col-12 p-0 m-0">
          {currentUser && <div className="login-success-container d-flex flex-column justify-content-center align-items-center">
            <div className="green-tick mb-3">
                <FontAwesomeIcon icon={faCheck} size="2x"></FontAwesomeIcon>
            </div>
            <h2 className="font-weight-light">You are logged in!</h2>
            </div>
          }
        <div className={"signup-form-container" + (currentUser ? ' d-none' : "")}>
            <div className="signup-form-header mb-4 pl-2 pr-2 h3 font-weight-normal w-100 text-center">Sign up for free to start shopping</div>
            <form className={"signup-form"}>
              <AppForm
                onSubmit={submitForm}
                validationSchema={validationSchema}
                initialValues={{email: '', password: '', confirmpassword: '', fname: '', date: '', month: '', year: '', lname: '', gender: ''}} >
                

                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal">Enter your date of birth*</p>
                    <div className="col-md-4 float-left pl-2 pr-2">
                        <AppTextInput
                            type="number"
                            name="date"
                            label="DD*"
                            min="1"
                            max="31"
                            />
                    </div>
                    <div className="col-md-4 float-left pl-2 pr-2">
                        <AppTextInput
                            type="number"
                            name="month"
                            label="MM*"
                            min="1"
                            max="12"
                            />
                    </div>
                    <div className="col-md-4 float-left pl-2 pr-2">
                        <AppTextInput
                            type="number"
                            name="year"
                            label="YYYY*"
                            min="1900"
                            max="2021"
                            />
                    </div>
                </div>

                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal mb-3">Select your gender*</p>
                    <div className="col-12 pl-2 pr-2">
                        <AppRadioInput 
                            name="gender"
                            options={['male', 'female', 'other']}
                        />
                    </div>
                </div>
                
                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal mb-3 mt-3">Enter your name*</p>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <AppTextInput
                            name="fname"
                            label="First name"
                          />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <AppTextInput
                            name="lname"
                            label="Last name"
                          />
                    </div>
                </div>
                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal mb-3">Enter your email address*</p>
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <AppTextInput
                            name="email"
                            type="email"
                            label="Email"
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal mb-3">Password*</p>
                    {/* <div className="col-md-6 float-left pl-2 pr-2">
                        <AppTextInput
                            name="mobile"
                            type="number"
                            label="Mobile"
                        />
                    </div> */}
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <AppTextInput
                            name="password"
                            type="password"
                            label="Enter your password"
                        />
                    </div>
                </div>
                <div className="row m-0"> 
                    <p className="w-100 pl-2 pr-2 font-weight-normal mb-3">Confirm password*</p>
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <AppTextInput
                            name="confirmpassword"
                            type="password"
                            label="Confirm your password"
                        />
                    </div>
                </div>
                
                <div className="row m-0 mt-3 d-flex justify-content-start">
                    <div className="pl-2 pr-2 w-100">
                        <div className="col-12">
                            <AppSubmitButton
                                text="Create account"
                                className="w-100"
                            />
                        </div>
                    </div>
                </div>
                </AppForm>
            </form>
        </div>
          
        </div>
      );
}
/* const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    loggedIn: state.loginReducer.loggedIn,
    pending: state.loginReducer.pending,
    user: state.loginReducer.user,
    error: state.loginReducer.error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({signInUser: signin}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
 */

 export default SignupForm;