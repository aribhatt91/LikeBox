import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import EventTracker from '../../../../libs/api/EventTracker';
//import { logClickSubscriptionCTA } from '../../../../libs/api/analytics/ui';
import { AuthContext } from '../../../../libs/store/contexts/AuthContext';
import SubscriptionForm from '../../../components/_forms/SubscriptionForm';

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
                //logClickSubscriptionCTA();
                EventTracker.trackEvent(EventTracker.events.ui.HOME_PAGE_SUBSCRIPTION_CTA);
                let methods = await fetchSignInMethods(userInput.email)
                window.loginfo(methods);
                if(methods.length === 0){
                    //Signup user
                    //window.loginfo('Signup user');
                    history.push('/register?email=' + window.encodeURIComponent(userInput.email));
                }else if(methods.indexOf('password') > -1){
                    //Sign in user
                    //window.loginfo('Sign in user');
                    history.push('/login?method=password&email=' + window.encodeURIComponent(userInput.email));
                }else if(methods.indexOf('google.com') > -1){
                    history.push('/login?method=google');
                }

            }catch(err){
                window.logerror('fetchSignInMethods', err);
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
