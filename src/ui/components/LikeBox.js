import React, {useContext, useState} from 'react'
import LikeBoxPreference from './LikeBoxPreference'
import {EMAIL_FORM_SCHEMA, LOGIN_FORM_SCHEMA} from '../../service/validationSchema';
import AppForm from './forms/AppForm';
import AppTextInput from './generic/AppTextInput';
import AppSubmitButton from './generic/AppSubmitButton';
import { AuthContext } from './../../store/contexts/AuthContext';
import LikeboxCarousel from './LikeboxCarousel';
import AppRadioInput from './generic/AppRadioInput';
import SignupForm from './forms/SignupForm';
import LoginForm from './forms/LoginForm';

function LikeBoxEmailForm({onComplete, setRegistered}) {
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
                    setRegistered(false, userInput.email);
                }else if(methods.indexOf('password') > -1){
                    //Sign in user
                    console.log('Sign in user');
                    setRegistered(true, userInput.email);
                }
                if(typeof onComplete === 'function'){
                    setTimeout(onComplete, 750);
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
                                className="border-radius-0"
                        />
                    </div>
                </AppForm>
            
            
            
            </form>
        </React.Fragment>
    )
}

function LikeBoxSignup({slideOut, slideIn, registered, email, onComplete}) {
    return (
        <div className={"like-box-signup mb-5 mt-5" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
            {
                registered && <LoginForm onComplete={onComplete} />
                
            }
            {
                !registered && <SignupForm onComplete={onComplete} email={email}/>
            }
        </div>
    )
}

function LikeBoxHome({slideIn, slideOut, onComplete, setRegistered}) {
    return (
        <div className={"like-box-home" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
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
                    <LikeBoxEmailForm onComplete={onComplete} setRegistered={setRegistered} />
                </div>
                <div className="like-box-descriptor-container mt-5 row m-0">
                    <h1 className="like-box-header-1 font-weight-bold text-center w-100">What is Likebox?</h1>
                    <div className="col-12 col-md-4 like-box-desc p-3">
                        <figure className="like-box-desc-fig">
                            
                        </figure>
                        <div className="like-box-desc-header text-uppercase text-center">Build your profile</div>
                        <div className="like-box-subheader-p text-center">Tell us which brands and items you like to give us an idea of what you're into</div>
                    </div>
                    <div className="col-12 col-md-4 like-box-desc p-3">
                        <figure className="like-box-desc-fig">
                            
                        </figure>
                        <div className="like-box-desc-header text-uppercase text-center">Personalised feed</div>
                        <div className="like-box-subheader-p text-center">We select new items that suit you, specific to your taste</div>
                    </div>
                    <div className="col-12 col-md-4 like-box-desc p-3">
                        <figure className="like-box-desc-fig">
                            
                        </figure>
                        <div className="like-box-desc-header text-uppercase text-center">Easy checkout</div>
                        <div className="like-box-subheader-p text-center">Buy from your favourite stores all in one place</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LikeBox() {
    const {currentUser} = useContext(AuthContext);
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(0);

    let items = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'];
    return (
        <div className="container">
            <div className="like-box">
                <LikeBoxHome
                    slideOut={show > 0}
                    slideIn={show === 0}
                    setRegistered={(reg, em) => {
                            setRegistered(reg);
                            if(em){
                                setEmail(em);
                            }
                        }
                    }
                    onComplete={() => {setShow(1)}}
                />
                <LikeBoxSignup 
                    registered={registered} 
                    slideOut={show > 1}
                    slideIn={show === 1}
                    onComplete={() => {setShow(2)}}
                    email={email}
                />
                <LikeBoxPreference
                    slideOut={show > 2}
                    slideIn={show === 2}
                    onComplete={() => {setShow(3)}}
                />
                <LikeboxCarousel
                    items={items}
                    slideOut={show > 3}
                    slideIn={show === 3}
                    onComplete={() => {setShow(4)}}
                />
            </div>
        </div>
    )
}
