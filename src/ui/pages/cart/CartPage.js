import React, {Component, useState, useReducer} from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import PRODUCTS from './../../../service/products';
import ThemedButton from './../../components/ThemedButton';
import { Link } from 'react-router-dom';

function CartProduct(props){
    return (
        <div className="cart_product_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-8 d-flex align-center">
                        <img className="thumbnail" src={props.thumbnail}/>
                        <div className="desc">
                            <h4>{props.name}</h4>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-between">
                        <span className="price_wrapper d-flex flex-column align-center justify-content-center">
                            <span className="strikeThrough">{props.currency} {props.fullPrice}</span>
                            <span className="price">{props.currency} {props.salePrice}</span>
                        </span>
                        <span className="delete_product d-flex align-center">
                            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
function _reducer(state={count:0}, action){
    switch(action.type){
        case 'incr':
            return {
                ...state,
                count: state.count+1
            }
        case 'decr':
            return {
                ...state,
                count: state.count-1
            }
        default:
            return state
    }
}
function CartPageFooter(props){
    /* nextLink, prevLink, nextHandler, */
    return (//iconBefore={faLongArrowAltLeft}
        <section className='cart_footer'>
            <div className="cart_footer_container">
                <div className="left_btn_wrapper d-inline-block float-left">
                    <Link className="themed_link" to='/'><span>&larr; Continue shopping</span></Link>
                </div>
                <div className="left_btn_wrapper d-inline-block float-right">
                    <ThemedButton btnText="Checkout" btnState="active"></ThemedButton>
                </div>
            </div>
        </section>
    )
}
function CartPageBreadCrumbs(props){
    return (
        <div className='cart_breadcrumbs'>
            <div className='cart_breadcrumbs_container'>
                <div className={'col-3 crumb' + props.checkoutState >= 0 ? ' active' : ''}>Cart</div>
                <div className={'col-3 crumb' + props.checkoutState >= 1 ? ' active' : ''}>Shipping</div>
                <div className={'col-3 crumb' + props.checkoutState >= 2 ? ' active' : ''}>Billing</div>
                <div className={'col-3 crumb' + props.checkoutState >= 3 ? ' active' : ''}>Complete order</div>
            </div>
        </div>
    )
}

function CartPage(props){
    const [state, dispatch] = useReducer(_reducer, {count: 0});

    const [checkoutState, setCheckoutState] = useState(0);
    let PRODUCTS = [
        {
           "sku":"269232-01",
           "name":"Unisex Black Woven Design Synthetic Mid-Top Troy MU IDP Sneakers",
           "category":"Shoes, Casual, Kids",
           "brand":"Puma",
           "thumbnail":"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/productimage/2019/12/19/afee4051-1363-40f7-b8dd-4f0a8daeb3b31576708499697-1.jpg",
           "salePrice":"1999.0",
           "fullPrice":"1999.0",
           "rating":"5.0",
           "reviews":"787.0"
        
     },
        {
           "sku":"281477-01",
           "name":"Unisex Grey IMAGINEE Slip-On Sneakers",
           "category":"Shoes, Casual, Kids",
           "brand":"DIESEL",
           "thumbnail":"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8479065/2019/9/17/81ed2431-9093-4c2f-ac13-8a078682aba91568697270971-DIESEL-Unisex-Grey-Slip-On-Sneakers-9461568697270087-1.jpg",
           "salePrice":"1999.0",
           "fullPrice":"1999.0",
           "rating":"5.0",
           "reviews":"787.0"
        
     },
        {
           "sku":"268804-01",
           "name":"Unisex Cream-Coloured Slip-On Sneakers",
           "category":"Shoes, Casual, Kids",
           "brand":"DIESEL",
           "thumbnail":"https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/8479069/2019/9/16/b70f7829-b2a2-4126-93c7-f268a5bf59821568631933666-DIESEL-Unisex-Cream-Coloured-Slip-On-Sneakers-25315686319329-1.jpg",
           "salePrice":"1999.0",
           "fullPrice":"1999.0",
           "rating":"5.0",
           "reviews":"787.0"
        
     }];
     let curr = "Rs."
     return (
         <div className="checkout_container">
            <CartPageBreadCrumbs checkoutState={checkoutState}></CartPageBreadCrumbs>
            <section className="cart_body">
                {
                    PRODUCTS.map((element, index) => {
                        return (<CartProduct key={index} name={element.name} thumbnail={element.thumbnail} salePrice={element.salePrice} fullPrice={element.fullPrice} currency={curr}></CartProduct>)
                    })
                }
                <div className="cart_total">

                </div>
            </section>
            <CartPageFooter count={state.count}></CartPageFooter>
         </div>
     )
}

export default CartPage;