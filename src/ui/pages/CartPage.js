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

const EMPTY_TEXT = "You have no items in your cart!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";
function CartPageSidePanel(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-3">Summary</h2>

            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Subtotal</span> <span>&#x20B9;{props.subTotal}</span></div>
{/*             <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>You saved</span> <span>&#x20B9;{props.savings}</span></div>
 */}
            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Delivery</span> <span>&#x20B9;{0}</span></div>

            <div className="col-12 float-left mb-3 border-top border-bottom pt-3 pb-3 d-flex justify-content-between">
                <span>Total</span> <span>&#x20B9;{props.total}</span>
            </div>

            <div className="cart_sidePanel-buttons">
                <AppButton href="/checkout" label="Checkout" className="mt-3 w-100" ></AppButton>
            </div>
        </div>
    )
}
function CartModule({removeProduct, }){
    //const [pending, setPending] = useState()
    const {currentUser} = useContext(AuthContext);

}
class CartPage extends Page {
    constructor(props){
        super(props);
    }

    async componentDidMount() {
        const {fetchCart} = this.props;
        fetchCart();
        /* try{
            let cart = await getUserCart('z@f.com');
            console.log('CartPage: result -> ',cart);
        }catch(err){
            console.error('CartPage: error -> ', err);
        } */
    }
    render() {
        const {addToCart} = this.props;
        const {removeFromCart} = this.props;
        return (
            
            <div className="checkout_container container">
                {this.props.fetch_pending && <LoadingModule text="Please wait..."></LoadingModule>}
                {!this.props.fetch_pending && (this.props.error || (this.props.cart.products || []).length <= 0) && <ErrorModule
                    error_image={EMPTY}
                    error_text={EMPTY_TEXT}
                />}
                {!this.props.fetch_pending && !this.props.error && (this.props.cart.products || []).length > 0 &&
                    <section className="cart_body">
                        <div className="float-left pl-4 pr-4 flex-grow-1">
                            {
                            (this.props.cart.products || []).map((item, index) => {
                                return (
                                    <CartProduct 
                                    key={index} 
                                    item={item}
                                    currency={this.props.cart.currency}
                                    _removeItem={removeFromCart}
                                    ></CartProduct>)
                            })
                            }
                        </div>
                        <CartPageSidePanel
                            subTotal={this.props.cart.subTotal}
                            total={this.props.cart.total}
                            savings={this.props.cart.savings}
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
