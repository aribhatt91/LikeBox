import React, {useContext} from 'react'
import LikeBoxPreference from './LikeBoxPreference'
import {EMAIL_FORM_SCHEMA} from '../../service/validationSchema';
import AppForm from './forms/AppForm';
import AppTextInput from './generic/AppTextInput';
import AppSubmitButton from './generic/AppSubmitButton';
import { AuthContext } from './../../store/contexts/AuthContext';
import LikeboxCarousel from './LikeboxCarousel';

function LikeBoxEmailForm({}) {
    const {fetchSignInMethods} = useContext(AuthContext);
    const validationSchema = EMAIL_FORM_SCHEMA;
    async function submitForm (userInput, {setSubmitting}){
        setSubmitting(true);
        if(userInput.email){
            try {
                let methods = await fetchSignInMethods(userInput.email)
                console.log(methods);
                if(methods.length === 0){
                    //Signup user
                    console.log('Signup user');
                }else if(methods.indexOf('password') > -1){
                    //Sign in user
                    console.log('Sign in user');
                }
            }catch(err){
                console.error(err);
            }
        }
        setSubmitting(false);
    }
    return (
        <React.Fragment>
            <p className="like-box-subheader-p">Ready to start shopping? Enter your email to create your FREE account</p>
            <form className={"email-reg-form"}>
                <AppForm
                initialValues={{email: ''}}
                onSubmit= {submitForm}
                validationSchema={validationSchema}>
                    <div className="d-flex">
                        <AppTextInput
                            name="email"
                            label="Enter your email address"
                            type="email"
                        />
{/*                         <input type="text" name="email" className="flex-grow-1" placeholder="Enter your email address"/>
 */}                        <AppSubmitButton
                            type="submit"
                            text="Get started"
                            className="border-radius-0 h-100"
                        />
                    </div>
                </AppForm>
            
            
            
            </form>
        </React.Fragment>
    )
}

function LikeBoxHome() {
    return (
        <div className="like-box-home">
            <div className="like-box-home-section d-flex flex-column mr-auto ml-auto">
                <h1 className="like-box-header-1 font-weight-bold">Clothes shopping has never been easier</h1>
                <p className="like-box-subheader-p">Likebox is your own personal shopping assistant</p>
                <div className="like-box-stm-container">
                    <div className="like-box-stm">
                        <div className="like-box-header-1">You</div>
                        <div className="like-box-header-1 font-weight-bold">Like</div>
                    </div>
                    <div className="like-box-stm">
                        <div className="like-box-header-1">We</div>
                        <div className="like-box-header-1 font-weight-bold">Tailor</div>
                    </div>
                    <div className="like-box-stm">
                        <div className="like-box-header-1">You</div>
                        <div className="like-box-header-1 font-weight-bold">Shop</div>
                    </div>
                </div>
                <div className="like-box-email-form-container">
                    <LikeBoxEmailForm/>
                </div>
                <div className="like-box-descriptor-container">
                    
                </div>
            </div>
        </div>
    )
}

export default function LikeBox() {
    let items = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'];
    return (
        <div className="container">
            <div className="like-box">
                <LikeBoxHome/>
                <LikeBoxPreference/>
                <LikeboxCarousel
                    items={items}
                />
            </div>
        </div>
    )
}
