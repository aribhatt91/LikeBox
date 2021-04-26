import React, {useState, useEffect, useContext} from 'react'
import PageMessage, { SuccessMessage } from './../generic/PageMessage';
import AppTextInput from './../generic/AppTextInput';
import AppForm from './AppForm';
import AppSubmitButton from './../generic/AppSubmitButton';
import { AuthContext } from './../../../store/contexts/AuthContext';
import { EMAIL_FORM_SCHEMA } from './../../../service/validationSchema';
import Page from '../../pages/Page';

export default function ForgotPasswordForm() {
    const [submitted, setSubmitted] = useState(false);

    const [error, setError] = useState(false);
    const {currentUser, resetPassword} = useContext(AuthContext);
    const initialValues = {},
    submitForm = async (userInput, {setSubmitting}) => {
        setSubmitting(true);
        console.log(userInput);
        await resetPassword(userInput.email);
        setSubmitting(false);
        setSubmitted(true)
    }
    return (
        <Page className="d-flex justify-content-center" pageName="Forgot password">
            <div className="mt-5 mb-5 d-flex align-center col-12 col-md-7 col-lg-5">
                <div className="col-12 p-0 m-0">
                    {
                    submitted && <SuccessMessage message={"Sent an email to reset password. Check your inbox for further instructions"} />
                    }
            
                    <div className={"login-form-container" + (submitted ? ' d-none' : "")}>
                    <div className="login-form-header mb-4 pl-2 pr-2 h3 font-weight-normal text-center">Reset your password</div>
                    <form className={"login-form"}>
            
                        <AppForm
                        initialValues={initialValues}
                        onSubmit={submitForm}
                        validationSchema={EMAIL_FORM_SCHEMA}>
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
            </div>
          </Page>
      )
}
