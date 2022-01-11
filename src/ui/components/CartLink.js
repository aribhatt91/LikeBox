import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventTracker from '../../service/api/EventTracker';
import CartService from '../../service/CartService';
import BagIcon from './svg-components/BagIcon';

function CartLink(props) {
    const { cart, fetchCart } = props;

    useEffect(() => {
        if(cart) {
            EventTracker.trackEvent(EventTracker.events.transaction.UPDATE_CART, cart);
        }
    }, [cart])
    
    useEffect(() => {
        if(props.user){
            fetchCart(props.user.email);
        }
    }, [props.user])
    return (
        <React.Fragment>
            <span className="d-sm-inline-block d-md-none">My Bag</span>
            <span className="d-none d-md-inline position-relative">
                <BagIcon size={24}/>
                {/*cart && cart.count && <span className="cart-count">{cart.count}</span>*/}
            </span>
            
        </React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
        cart: state.cartReducer.cart
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchCart: CartService.fetchCart}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartLink);