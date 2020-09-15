import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThemedButton from './../../components/ThemedButton';
import CartService from './../../../service/cartOperation';
import Page from './../Page';
import CartProduct from './../../components/CartProduct'; 

function CartPageSidePanel(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-5">Summary</h2>
            <div className="col-6 float-left">Subtotal</div>
            <div className="col-6 float-left align-text-right">{props.curr + ". " + props.subTotal}</div>
            <div className="col-6 float-left">Savings</div>
            <div className="col-6 float-left align-text-right">{props.curr + ". " + props.savings}</div>
            {props.promoApplied && <div className="col-6 float-left">Promo code</div>}
            {props.promoApplied && <div className="col-6 float-left align-text-right">{props.promoCode}</div>}
            <div className="col-6 float-left mt-4"><h4>Total</h4></div>
            <div className="col-6 float-left mt-4 align-text-right"><h4>{props.curr + ". " + props.total}</h4></div>
            <div className="cart_sidePanel-buttons">
                <div className="d-inline-block align-center float-left col-sm-12 col-md-4 col-lg-12 mt-3 mb-1">
                    <ThemedButton url="/checkout" btnText="Checkout" type="accent" btnState="active"></ThemedButton>
                </div>
                <div className="col-sm-12 col-lg-12 col-md-4 d-flex justify-content-center align-items-center pt-1 pb-1">Or</div>
                <div className="left_btn_wrapper d-inline-block float-left col-sm-12 col-md-6 col-lg-12 mt-1 mb-3">
                    <ThemedButton className="col-lg-12" url="/" btnText="Continue shopping" type="grey" btnState="active"></ThemedButton>
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

    /*
    let PRODUCTS = [
        {
            productId: "269232-01",
            productName: "Unisex Black Woven Design Synthetic Mid-Top Troy MU IDP Sneakers",
            productImg: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/12/19/afee4051-1363-40f7-b8dd-4f0a8daeb3b31576708499697-1.jpg",
            fullPrice: 3999.00,
            salePrice: 1999.00,
            quantity: 1,
            size: 6
        },
        {
            productId: "281477-01",
            productName: "Unisex Grey IMAGINEE Slip-On Sneakers",
            productImg: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8479065/2019/9/17/81ed2431-9093-4c2f-ac13-8a078682aba91568697270971-DIESEL-Unisex-Grey-Slip-On-Sneakers-9461568697270087-1.jpg",
            fullPrice: 1999.00,
            salePrice: 999.00,
            quantity: 1,
            size: 8
        },
        {
            productId: "268804-01",
            productName: "Unisex Cream-Coloured Slip-On Sneakers",
            productImg: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8479069/2019/9/16/b70f7829-b2a2-4126-93c7-f268a5bf59821568631933666-DIESEL-Unisex-Cream-Coloured-Slip-On-Sneakers-25315686319329-1.jpg",
            fullPrice: 1999.0,
            salePrice: 999.0,
            quantity: 1,
            size: 8
        }];
        cart = {
            count: 3,
            subTotal: 7997,
            total: 3997,
            savings: 4000,
            currency: "&#8377;",
            products: PRODUCTS,
            promoCode: "XYZ",
            promoApplied: true,
        }
     */
    
    render() {
        const {addToCart} = this.props;
        const {removeFromCart} = this.props;
        return (
            
            <div className="checkout_container">
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
