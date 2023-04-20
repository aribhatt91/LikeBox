import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from '../../../libs/CartService';
import Accordion from '../../components/_generic/Accordion';
import AppButton from '../../components/_generic/AppButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import Page from '../Page';
import EventTracker from '../../../libs/api/EventTracker';
import LoadingModule from '../../components/LoadingModule';
import ErrorModule from '../../components/ErrorModule';
import CheckoutService, {DELIVERY_OPTIONS, PAYMENT_METHODS} from '../../../libs/CheckoutService'
import PriceText from '../../components/_generic/PriceText';

import AddressList from './components/AddressList';
import PaymentMethods from './components/PaymentMethods';
import DeliveryOptions from './components/DeliveryOptions';
import OrderConfirmation from './components/OrderConfirmation';
import Checkoutstatusbar from './components/CheckoutStatusBar';
import './style.page.css';

const EMPTY_TEXT = "You have no items in your cart!",
    ERROR_TEXT = "Something went wrong! Refresh and try again";

function Checkout(props) {

    const [stage, setStage] = useState(0);
    const [deliveryCost, setDeliveryCost] = useState(0);

    /* 
    0 - Address not selected
    1 - Addresses selected
    2 - Payment Method selected
    3 - Delivery Method selected (Enable Order CTA)
    4 - Order CTA Clicked
    5 - Order Confirmed
    6 - Error
    */

    const { fetchCart, clearCart, error, cart, fetch_pending} = props;

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        if(!currentUser) return;
        try {
            fetchCart(currentUser.email);

        }catch(err){
            window.loginfo(err);
        }
    }, [currentUser])

    useEffect(() => {
        if(cart && cart.id && cart.count > 0 && !error && !fetch_pending){
            EventTracker.trackEvent(EventTracker.events.transaction.START_CHECKOUT, cart);
        }
    }, [cart, fetch_pending]);

    const selectAddress = (address) => {
        window.loginfo('selectAddress::', address, stage);
        if(stage < 1){
            setStage(1);
        }
        CheckoutService.selectAddress(address);
    }

    const selectPaymentMethod = (index) => {
        if(stage < 2){
            setStage(2);
        }
        CheckoutService.selectPaymentMethod(PAYMENT_METHODS[index]);
    }

    const selectDeliveryOption = (index) => {
        if(stage < 3){
            setStage(3);
        }
        CheckoutService.selectDeliveryOption(DELIVERY_OPTIONS[index]);
        setDeliveryCost(DELIVERY_OPTIONS[index].cost);
    }

    const placeOrder = async () => {
        if(stage === 3){
            setStage(4);
            try{
                const res = await CheckoutService.placeOrder(currentUser, cart);
                //Clear Cart
                clearCart(currentUser.email);
                setStage(5);
            }catch(error){
                setStage(6);
                window.logerror('Checkout:placeOrder::error', error);
            }
            
        }
    }

    return (
        <Page pageName="Checkout" className="position-relative">
            
            {fetch_pending && <LoadingModule/>}

            {!fetch_pending && <div className="checkout-container mt-5 mb-5 container position-relative">

                <h1 className="mt-2 mb-3 text-center text-uppercase">Checkout</h1>

                {!error && (cart && cart.count > 0) && <Checkoutstatusbar step={stage} />}

                {(error || !cart || (cart.products || []).length <= 0) && stage <= 0 && <ErrorModule    
                    error={EMPTY_TEXT}
                />}

                {!error && stage === 5 && <OrderConfirmation />}

                {!error && stage === 6 && <ErrorModule error={ERROR_TEXT} />}

                {!error && stage < 5 && cart && cart.id && (cart.products || []).length > 0 && <React.Fragment>
                    <div className="d-flex flex-column flex-md-row mb-4 bordered-bottom">
                        <section className="checkout-form pr-md-3 w-100">
                            <Accordion 
                                label="Select delivery address"
                                defOpen={true}>
                                <AddressList
                                    user={currentUser}
                                    onSelect={selectAddress}
                                    />
                            </Accordion>
                            <Accordion 
                                label="Select payment method"
                                disabled={stage < 1}
                                defOpen={stage >= 1}>
                                <PaymentMethods
                                    onSelect={selectPaymentMethod}
                                    options={PAYMENT_METHODS}/>
                            </Accordion>
                            <Accordion 
                                label="Select delivery option"
                                disabled={stage < 2}
                                defOpen={stage >= 2}>
                                <DeliveryOptions
                                    onSelect={selectDeliveryOption}
                                    options={DELIVERY_OPTIONS}/>
                            </Accordion>

                        </section>
                        <section className="checkout-summary-panel">
                            <div className="d-flex flex-column justify-content-between h-100">

                                
                                <div className="checkout-summary d-flex flex-column p-3">
                                    <h4 className="mb-4 d-none d-md-flex text-uppercase w-100">
                                        Summary
                                    </h4>
                                    <div className="d-flex justify-content-between w-100">
                                        <p className="pr-2 text-uppercase">Items</p>
                                        <p className="pl-2">{cart.count}</p>
                                    </div>
                                    <div className="d-flex justify-content-between w-100">
                                        <p className="pr-2 text-uppercase">Sub-total</p>
                                        <p className="pl-2"><PriceText value={cart.total} /></p>
                                    </div>
                                    <div className="d-flex justify-content-between w-100">
                                        <p className="pr-2 text-uppercase">Delivery charge</p>
                                        <p className="pl-2"><PriceText value={deliveryCost} /></p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3 w-100">
                                        <h5 className="pr-2 text-uppercase">You pay</h5>
                                        <h5 className="pl-2"><PriceText value={(cart.total + deliveryCost)} /></h5>
                                    </div>
                                    
                                </div>
                            </div>

                            
                        </section>
                    </div>
                    <section className="checkout-button-container mt-3 mb-5">
                        <AppButton 
                            onClick={placeOrder} 
                            loading={stage === 4} 
                            rounded={false}
                            className="w-100" 
                            label="Place order" 
                            disabled={stage < 3} />
                    </section>
                </React.Fragment>
                }

            </div>}
        </Page>
    )
}


const mapStateToProps = state => {
    return {
        fetch_pending: state.cartReducer.fetch_pending,
        cart: state.cartReducer.cart,
        error: state.cartReducer.error
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        fetchCart: CartService.fetchCart, 
        addToCart: CartService.addToCart, 
        removeFromCart: CartService.removeFromCart, 
        clearCart: CartService.clearCart,
        isCartEmpty: CartService.isEmpty()
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);