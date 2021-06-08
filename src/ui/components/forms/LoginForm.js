import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageMessage, { SuccessMessage } from './../generic/PageMessage';
import AppTextInput from './../generic/AppTextInput';
import AppForm from './AppForm';
import { LOGIN_FORM_SCHEMA } from './../../../service/validationSchema';
import AppSubmitButton from './../generic/AppSubmitButton';
import { AuthContext } from './../../../store/contexts/AuthContext';
import { Link } from 'react-router-dom';

const validationSchema = LOGIN_FORM_SCHEMA;

const LoginForm = ({email="", onComplete}) => {
  //const { signInUser, pending, user, loggedIn } = props;
  const [ submitted, setSubmitted] = useState(false);
  const [ error, setError ] = useState(null);
  const {login, currentUser} = useContext(AuthContext);
  const initialValues = {
    email,
    password: ""
  }
  //https://firebase.google.com/docs/reference/js/firebase.User
  //https://firebase.google.com/docs/reference/js/firebase.User#updateprofile
  const submitForm = async (userInput, {setSubmitting}) => {
    window.mlog('submitForm', userInput);
    setSubmitting(true);
    setError(null);
    //signInUser(userInput, () => {setSubmitting(false); setSubmitted(true)});
    try {
      let response = await login(userInput.email, userInput.password);
      setSubmitted(true);
      window.mlog('Response ->', response);
      if(typeof onComplete === 'function'){
          setTimeout(onComplete, 750);
      }
    }catch({code, message}){
      
      setError('Username or Password is invalid');
      window.mlog('Login error ->', code, message);
    }finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }
  return (
    <div className="col-12 col-md-7 col-lg-5 p-0 m-0">
        {
          currentUser && <SuccessMessage message={"You are logged in!"} />
        }

        <div className={"login-form-container" + (currentUser ? " d-none": "")}>
          <div className="login-form-header mb-4 pl-2 pr-2 h3 font-weight-normal text-center">Sign into your account</div>
          <form className={"login-form"}>

            <AppForm
              initialValues={initialValues}
              onSubmit={submitForm}
              validationSchema={validationSchema}>
                {submitted && error && 
                  <div className="row m-0 mb-4">
                    <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                      <PageMessage type="error" text={error} inline={false}/>
                    </div>
                  </div>
                }
                <div className="row m-0">
                  <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                    <AppTextInput
                      name="email"
                      label="Email"
                      type="email"
                      // defvalue={props.email ? props.email : ''}
                    />
                  </div>

                  <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                    <AppTextInput
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="row m-0 mt-3 d-flex justify-content-start">
                  <div className="pl-2 pr-2 col-12">
                      <AppSubmitButton
                        text="Sign in"
                        className="w-100"
                      />
                  </div>
                </div>
                <div className="row m-0 mt-3 d-flex justify-content-start">
                  <div className="pl-2 pr-2 col-12">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                </div>

            </AppForm>
          </form>
        </div>
        
      </div>
  )
}

/* const mapStateToProps = state => {
  window.mlog('mapStateToProps called', state);
  return {
    loggedIn: state.loginReducer.loggedIn,
    pending: state.loginReducer.pending,
    user: state.loginReducer.user,
    error: state.loginReducer.error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({signInUser: signin}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
 */

 export default LoginForm;