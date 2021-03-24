import React, {useContext, useState, useEffect } from 'react'
import LikeBoxPreference from './LikeBoxPreference'
import {EMAIL_FORM_SCHEMA, LOGIN_FORM_SCHEMA} from '../../service/validationSchema';
import AppForm from './forms/AppForm';
import AppTextInput from './generic/AppTextInput';
import AppSubmitButton from './generic/AppSubmitButton';
import { AuthContext } from './../../store/contexts/AuthContext';
import LikeBoxCarousel from './LikeBoxCarousel';
import AppRadioInput from './generic/AppRadioInput';
import SignupForm from './forms/SignupForm';
import LoginForm from './forms/LoginForm';
import LikeBoxHomePage from './LikeBoxHomePage';
import { getUserSizing, isFirstLoad } from './../../service/api/firestore/user';
import { useHistory } from 'react-router';
import { useNotification } from './../../store/contexts/NotificationProvider';
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
            <div className={"email-reg-form"}>
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
                        <AppSubmitButton
                            text="Get started"
                            className="border-radius-0"
                        />
                    </div>
                </AppForm>
            </div>
        </React.Fragment>
    )
}

function LikeBoxSignup({slideOut, slideIn, registered, email, onComplete}) {
    //console.log('LikeBoxSignup', email);
    return (
        <div className={"like-box-signup mb-5 mt-5" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
            {
                registered && email !== '' && <LoginForm email={email} onComplete={onComplete} />
                
            }
            {
                !registered && email !== '' && <SignupForm onComplete={onComplete} email={email}/>
            }
        </div>
    )
}

function LikeBoxLandingPage({slideIn, slideOut, onComplete, setRegistered}) {
    return (
        <div className={"like-box-home" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
            <section className="like-box-home-section d-flex flex-column mr-auto ml-auto">
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
            </section>
        </div>
    )
}


export default function LikeBox() {
    const {currentUser} = useContext(AuthContext);
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(0);
    const history = useHistory();
    const dispatch = useNotification();

    let items = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'];
    console.log('LikeBox show', show);
    useEffect(() => {
        if(currentUser){
            (async () => {
                let firstLoad = await isFirstLoad(currentUser.email);
                if(firstLoad){
                    setShow(2);
                }else {
                    setShow(4);                    
                }
            })()
        }
        //setTimeout(handleNewNotification, 5000);
    }, [currentUser])

    const goToLikeBox = () => {
        history.push('/likebox');
    }
    const handleNewNotification = () => {
        console.log('handleNewNotification called');
        dispatch({
          type: "ERROR",
          message: 'Heelooo',
          title: "Successful Request"
        })
      }

    return (
        <div className="container">
            {show !== 4 && <div className="like-box">
                {!currentUser && 
                <React.Fragment>
                    <LikeBoxLandingPage
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
                </React.Fragment>}
                <LikeBoxPreference
                    slideOut={show > 2}
                    slideIn={show === 2}
                    skip={true}
                    onComplete={goToLikeBox}
                />
                {/* <LikeBoxCarousel
                    slideOut={show > 3}
                    slideIn={true || show === 3}
                    onComplete={() => {setShow(4)}}
                /> */}
                
            </div>}
            {show === 4 && <LikeBoxHomePage 
                slideIn={show === 4}
            />}
        </div>
    )
}
