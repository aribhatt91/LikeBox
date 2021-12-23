import React, {useState, useContext, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from '../../../service/cartOperation';
import Page from '../Page';
import CartItem from './components/CartItem'; 
import LoadingModule from '../../components/LoadingModule';
import ErrorModule from '../../components/ErrorModule';
import { AuthContext } from '../../../store/contexts/AuthContext';
import './index.css';
import CartSummary from './components/CartSummary';

const EMPTY_TEXT = "You have no items in your cart!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";


function Cart(props) {
    const {addToCart, removeFromCart, fetchCart, error, cart, fetch_pending} = props;

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        try {
            fetchCart(currentUser.email);
        }catch(err){
            window.mlog(err);
        }
    }, [currentUser])

    return (
        
        <Page className="checkout_container container" pageName={"Cart"}>
            <React.Fragment>
            {fetch_pending && <LoadingModule text="Please wait..."></LoadingModule>}
            {!fetch_pending && (error || !cart || (cart.products || []).length <= 0) && <ErrorModule
                
                error_text={EMPTY_TEXT}
            />}
            {!fetch_pending && !error && (cart.products || []).length > 0 &&

                <section className="cart_body">
                    <div className="float-left pl-4 pr-4 flex-grow-1">
                        {
                        (cart.products || []).map((item, index) => {
                            return (
                                <CartItem
                                key={index} 
                                item={item}
                                _removeItem={removeFromCart}
                                user={currentUser}
                                ></CartItem>)
                        })
                        }
                    </div>
                    <CartSummary
                        subTotal={cart.subTotal}
                        total={cart.total}
                        savings={cart.savings}
                        curr={cart.currency}
                    />
                </section>
            }
        </React.Fragment>
            
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
