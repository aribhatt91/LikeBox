import React from 'react';
import AppButton from '../../../components/_generic/AppButton';
import PriceText from '../../../components/_generic/PriceText';

function CartSummary({cart}) {
    return (
        <div className="cart-side-panel">
            <div className="d-flex flex-column justify-content-between h-100">

                
                <div className="cart-summary d-flex flex-column">
                    <h4 className="mb-4 d-none d-md-flex text-uppercase w-100">
                        Cart Summary
                    </h4>
                    <div className="d-flex justify-content-between w-100">
                        <p className="pr-2 text-uppercase">Items</p>
                        <p className="pl-2">{cart.count}</p>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <p className="pr-2 text-uppercase">Total</p>
                        <p className="pl-2"><PriceText value={cart.total} /></p>
                    </div>
                    
                </div>

                <div className="cart-side-panel-buttons">
                    <AppButton href="/checkout" label="Checkout" className="mt-md-3 w-100" ></AppButton>
                </div>
            </div>

            {/* <div className="payment-summary d-none d-md-flex flex-column">
                <h4>Payment summary</h4>


            </div>

            <div className="col-12 float-left mb-3 border-top border-bottom pt-3 pb-3 d-flex justify-content-between">
                <span>Total</span> <PriceText value={props.total} />
            </div> */}

            
        </div>
    )
}

export default CartSummary