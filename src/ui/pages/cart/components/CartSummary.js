import React from 'react';
import AppButton from '../../../components/generic/AppButton';
import PriceText from '../../../components/generic/PriceText';

function CartSummary(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-3">Summary</h2>

            <div className="col-12 float-left mb-3 d-flex justify-content-between">
                <span>Subtotal</span> <PriceText value={props.subTotal} />
            </div>
{/*             <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>You saved</span> <span>&#x20B9;{props.savings}</span></div>
 */}
            

            <div className="col-12 float-left mb-3 border-top border-bottom pt-3 pb-3 d-flex justify-content-between">
                <span>Total</span> <PriceText value={props.total} />
            </div>

            <div className="cart_sidePanel-buttons">
                <AppButton href="/checkout" label="Checkout" className="mt-3 w-100" ></AppButton>
            </div>
        </div>
    )
}

export default CartSummary