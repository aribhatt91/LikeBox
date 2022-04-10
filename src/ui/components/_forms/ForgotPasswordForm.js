import React, {useState, useEffect, useContext} from 'react'
import AppMessage, { SuccessMessage } from './../_generic/AppMessage';
import AppTextInput from './../_generic/AppTextInput';
import AppForm from './AppForm';
import AppSubmitButton from './../_generic/AppSubmitButton';
import { AuthContext } from './../../../libs/store/contexts/AuthContext';
import { EMAIL_FORM_SCHEMA } from './../../../libs/ValidationSchema';

export default function ForgotPasswordForm() {
    const [submitted, setSubmitted] = useState(false);

    const [error, setError] = useState(null);
    const {currentUser, resetPassword} = useContext(AuthContext);
    const initialValues = {email: ""};
    const submitForm = async (userInput, {setSubmitting}) => {
        setSubmitting(true);
        setError(null);
        //window.loginfo(userInput);
        try{
            await resetPassword(userInput.email);
            
            if(error){
                setError(null);
            }
        }catch(err){
            window.logerror('logging error', err);
            setError('Please check the email address you have entered');
        }finally {
            setSubmitting(false);
            setSubmitted(true);
            
        }
        
        
    }
    return (
        
            <div className="col-12 col-md-7 col-lg-5 p-0 mt-0 mb-0 m-auto">
                {
                submitted && !error && <SuccessMessage message={"Sent an email to reset password. Check your inbox for further instructions"} />
                }
        
                <div className={"login-form-container" + (submitted && !error ? ' d-none' : "")}>
                <div className="login-form-header mb-4 pl-2 pr-2 h3 font-weight-normal text-center">Reset your password</div>
                    <form className={"login-form"}>
            
                        <AppForm
                            initialValues={initialValues}
                            onSubmit={submitForm}
                            validationSchema={EMAIL_FORM_SCHEMA}>
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
                            </div>
            
                            <div className="row m-0 mt-3 d-flex justify-content-start">
                            <div className="pl-2 pr-2 col-12">
                                <AppSubmitButton
                                    text="Reset password"
                                    className="w-100"
                                />
                            </div>
                            </div>
            
                        </AppForm>
                    </form>
                </div>
                
            </div>
      )
}
