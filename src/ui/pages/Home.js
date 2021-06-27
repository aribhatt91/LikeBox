import React, {useContext, useState, useEffect } from 'react'
import { AuthContext } from './../../store/contexts/AuthContext';
import LikeBoxHomePage from '../components/LikeBoxHomePage';
import { useHistory } from 'react-router';
import { useNotification } from './../../store/contexts/NotificationProvider';
import SubscriptionForm from '../components/forms/SubscriptionForm';
import FAQS from './../../service/constants/faqs';
import Accordion from '../components/generic/Accordion';

import R1 from '../../assets/img/rtb1.png';
import R2 from '../../assets/img/rtb2.png';
import R3 from '../../assets/img/rtb3.png';
import AppImage from '../components/generic/AppImage';
import Page from './Page';
import BrandCarousel from '../components/BrandCarousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function LikeBoxEmailForm({onComplete, setRegistered}) {
    const {fetchSignInMethods} = useContext(AuthContext);
    const history = useHistory();
    //const validationSchema = EMAIL_FORM_SCHEMA;
    async function submitForm (userInput, {setSubmitting}){
        setSubmitting(true);
        if(userInput.email){
            try {
                let methods = await fetchSignInMethods(userInput.email)
                window.mlog(methods);
                if(methods.length === 0){
                    //Signup user
                    window.mlog('Signup user');
                    //setRegistered(false, userInput.email);

                    history.push('/register?email=' + window.encodeURIComponent(userInput.email));
                }else if(methods.indexOf('password') > -1){
                    //Sign in user
                    window.mlog('Sign in user');
                    //setRegistered(true, userInput.email);
                    history.push('/login?email=' + window.encodeURIComponent(userInput.email));
                }
                /* if(typeof onComplete === 'function'){
                    setTimeout(onComplete, 750);
                } */
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

function LikeBoxLandingPage({slideIn, slideOut, onComplete, setRegistered}) {
    return (
        <div className={"like-box-home" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
            <section className="like-box-home-section w-100">
                <LazyLoadImage effect="opacity" className="bg-image" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/home-page-1166x800.jpg?alt=media&token=12d60918-88a5-4a78-8531-48525a7dcf8a" />
                <div className="container d-flex flex-column pb-5 pt-5">
                    <h1 className="like-box-header-1 font-weight-bold text-uppercase">Clothes shopping has never been easier</h1>
                    <p className="like-box-subheader-p">Likebox is your own personal shopping assistant</p>
                    <div className="like-box-stm-container d-none">
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
                </div>
            </section>
            <section className="like-box-reasons w-100">
                <div className="container">
                    <div className="d-flex col-12 pl-2 pr-2 flex-column flex-lg-row justify-content-lg-between">
                        <div className="col-12 mb-5 mb-lg-0 col-lg-4 d-flex">
                            <div className="reasons-icon">
                                <AppImage className="w-100 h-100" src={R1} />
                            </div>
                            <div className="reasons-text">
                                <h6 className="reasons-text-header font-weight-bold">Likebox Sizing</h6>
                                <p className="reasons-text-subheader mb-0">You'll never order the wrong size again</p>
                            </div>
                        </div>
                        <div className="col-12 mb-5 mb-lg-0 col-lg-4 d-flex">
                            <div className="reasons-icon">
                                <AppImage className="w-100 h-100" src={R2} />
                            </div>
                            <div className="reasons-text">
                                <h6 className="reasons-text-header font-weight-bold">Clothing recommendations</h6>
                                <p className="reasons-text-subheader mb-0">Find the right item for you in minutes</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 d-flex">
                            <div className="reasons-icon">
                                <AppImage className="w-100 h-100" src={R3} />
                            </div>
                            <div className="reasons-text">
                                <h6 className="reasons-text-header font-weight-bold">Find new brands</h6>
                                <p className="reasons-text-subheader mb-0">Explore brands you may never have known about</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="likebox-what-is w-100">
                <div className="container">
                    <div className="like-box-descriptor-container mt-2 mb-2 row m-0">
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
            </section>
            <section className="like-box-faq-section w-100">
                <div className="container">
                    <h1 className="like-box-header-1 font-weight-bold text-center w-100 mt-3 mb-5">Frequently asked questions</h1>
                    <div className="row">
                        {
                            (FAQS.map((item, index) => <div className="col-12 faq-container" key={index}>
                                <Accordion label={item.q}>
                                    <div className="p-3">
                                        {item.a}
                                    </div>
                                </Accordion>
                            </div>))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}


export default function Home() {
    const {currentUser} = useContext(AuthContext);
    const [show, setShow] = useState(0);
    const history = useHistory();
    const dispatch = useNotification();

    useEffect(() => {
        if(currentUser){
            (async () => {
                /* let firstSession = await isFirstSession(currentUser.email);
                window.mlog('LikeBox:isFirstSession', firstSession);
                if(firstSession){
                    //setShow(2);
                }else {
                    setShow(4);                    
                } */
            })()
        }
        //setTimeout(handleNewNotification, 5000);
    }, [currentUser])

    return (
        <React.Fragment>
            {!currentUser && <Page className="like-box container-fluid">
                    <LikeBoxLandingPage
                        slideOut={false}
                        slideIn={true}
                    />
                <BrandCarousel />
            </Page>}
            {currentUser && <LikeBoxHomePage 
                slideIn={show === 4}
            />}
        </React.Fragment>
    )
}
