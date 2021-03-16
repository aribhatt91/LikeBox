import React, { useState, useEffect, useContext } from 'react';
import ThemedButton from '../../components/generic/ThemedButton';
import { fetchWishList, removeItemFromWishList } from '../../../service/wishlistMethods';
import LoadingModule from './../../components/LoadingModule';
import { AuthContext } from './../../../store/contexts/AuthContext';
import { CURRENCY } from './../../../service/constants';
import AppButton from '../../components/generic/AppButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
function WishListInstance({instance, deleteWishListInstance}){
    const [showDeletePop, setShowDeletePop] = useState(false);
    const wishListId = instance.sku, 
    deletePopAlert = (e) => {
        //e.stopImmediatePropagation();
        setShowDeletePop(true);
    },
    deleteWishListAction = (e) => {
        setShowDeletePop(false);
        /* if(deleteWishListInstance && typeof deleteWishListInstance === 'function'){
            deleteWishListInstance(wishListId);
        } */
    }

    return (
        <div className="wish-list-instance-container mb-3 position-relative">
            <a href={instance.url} className="wish-list-instance-thumb">
                <img src={instance.thumbnail}/>
            </a>
            <div className="wish-list-instance-text pt-2 pb-2">
                <div className="wish-list-instance-price">
                    <span className="currency">{CURRENCY}</span>
                    <span className="wish-list-instance-sale-price">
                        {instance.price}
                    </span>
                </div>
                <div className="wish-list-instance-name">
                    {instance.name}
                </div>{/* 
                <div className="wish-list-instance-brand">
                    {instance.brand}
                </div> */}
                <div className="wish-list-cta w-100 mt-1">
                    <AppButton className="w-100 sm" onClick={() => {}} label="Buy now" />
                </div>
            </div>
            <div className="wish-list-instance-remove-wrapper tooltip-wrapper d-flex flex-column align-items-end mt-1 mr-1">
                <span className="action-icon" onClick={deletePopAlert}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <div className={"action-message-tooltip p-3" + (showDeletePop ? "" : " d-none")}>
                    <p className="mb-2">Are you sure you want to remove this item?</p>
                    <div className="d-flex align-items-end">
                        <div className="d-inline-block mr-2">
                            <AppButton 
                                label="Cancel" 
                                className="w-100 btn-white sm" 
                                onClick={(e) => {setShowDeletePop(false)}}
                                />
                            {/* <ThemedButton
                                text="Cancel"
                                _click={() => setShowDeletePop(false)}
                                size="sm"
                                theme="nobg"
                            /> */}
                        </div>
                        <div className="d-inline-block">
                            <AppButton 
                                label="Remove" 
                                className="w-100 sm" 
                                onClick={deleteWishListAction}
                                />
                            {/* <ThemedButton
                                text="Remove"
                                _click={deleteWishListAction}
                                size="sm"
                                theme="red"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
function UserWishListFragment(){
    const {currentUser} = useContext(AuthContext)
    const [wishList, setWishList] = useState([]),
    [pending, setPending] = useState(false);    

    useEffect(() => {
        if(currentUser){
            setPending(true);
            fetchWishList(currentUser.email).then(res => {
                console.log('UserWishListFragment', res); 
                setWishList(res); 
            }).catch(err => {
                console.error(err);
            }).finally(() => {
                setPending(false);
            })
        }else {
        }
    }, [currentUser])
    console.log('wishList', wishList);
    return (
        <div className={"wish-list-section mt-5 mb-5"}>
            <h1 className="text-center mb-5 text-uppercase">Wishlist</h1>
            <div className="wish-list-container d-flex flex-wrap justify-content-between">
                {
                    wishList.map((item, index) => 
                        <WishListInstance
                            key={index}
                            instance={item}
                            deleteWishListInstance={(itemId)=>{console.log('Deleting ', itemId)}}
                        />
                    )
                }
                {
                    (!pending && wishList.length === 0) && <div></div>
                }
                {
                    pending && <div className="col-12">
                        <LoadingModule
                            type="block"
                            text="Please wait while we fetch your wish list"
                        />
                    </div>
                }
            </div>
        </div>
    )

}

export default UserWishListFragment;