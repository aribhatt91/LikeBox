import React, { useState } from 'react';
import ThemedButton from '../../components/generic/ThemedButton';
import WISHLIST from '../../../mock/wishlist.json';
import { fetchWishList, removeItemFromWishList } from '../../../service/wishlistMethods';
function WishListInstance({instance, deleteWishListInstance}){
    const [showDeletePop, setShowDeletePop] = useState(false);
    const wishListId = instance.sku, 
    deletePopAlert = (e) => {
        e.stopImmediatePropagation();
        setShowDeletePop(true);
    },
    deleteWishListAction = () => {
        setShowDeletePop(false);
        if(deleteWishListInstance && typeof deleteWishListInstance === 'function'){
            deleteWishListInstance(wishListId);
        }
    }

    return (
        <div className="wish-list-instance-container mb-3 d-flex p-3 pr-5 position-relative">
            <a href={instance.url} className="wish-list-instance-thumb mr-3">
                <img src={instance.thumbnail}/>
            </a>
            <div className="wish-list-instance-text pl-3">
                <div className="wish-list-instance-name">
                    {instance.name}
                </div>
                <div className="wish-list-instance-brand">
                    {instance.brand}
                </div>
                <div className="wish-list-instance-price">
                    <span className="wish-list-instance-sale-price">&#x20B9;{instance.price}</span>
                    <span className="wish-list-instance-full-price ml-2"><strike className={instance.fullPrice && instance.fullPrice !== "" ? "" : " d-none"}>&#x20B9;{instance.fullPrice}</strike></span>
                    <span className="wish-list-instance-discount ml-2">{instance.discount && instance.discount !== "" ? instance.discount + "%" : ""}</span>
                </div>
            </div>
            <div className="wish-list-instance-remove-wrapper tooltip-wrapper d-flex flex-column align-items-end">
                <span className="action-icon" onClick={deletePopAlert}>Remove</span>
                <div className={"action-message-tooltip p-3" + (showDeletePop ? "" : " d-none")}>
                    <p className="mb-2">Are you sure you want to remove this item?</p>
                    <div className="d-flex align-items-end">
                        <div className="d-inline-block mr-2">
                            <ThemedButton
                                btnText="Cancel"
                                _click={() => setShowDeletePop(false)}
                                size="sm"
                                theme="nobg"
                            />
                        </div>
                        <div className="d-inline-block">
                            <ThemedButton
                                btnText="Remove"
                                _click={deleteWishListAction}
                                size="sm"
                                theme="red"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
function UserWishListFragment({wishListObj}){
    let wishList = WISHLIST.items || [],
    wishListItems = [];

    wishList.forEach((item, index) => {
        wishListItems.push(
            <WishListInstance
                instance={item}
                deleteWishListInstance={(itemId)=>{console.log('Deleting ', itemId)}}
            />
        )
    });
    return (
        <div className={"wish-list-section editable-section"}>
            <h1 className="editable-section-header mb-5">My wishlist</h1>
            <div className="wish-list-container">
                {
                    wishListItems
                }
            </div>
        </div>
    )

}

export default UserWishListFragment;