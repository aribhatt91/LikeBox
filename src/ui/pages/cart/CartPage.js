import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThemedButton from './../../components/generic/ThemedButton';
import CartService from './../../../service/cartOperation';
import Page from './../Page';
import CartProduct from './../../components/CartProduct'; 
import LoadingModule from '../../components/LoadingModule';

function CartPageSidePanel(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-5">Summary</h2>
            <div className="col-6 float-left">Subtotal</div>
            <div className="col-6 float-left align-text-right">&#x20B9;{props.subTotal}</div>
            <div className="col-6 float-left">Savings</div>
            <div className="col-6 float-left align-text-right">&#x20B9;{props.savings}</div>
            {props.promoApplied && <div className="col-6 float-left">Promo code</div>}
            {props.promoApplied && <div className="col-6 float-left align-text-right">{props.promoCode}</div>}
            <div className="col-6 float-left mt-4"><h4>Total</h4></div>
            <div className="col-6 float-left mt-4 align-text-right"><h4>&#x20B9;{props.total}</h4></div>
            <div className="cart_sidePanel-buttons">
                <div className="d-inline-block align-center float-left col-sm-12 col-md-4 col-lg-12 mt-3 mb-1">
                    <ThemedButton url="/checkout" btnText="Checkout" theme="accent" btnState="active"></ThemedButton>
                </div>
                <div className="col-sm-12 col-lg-12 col-md-4 d-flex justify-content-center align-items-center pt-1 pb-1">Or</div>
                <div className="left_btn_wrapper d-inline-block float-left col-sm-12 col-md-6 col-lg-12 mt-1 mb-3">
                    <ThemedButton className="col-lg-12" url="/" btnText="Continue shopping" theme="grey" btnState="active"></ThemedButton>
                </div>
            </div>
        </div>
    )
}

class CartPage extends Page {
    constructor(props){
        super(props);
        
    }

    componentDidMount() {
        const {fetchCart} = this.props;
        fetchCart();
    }
    render() {
        const {addToCart} = this.props;
        const {removeFromCart} = this.props;
        return (
            
            <div className="checkout_container">
                {this.props.fetch_pending && <LoadingModule text="Please wait..."></LoadingModule>}
                {!this.props.fetch_pending && !this.props.error && 
                    <section className="cart_body">
                        <div className="float-left pl-4 pr-4">
                            {
                            (this.props.cart.products || []).map((item, index) => {
                                return (
                                    <CartProduct 
                                    key={index} 
                                    item={item}
                                    currency={this.props.cart.currency}
                                    _incrementItemCount={addToCart}
                                    _decrementItemCount={removeFromCart}
                                    _removeItem={removeFromCart}
                                    ></CartProduct>)
                            })
                            }
                        </div>
                        <CartPageSidePanel
                            subTotal={this.props.cart.subTotal}
                            total={this.props.cart.total}
                            savings={this.props.cart.savings}
                            promoApplied={this.props.cart.promoApplied}
                            promoCode={this.props.cart.promoCode}
                            curr={this.props.cart.currency}
                        ></CartPageSidePanel>
                    </section>
                }
            </div>
        );
    }
     
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
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchCart: CartService.fetchCart, addToCart: CartService.addToCart, removeFromCart: CartService.removeFromCart, isCartEmpty: CartService.isEmpty()}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
