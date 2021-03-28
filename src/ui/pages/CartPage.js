import React, {useState, useContext, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from '../../service/cartOperation';
import Page from './Page';
import CartProduct from '../components/CartProduct'; 
import LoadingModule from '../components/LoadingModule';
import ErrorModule from '../components/ErrorModule';
import EMPTY from '../../assets/img/empty-cart.png';
import AppButton from './../components/generic/AppButton';
import { getUserCart } from './../../service/api/firestore/cart';
import { AuthContext } from './../../store/contexts/AuthContext';
import { CURRENCY } from './../../service/constants';

const EMPTY_TEXT = "You have no items in your cart!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";
function CartPageSidePanel(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-3">Summary</h2>

            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Subtotal</span> <span><span>{CURRENCY}</span>{props.subTotal}</span></div>
{/*             <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>You saved</span> <span>&#x20B9;{props.savings}</span></div>
 */}
            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Delivery</span> <span><span>{CURRENCY}</span>{0}</span></div>

            <div className="col-12 float-left mb-3 border-top border-bottom pt-3 pb-3 d-flex justify-content-between">
                <span>Total</span> <span><span>{CURRENCY}</span>{props.total}</span>
            </div>

            <div className="cart_sidePanel-buttons">
                <AppButton href="/checkout" label="Checkout" className="mt-3 w-100" ></AppButton>
            </div>
        </div>
    )
}
function CartModule({pending, error, removeFromCart, fetchCart, addToCart, cart={}}){
    //const [pending, setPending] = useState()
    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        try {
            fetchCart(currentUser.email);
        }catch(err){
            console.log(err);
        }
    }, [currentUser])

    return (
        <React.Fragment>
            {pending && <LoadingModule text="Please wait..."></LoadingModule>}
            {pending && (error || (cart.products || []).length <= 0) && <ErrorModule
                error_image={EMPTY}
                error_text={EMPTY_TEXT}
            />}
            {!pending && !error && (cart.products || []).length > 0 &&

                <section className="cart_body">
                    <div className="float-left pl-4 pr-4 flex-grow-1">
                        {
                        (cart.products || []).map((item, index) => {
                            return (
                                <CartProduct 
                                key={index} 
                                item={item}
                                _removeItem={removeFromCart}
                                user={currentUser}
                                ></CartProduct>)
                        })
                        }
                    </div>
                    <CartPageSidePanel
                        subTotal={cart.subTotal}
                        total={cart.total}
                        savings={cart.savings}
                        curr={cart.currency}
                    ></CartPageSidePanel>
                </section>
            }
        </React.Fragment>
    )

}
function CartPage(props) {
    const {addToCart, removeFromCart, fetchCart} = props;

    return (
        
        <Page className="checkout_container container" pageName={"Cart"}>
            <CartModule 
                pending={props.fetch_pending} 
                error={props.error}
                fetchCart={fetchCart} 
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                cart={props.cart}
                />
            
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
