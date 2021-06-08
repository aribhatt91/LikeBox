import React, { useState, useContext } from 'react';
import { SIGNUP_FORM_SCHEMA } from './../../../service/validationSchema';
import AppForm from './AppForm';
import AppTextInput from '../generic/AppTextInput';
import AppSubmitButton from './../generic/AppSubmitButton';
import { AuthContext } from './../../../store/contexts/AuthContext';
import AppRadioInput from '../generic/AppRadioInput';
import { SuccessMessage } from '../generic/PageMessage';
import { addUserProfile } from './../../../service/userProfile';
import AppDateInput from '../generic/AppDateInput';

function SignupForm(props){
    window.mlog('SignupModule', props);
    //const { error, pending, user, loggedIn } = props;
    const [error, setError] = useState(null);
    const [ submitted, setSubmitted] = useState(false);

    const {signup, currentUser, updateName} = useContext(AuthContext);//useAuth();
    window.mlog('SignupForm', currentUser);
    const submitForm =  async (userInput, {setSubmitting}) => {
        setSubmitting(true);
        window.mlog(userInput, setSubmitting);
        if(error){
            setError(null);
        }
        try{
            window.mlog('Logging', userInput);
            await signup(userInput);
            window.mlog('after await', currentUser);
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
            //await addUser(user);
            await addUserProfile(user);
            await updateName(userInput.fname);
            if(typeof props.onComplete === 'function'){
                props.onComplete();
            }
        }catch(err){
            console.error(err);
        }finally{
            setSubmitting(false);
            setSubmitted(true);
        }
        
        
    }
    return (
        <div className="col-12 col-md-8 col-lg-7 p-0 m-0">
          {
              currentUser && <SuccessMessage message={"You are logged in!"} />
          }
        <div className={"signup-form-container" + (currentUser ? ' d-none' : "")}>
            <div className="signup-form-header mb-4 pl-2 pr-2 h3 font-weight-normal w-100 text-center">Sign up for free to start shopping</div>
            <div className={"signup-form"}>
              <AppForm
                onSubmit={submitForm}
                validationSchema={SIGNUP_FORM_SCHEMA}
                initialValues={{email: (props.email || ""), password: '', confirmpassword: '', fname: '', day: '', month: '', year: '', lname: '', gender: ''}} >
                

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
            </div>
        </div>
          
        </div>
      );
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
 */

 export default SignupForm;