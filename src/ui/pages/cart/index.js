import React, {useState, useContext, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from '../../../libs/CartService';
import Page from '../Page';
import CartItem from './components/CartItem'; 
import LoadingModule from '../../components/LoadingModule';
import ErrorModule from '../../components/ErrorModule';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import CartSummary from './components/CartSummary';
import EventTracker from '../../../libs/api/EventTracker';
import './style.page.css';

const EMPTY_TEXT = "You have no items in your cart!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";


function Cart(props) {
    const {addToCart, removeFromCart, fetchCart, error, cart, fetch_pending} = props;

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        try {
            fetchCart(currentUser.email);
        }catch(err){
            window.loginfo(err);
        }
    }, [currentUser])

    useEffect(() => {
        if(cart && !error){
            EventTracker.trackEvent(EventTracker.events.transaction.VIEW_CART, cart);
        }
    }, [cart])

    const removeItem = (item) => {
        removeFromCart(currentUser.email, item, false);
        EventTracker.trackEvent(EventTracker.events.product.REMOVE_FROM_CART, item);
    }

    return (
        
        <Page pageName="Cart" className="position-relative">
            {fetch_pending && <LoadingModule/>}
            {!fetch_pending && <div className="cart-container mt-5 mb-5 container">
                <h1 className="text-center mb-5 text-uppercase">Shopping bag</h1>
                
                { (error || !cart || (cart.products || []).length <= 0) && <ErrorModule
                    
                    error_text={EMPTY_TEXT}
                />}
                {!error && (cart.products || []).length > 0 &&

                    <section className="cart-body">
                        <div className="cart-product-list pl-md-4 pr-md-4 flex-grow-1">
                            {
                            (cart.products || []).map((item, index) => <CartItem
                                        key={item.id} 
                                        item={item}
                                        removeItem={() => removeItem(item)}
                                    />)
                            }
                        </div>
                        <CartSummary
                            cart={cart}
                        />
                    </section>
                }
            </div>}
            
        </Page>
    ); 
}

const mapStateToProps = state => {
    return {
        fetch_pending: state.cartReducer.fetch_pending,
        add_pending: state.cartReducer.add_pending,
        remove_pending: state.cartReducer.remove_pending,
        cart: state.cartReducer.cart,
        error: state.cartReducer.error
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        fetchCart: CartService.fetchCart, 
        addToCart: CartService.addToCart, 
        removeFromCart: CartService.removeFromCart, 
        isCartEmpty: CartService.isEmpty()
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
