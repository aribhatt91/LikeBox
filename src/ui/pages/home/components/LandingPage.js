import React from 'react';
import SubscriptionComponent from './SubscriptionComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AppImage from '../../../components/_generic/AppImage';
import FAQS from '../../../../libs/constants/faqs';
import Accordion from '../../../components/_generic/Accordion';
/* import R1 from '../../../../assets/img/rtb1.png';
import R2 from '../../../../assets/img/rtb2.png';
import R3 from '../../../../assets/img/rtb3.png'; */
import BrandCarousel from './BrandCarousel';
import BlogSection from './BlogSection';
import ReasonsToBuy from './ReasonsToBuy';
import HeroBanner, { HeroContent, HeroMedia } from './HeroBanner';
import AppButton from '../../../components/_generic/AppButton';
import Features from './Features';

export default function LandingPage({slideIn, slideOut, onComplete, setRegistered}) {
    return (
        <div className={"like-box-home" + (!slideIn && !slideOut ? " slide-hold" : "") + (slideOut ? " slide-out" : "") + (slideIn ? " slide-in" : "")}>
        
            {/* <section className="like-box-home-section w-100">
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
                        <SubscriptionComponent onComplete={onComplete} setRegistered={setRegistered} />
                    </div>
                </div>
            </section> */}
            <HeroBanner className='like-box-home-section p-0'>
                <HeroMedia>
                    <LazyLoadImage effect="opacity" className="w-100 h-100 top-0 left-0" src="https://firebasestorage.googleapis.com/v0/b/the-likebox.appspot.com/o/Hero_2023_desktop_5120x2880.jpeg?alt=media&token=4fe3d6d3-2c30-41b0-b320-2e162a1f7e05" />
                </HeroMedia>
                <HeroContent>
                    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center pr-5 pl-5'>
                        <h2 className="like-box-header-1 mb-3 text-white text-center font-weight-bold text-uppercase">EFFORTLESSLY UPGRADE YOUR WARDROBE</h2>
                        <h4 className='text-center text-white mb-5'>Save time and shop smarter with expertly curated outfits tailored to your taste and body type</h4>
                        <AppButton rounded={false} variant='primary' label={'BUILD YOUR WARDROBE'} className={'mb-3'} href={'/register'} />
                        <span className='text-center text-white w-100'>On average it only takes 93 seconds to complete</span>
                    </div>
                </HeroContent>
            </HeroBanner>
            <section className="w-100 p-0 m-0">
                <ReasonsToBuy />
            </section>
            <section className="w-100 p-0 m-0">
                <Features/>
            </section>
            <section className='bg-light w-100'>
                <div className='container text-center d-flex flex-column align-items-center pt-5 pb-5'>
                    <h3 className='text-center font-weight-bold mb-4'>FIND THE RIGHT CLOTHES FOR YOU</h3>
                    <h6 className='text-center mb-5'>Likebox has clothes for everyone’s style and for every occasion. <br className='d-none d-lg-block'/>Answer 1 simple question to save yourself hours shopping.</h6>
                    <AppButton href={'/register'} rounded={false} label={'Show us your style'}></AppButton>
                </div>
            </section>
            <section className="brands w-100 p-0 m-0">
                <BrandCarousel />
            </section>
            {/* <section className="like-box-reasons w-100">
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
            </section> */}
            {/* <section className="likebox-what-is w-100">
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
            </section> */}
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
            <BlogSection />
        </div>
    )
}
