import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from './../../service/cartOperation';
import bag_icon from '../../assets/img/bag.png';
function CartLink(props) {
    const { cart, fetchCart } = props;
    
    useEffect(() => {
        if(props.user){
            fetchCart(props.user.email);
        }
    }, [props.user])
    return (
        <React.Fragment>
            <span className="d-sm-inline-block d-md-none">My Cart</span>
            <span className="d-none d-md-inline position-relative">
                {/* <FontAwesomeIcon icon={faCartPlus}/> */}
                <img src={bag_icon} className="nav_icon"/>
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