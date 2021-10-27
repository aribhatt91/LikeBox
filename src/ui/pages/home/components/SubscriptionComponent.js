import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { logClickSubscriptionCTA } from '../../../../service/api/analytics/ui';
import { AuthContext } from '../../../../store/contexts/AuthContext';
import SubscriptionForm from '../../../components/forms/SubscriptionForm';
export default function SubscriptionComponent({onComplete}) {
    const {fetchSignInMethods} = useContext(AuthContext);
    const history = useHistory();
    //const validationSchema = EMAIL_FORM_SCHEMA;
    async function submitForm (userInput, {setSubmitting}){
        setSubmitting(true);
        if(userInput.email){
            try {
                /* 
                GA Event
                */
                logClickSubscriptionCTA();
                let methods = await fetchSignInMethods(userInput.email)
                //window.mlog(methods);
                if(methods.length === 0){
                    //Signup user
                    //window.mlog('Signup user');
                    history.push('/register?email=' + window.encodeURIComponent(userInput.email));
                }else if(methods.indexOf('password') > -1){
                    //Sign in user
                    //window.mlog('Sign in user');
                    history.push('/login?email=' + window.encodeURIComponent(userInput.email));
                }

            }catch(err){
                console.error('fetchSignInMethods', err);
            }
        }
        setSubmitting(false);
    }
    return (
        <React.Fragment>
            <p className="like-box-subheader-p">Ready to start shopping? Enter your email to create your FREE account</p>
            <div className={"email-reg-form"}>
                <SubscriptionForm subscribe={submitForm} />
            </div>
        </React.Fragment>
    )
}
