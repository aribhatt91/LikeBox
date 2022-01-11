import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from '../../../service/CartService';
import Accordion from '../../components/generic/Accordion';
import AppButton from '../../components/generic/AppButton';
import { AuthContext } from '../../../store/contexts/AuthContext';
import Page from '../Page';
import EventTracker from '../../../service/api/EventTracker';
import LoadingModule from '../../components/LoadingModule';
import ErrorModule from '../../components/ErrorModule';
import CheckoutService, {DELIVERY_OPTIONS, PAYMENT_METHODS} from '../../../service/CheckoutService'


import AddressList from './components/AddressList';
import PaymentMethods from './components/PaymentMethods';
import DeliveryOptions from './components/DeliveryOptions';
import OrderConfirmation from './components/OrderConfirmation';
const EMPTY_TEXT = "You have no items in your cart!",

function Checkout(props) {

    const [stage, setStage] = useState(0);
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
        try {
            fetchCart(currentUser.email);
        }catch(err){
            window.mlog(err);
        }
    }, [currentUser])

    useEffect(() => {
        if(cart && !error){
            EventTracker.trackEvent(EventTracker.events.transaction.START_CHECKOUT, cart);
        }
    }, [cart])

    const selectAddress = (address) => {
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
    }

    const placeOrder = async () => {
        if(stage === 3){
            setStage(4);
            try{
                const res = await CheckoutService.placeOrder(cart);
                //Clear Cart
                clearCart(currentUser.email);
                setStage(5);
            }catch(err){
                setStage(6);
                console.error('Checkout:placeOrder::error', err);
            }
            
        }
    }

    return (
        <Page pageName="Checkout">
            <div className="checkout-container mt-5 mb-5 container">
                {fetch_pending && <LoadingModule />}

                {!fetch_pending && (error || !cart || (cart.products || []).length <= 0) && <ErrorModule
                    
                    error_text={EMPTY_TEXT}
                />}

                {!error && stage === 5 && <OrderConfirmation />}

                {cart && !fetch_pending && <React.Fragment>
                    <div className="d-flex flex-column flex-md-row mb-4 bordered-bottom">
                        <section className="checkout-form pr-md-3">
                            <Accordion 
                                label="Select delivery address">
                                <AddressList
                                    user={currentUser}
                                    onSelect={selectAddress}
                                    defOpen={true}
                                    />
                            </Accordion>
                            <Accordion 
                                label="Select payment method"
                                defDisabled={stage < 1}
                                defOpen={stage >= 1}>
                                <PaymentMethods
                                    onSelect={selectPaymentMethod}
                                    options={PAYMENT_METHODS}/>
                            </Accordion>
                            <Accordion 
                                label="Select delivery option"
                                defDisabled={stage < 2}
                                defOpen={stage >= 2}>
                                <DeliveryOptions
                                    onSelect={selectDeliveryOption}
                                    options={DELIVERY_OPTIONS}/>
                            </Accordion>

                        </section>
                        <section className="checkout-summary-panel">

                        </section>
                    </div>
                    <section className="checkout-button-container">
                        <AppButton 
                            onClick={placeOrder} 
                            loading={stage === 4} 
                            className="border-radius-0 w-100" 
                            label="Place order" 
                            disabled={stage < 3} />
                    </section>
                </React.Fragment>}

            </div>
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