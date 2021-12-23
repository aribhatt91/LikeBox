import React, {useState} from 'react';
import AppButton from '../../../components/generic/AppButton';
import AppImage from '../../../components/generic/AppImage';
import { CURRENCY } from '../../../../service/constants';

function CartItem({item, _removeItem, user={}}){
    const [showRemove, setShowRemove] = useState(false);
    return (
        <div className="cart-product pt-4 pb-5">
            <div className="container">
                <div className="row position-relative">
                    <div className="col-sm-12 d-flex align-items-start">
                        <div className="thumbnail">
                            <AppImage className="thumbnail-img" src={item.thumbnail}/>
                        </div>
                        
                        <div className="h-100 d-flex flex-column justify-content-between">
                            <div className="desc">
                            
                                <h4>{item.title}</h4>
                                <p>Quanity: {item.quantity}</p>
                                <div className="price_wrapper d-flex">
                                    <span className="currency">{CURRENCY}</span><span className="price">{item.price}</span>
                                </div>
                            </div>
                            <div className="delete-product" onClick={() => setShowRemove(true)}>
                            <span className="delete-product-icon d-inline-flex align-center">
                                &times; 
                            </span>
                            <span className="text-uppercase pl-1">Remove item</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-5 d-flex justify-content-between align-center">
                        
                        
                    </div>
                    <div className={'col-12 removePanel position-absolute flex-column justify-content-center pl-5 pr-5 pt-2 pb-2' + (showRemove ? " d-flex" : " d-none")}>
                        <h5 className="mb-1 text-center">Are you sure you want to remove this item from your cart?</h5>
                        <div className="mt-3 mb-1 d-flex justify-content-center">
                            <div className="left_btn_wrapper d-inline-block align-center float-right">
                                <AppButton label="Yes" className="border-radius-0 border-0" onClick={() => _removeItem(user.email, item, false)} />
                            </div>
                            <div className="left_btn_wrapper d-inline-block float-right mr-3">
                                <AppButton label="Cancel" className="border-0 border-radius-0 btn-white" onClick={() => setShowRemove(false)}/>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CartItem;