import React, {useState} from 'react';
import ThemedButton from './ThemedButton';

function CartProduct({item, _incrementItemCount, _decrementItemCount, _removeItem, currency}){
    const [showRemove, setShowRemove] = useState(false);
    return (
        <div className="cart_product_wrapper">
            <div className="container">
                <div className="row position-relative">
                    <div className="col-sm-12 col-md-7 d-flex align-center">
                        <img className="thumbnail" src={item.productImg}/>
                        <div className="desc">
                            <h4>{item.productName}</h4>
                            <p>Size: {item.size}</p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5 d-flex justify-content-between align-center">
                        <span className="d-flex flex-row align-center qty_container">
                            <span className="decr_icon" onClick={item.quantity <=1 ? () => setShowRemove(true) : () => _decrementItemCount(item, true)}>-</span>
                            <span className="item_qty">{item.quantity}</span>
                            <span className="incr_icon" onClick={() => _incrementItemCount(item)}>+</span>
                        </span>
                        <span className="price_wrapper d-flex flex-column align-center justify-content-center">
                            {item.fullPrice && <span className="strikeThrough">{currency} {item.fullPrice}</span>}
                            <span className="price">{currency} {item.salePrice}</span>
                        </span>
                        <span className="delete_product d-flex align-center" onClick={() => setShowRemove(true)}>
                            &times;
                        </span>
                    </div>
                    <div className={'col-12 removePanel position-absolute pt-2 pb-2' + (showRemove ? "" : " d-none")}>
                        <h5 className="mb-1">Are you sure you want to remove this item from your cart?</h5>
                        <div className="mt-4 mb-1">
                            <div className="left_btn_wrapper d-inline-block align-center float-right">
                                <ThemedButton btnText="Yes" btnState="active" _click={() => _removeItem(item, false)}></ThemedButton>
                            </div>
                            <div className="left_btn_wrapper d-inline-block float-right mr-3">
                                <ThemedButton  btnText="Cancel" btnState="active" _click={() => setShowRemove(false)} border="false"></ThemedButton>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CartProduct;