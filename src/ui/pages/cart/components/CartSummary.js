import AppButton from '../../../components/generic/AppButton';

function CartSummary(props) {
    return (
        <div className="float-left cart_sidePanel">
            <h2 className="col-12 mb-3">Summary</h2>

            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Subtotal</span> <span><span>{props.currency}</span>{props.subTotal}</span></div>
{/*             <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>You saved</span> <span>&#x20B9;{props.savings}</span></div>
 */}
            <div className="col-12 float-left mb-3 d-flex justify-content-between"><span>Delivery</span> <span><span>{props.currency}</span>{0}</span></div>

            <div className="col-12 float-left mb-3 border-top border-bottom pt-3 pb-3 d-flex justify-content-between">
                <span>Total</span> <span><span>{props.currency}</span>{props.total}</span>
            </div>

            <div className="cart_sidePanel-buttons">
                <AppButton href="/checkout" label="Checkout" className="mt-3 w-100" ></AppButton>
            </div>
        </div>
    )
}

export default CartSummary