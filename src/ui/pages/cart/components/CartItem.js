import React, {useState} from 'react';
import AppButton from '../../../components/_generic/AppButton';
import AppImage from '../../../components/_generic/AppImage';
import PriceText from '../../../components/_generic/PriceText';

export function CartItemPlaceholder() {
    
}

function CartItem({item, removeItem}){
    const [showRemove, setShowRemove] = useState(false);
    return (
        <div className="cart-product pt-4 pb-4">
            <div className="container">
                <div className="row position-relative">

                    <div className="col-sm-12 d-flex align-items-start">
                        <div className="thumbnail">
                            <AppImage className="thumbnail-img" src={(decodeURI(item.thumbnail) || "").trim() + '&w=400&h=400'}/>
                        </div>
                        
                        <div className="h-100 d-flex flex-column justify-content-between">
                            <div className="desc">
                            
                                <h4>{(item.title || item.name)}</h4>
                                
                                {
                                    item.size && <p className="text-uppercase mb-1">Size: {item.size}</p>
                                }
                                <p className="text-uppercase mb-1">Qty: {item.quantity}</p>
                                <p className="text-uppercase price-wrapper d-flex">
                                    <PriceText value={item.price} />
                                </p>
                            </div>
                            <div className="delete-product" onClick={() => setShowRemove(true)}>
                                <span className="delete-product-icon d-inline-flex align-center">
                                    &times; 
                                </span>
                                <span className="text-uppercase pl-1">Remove item</span>
                            </div>
                        </div>
                    </div>

                    <div className={'col-12 remove-panel position-absolute flex-column justify-content-center pl-5 pr-5 pt-2 pb-2' + (showRemove ? " d-flex" : " d-none")}>
                        <h5 className="mb-1 text-center">Are you sure you want to remove this item from your cart?</h5>
                        <div className="mt-3 mb-1 d-flex justify-content-center">
                            <div className="left_btn_wrapper d-inline-block align-center float-right">
                                <AppButton label="Yes" rounded={false} className="border-0 remove-cart-item" onClick={removeItem} />
                            </div>
                            <div className="left_btn_wrapper d-inline-block float-right mr-3">
                                <AppButton label="Cancel" variant="secondary" rounded={false} className="border-0" onClick={() => setShowRemove(false)}/>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CartItem;