import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import CartService from './../../service/cartOperation';
function CartLink(props) {
    const { cart, fetchCart } = props;
    useEffect(() => {
        fetchCart();
    }, [])
    return (
        <React.Fragment>
            <span className="d-sm-inline-block d-md-none">My Cart</span>
            <span className="d-none d-md-inline position-relative">
                <FontAwesomeIcon icon={faCartPlus}/>
                {cart && cart.count && <span className="cart-count">{cart.count}</span>}
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