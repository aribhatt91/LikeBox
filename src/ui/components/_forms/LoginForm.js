import React, { useState, useContext, useEffect } from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import AppMessage, { SuccessMessage } from '../_generic/AppMessage';
import AppTextInput from '../_generic/AppTextInput';
import AppForm from './AppForm';
import { LOGIN_FORM_SCHEMA } from '../../../libs/ValidationSchema';
import AppSubmitButton from '../_generic/AppSubmitButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { parseSearchParams } from '../../../libs/Helper';
import EventTracker from '../../../libs/api/EventTracker';


const validationSchema = LOGIN_FORM_SCHEMA;

const LoginForm = ({onComplete}) => {
  //const { signInUser, pending, user, loggedIn } = props;
  const [ submitted, setSubmitted] = useState(false);
  const [ error, setError ] = useState(null);
  const {login, currentUser} = useContext(AuthContext);
  const history = useHistory();
  const params = parseSearchParams(history.location.search);
  const email = params.email || "";
  const initialValues = {
    email,
    password: ""
  }
  //https://firebase.google.com/docs/reference/js/firebase.User
  //https://firebase.google.com/docs/reference/js/firebase.User#updateprofile
  const submitForm = async (userInput, {setSubmitting}) => {
    window.loginfo('submitForm', userInput);
    setSubmitting(true);
    setError(null);
    //signInUser(userInput, () => {setSubmitting(false); setSubmitted(true)});
    try {
      let response = await login(userInput.email, userInput.password);
      //window.loginfo('Response ->', response);
      //logSignIn("password");
      EventTracker.trackEvent(EventTracker.events.user.LOGIN_COMPLETE, "password");
      setTimeout(() => {
        window.scrollTo({top: 0});
      }, 10);
      if(typeof onComplete === 'function'){
          setTimeout(onComplete, 750);
      }
    }catch({code, message}){
      
      setError('Username or Password is invalid');
      window.loginfo('Login error ->', code, message);
      EventTracker.trackEvent(EventTracker.events.user.LOGIN_ERROR);
    }finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }
  useEffect(() => {
    EventTracker.trackEvent(EventTracker.events.user.LOGIN_START);
  }, []);
  return (
    <div className="col-12 col-md-7 col-lg-5 p-0 mt-0 mb-0 m-auto">
        {
          currentUser && <SuccessMessage message={"You are logged in!"} />
        }

        <div className={"login-form-container anim--slide-up" + (currentUser ? " d-none": "")}>
          <h1 className="login-form-header mb-5 pl-2 pr-2 font-weight-normal text-center">Sign into your account</h1>
          <form className={"login-form"}>

            <AppForm
              initialValues={initialValues}
              onSubmit={submitForm}
              validationSchema={validationSchema}>
                {submitted && error && 
                  <div className="row m-0 mb-4">
                    <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                      <AppMessage type="error" text={error} inline={false}/>
                    </div>
                  </div>
                }
                <div className="row m-0">
                  <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none" data-private>
                    <AppTextInput
                      name="email"
                      label="Email"
                      type="email"
                      // defvalue={props.email ? props.email : ''}
                    />
                  </div>

                  <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none" data-private>
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
  window.loginfo('mapStateToProps called', state);
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