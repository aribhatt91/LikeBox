import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from '../../../service/authService';
import { SIGNUP_FORM_SCHEMA } from './../../../service/validationSchema';
import AppForm from './AppForm';
import AppTextInput from '../generic/AppTextInput';
import AppSubmitButton from './../generic/AppSubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const validationSchema = SIGNUP_FORM_SCHEMA;
function SignupForm(props){
    console.log('SignupModule', props);
    const { error, pending, user, loggedIn } = props;
    const [ submitted, setSubmitted] = useState(false);

    const submitForm = (userInput, {setSubmitting}) => {

    }
    return (
        <div className="col-12 p-0 m-0">
          {loggedIn && <div className="login-success-container d-flex flex-column justify-content-center align-items-center">
            <div className="green-tick mb-3">
                <FontAwesomeIcon icon={faCheck} size="2x"></FontAwesomeIcon>
            </div>
            <h2 className="font-weight-light">You are logged in!</h2>
            </div>}
          {!loggedIn && <div className={"signup-form-container"}>
            <div className="signup-form-header mb-4 pl-2 pr-2 h3 font-weight-normal">Create an account</div>
            <form className={"signup-form"}>
              <AppForm
                initialValues={{email: '', password: '', fname: '', lname: '', mobile: ''}}
                onSubmit= {submitForm}
                validationSchema={validationSchema}>
                
                <div className="row m-0">
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
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <AppTextInput
                            name="email"
                            type="email"
                            label="Email"
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <AppTextInput
                            name="mobile"
                            type="number"
                            label="Mobile"
                        />
                    </div>
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <AppTextInput
                            name="password"
                            type="password"
                            label="Password"
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
                            <AppSubmitButton
                                text="Create account"
                                theme="accent"
                                size="medium"
                            />
                        </div>
                    </div>
                </div>
                </AppForm>
            </form>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({signInUser: signin}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
