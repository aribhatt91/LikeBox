import React, {useState} from 'react';
import ThemedButton from './generic/ThemedButton';
import AppButton from './generic/AppButton';

function CartProduct({item, _removeItem, currency}){
    const [showRemove, setShowRemove] = useState(false);
    return (
        <div className="cart_product_wrapper pt-4 pb-5">
            <div className="container">
                <div className="row position-relative">
                    <div className="col-sm-12 d-flex align-items-start">
                        <img className="thumbnail" src={item.productImg}/>
                        <div className="h-100 d-flex flex-column justify-content-between">
                            <div className="desc">
                            
                                <h4>{item.productName}</h4>
                                <p>Size: {item.size}</p>
                                <div className="price_wrapper d-flex flex-column justify-content-center">
                                    {item.fullPrice && <span className="strikeThrough">&#x20B9;{item.fullPrice}</span>}
                                    <span className="price">&#x20B9;{item.salePrice}</span>
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
                    <div className={'col-12 removePanel position-absolute pt-2 pb-2' + (showRemove ? "" : " d-none")}>
                        <h5 className="mb-1">Are you sure you want to remove this item from your cart?</h5>
                        <div className="mt-4 mb-1">
                            <div className="left_btn_wrapper d-inline-block align-center float-right">
                                <AppButton label="Yes" onClick={() => _removeItem(item, false)}></AppButton>
                            </div>
                            <div className="left_btn_wrapper d-inline-block float-right mr-3">
                                <ThemedButton  text="Cancel" btnState="active" _click={() => setShowRemove(false)} border="false"></ThemedButton>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default CartProduct;