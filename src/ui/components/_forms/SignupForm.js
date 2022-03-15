import React, { useState, useEffect, useContext } from 'react';
import { SIGNUP_FORM_SCHEMA } from '../../../libs/ValidationSchema';
import AppForm from './AppForm';
import AppTextInput from '../_generic/AppTextInput';
import AppSubmitButton from '../_generic/AppSubmitButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import AppRadioInput from '../_generic/AppRadioInput';
import { SuccessMessage } from '../_generic/AppMessage';
import { addUserProfile } from '../../../libs/UserService';
import AppDateInput from '../_generic/AppDateInput';
import { useHistory } from 'react-router-dom';
import { parseSearchParams } from '../../../libs/Helper';
//import { logRegister } from './../../../libs/api/analytics/index';
import EventTracker from '../../../libs/api/EventTracker';

let USER_TEMP = null;
function SignupForm(props){
    window.loginfo('SignupModule', props);
    //const { error, pending, user, loggedIn } = props;
    const [error, setError] = useState(null);
    const [ submitted, setSubmitted] = useState(false);
    
    const history = useHistory();
    const params = parseSearchParams(history.location.search);
    const email = params.email || "";

    const {signup, currentUser, updateName} = useContext(AuthContext);//useAuth();

    //window.loginfo('SignupForm', currentUser);
    const submitForm =  async (userInput, {setSubmitting}) => {
        setSubmitting(true);
        //window.loginfo(userInput, setSubmitting);
        
        if(error){
            setError(null);
        }
        try{
            let user = {}
            user.email = userInput.email;
            user.name = {};
            user.name.fname = userInput.fname;
            user.name.lname = userInput.lname;
            try{
                let d = new Date();
                d.setDate(Number(userInput.day))
                d.setMonth((Number(userInput.month) - 1))
                d.setYear(Number(userInput.year))
                user.dob = d.toDateString();
            }catch(err){

            }
            
            user.gender = userInput.gender;
            USER_TEMP = user;

            await signup(userInput);

        }catch(err){
            window.logerror(err);
            EventTracker.trackEvent(EventTracker.events.user.SIGNUP_ERROR);
        }finally{
            setSubmitting(false);
            //setSubmitted(true);
        }
        
        
    }
    const updateUserInDatabase = async () => {
        if(USER_TEMP){
            try{
                //logRegister("password");
                EventTracker.trackEvent(EventTracker.events.user.SIGNUP_COMPLETE, "password");
                await addUserProfile(USER_TEMP);
                await updateName(USER_TEMP.name.fname);
            }catch(err){
                EventTracker.trackEvent(EventTracker.events.user.SIGNUP_ERROR);
            }finally {
                setTimeout(() => {
                    //props.onComplete();
                    if(USER_TEMP){
                        history.replace('/your-style');
                    }else {
                        
                    }
                }, 2000);
            }
        }else {
            history.replace('/');
        }
    }
    useEffect(()=>{
        if(currentUser){
            //window.loginfo('user signed in...');
            updateUserInDatabase();
        }
        
    }, [currentUser]);

    useEffect(()=>{
        EventTracker.trackEvent(EventTracker.events.user.SIGNUP_START);
    }, [])

    return (
        <div className="col-12 col-md-8 col-lg-7 p-0 mt-0 mb-0 m-auto">
          {
              currentUser && 
              <div className="w-100 h-100 m-5 justify-content-center align-center">
                <SuccessMessage message={"You are signed in in!"} subtext="You'll be redirected in a moment.." />
              </div>
          }
        <div className={"signup-form-container slide-up" + (currentUser ? ' d-none' : "")}>
            <h1 className="signup-form-header mb-5 pl-2 pr-2 font-weight-normal w-100 text-center">Sign up for free to start shopping</h1>
            <div className={"signup-form"}>
              <AppForm
                onSubmit={submitForm}
                validationSchema={SIGNUP_FORM_SCHEMA}
                initialValues={{email: (props.email || email || ""), password: '', confirmpassword: '', fname: '', day: '', month: '', year: '', lname: '', gender: ''}} >
                

                <div className="row m-0">
                    <p className="w-100 pl-2 pr-2 font-weight-normal">Enter your date of birth* (DD/MM/YYYY)</p>
                    <div className="col-xs-12 float-left pl-2 pr-2">
                        <AppDateInput />
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
                    
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <p className="w-100 font-weight-normal mb-3">Enter your email address*</p>
                        <AppTextInput
                            name="email"
                            type="email"
                            label="Email"
                        />
                    </div>
                </div>
                <div className="row m-0"> 
                    
                    <div className="col-12 col-md-6 float-left pl-2 pr-2" data-private>
                        <p className="w-100 font-weight-normal mb-3">Password*</p>
                        <AppTextInput
                            name="password"
                            type="password"
                            label="Enter your password"
                        />
                    </div>
                    
                    <div className="col-12 col-md-6 float-left pl-2 pr-2">
                        <p className="w-100 font-weight-normal mb-3">Confirm password*</p>
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
            </div>
        </div>
          
        </div>
      );
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
 */

 export default SignupForm;