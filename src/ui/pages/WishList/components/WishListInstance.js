import React, { useState, useEffect } from 'react';
import AppButton from '../../../components/generic/AppButton';
import AppImage from '../../../components/generic/AppImage';
import TrashIcon from '../../../components/svg-components/TrashIcon';
import PriceText from '../../../components/generic/PriceText';

export function WishListInstanceSkeleton() {
    return (
        <div className="wish-list-instance-container wish-list-instance-container-placeholder mb-3 position-relative">
            <div className="wish-list-instance-thumb">
            </div>
            <div className="wish-list-instance-text pt-2 pb-2">
                <div className="wish-list-instance-price-placeholder w-50"></div>
                <div className="wish-list-instance-name-placeholder w-50"></div>
                <div className="wish-list-cta-placeholder w-100 mt-1"></div>
            </div>
        </div>
    )
}
export default function WishListInstance({instance, removeItem}){
    const [showDeletePop, setShowDeletePop] = useState(false);
    const sku = instance.id, 
    deletePopAlert = (e) => {
        //e.stopImmediatePropagation();
        setShowDeletePop(true);
    },
    deleteWishListAction = (e) => {
        setShowDeletePop(false);
        if(removeItem && typeof removeItem === 'function'){
            removeItem(sku);
        }
    }

    useEffect(()=>{
        window.mlog('adding event listener..')
        window.addEventListener('click', (e)=>{
            //if(showDeletePop){
                setShowDeletePop(false);
            //}
        })
    }, [])

    return (
        <div className="wish-list-instance-container mb-3 position-relative">
            <a href={instance.url} target="_blank" className="wish-list-instance-thumb">
                <AppImage src={instance.thumbnail}/>
            </a>
            <div className="wish-list-instance-text pt-2 pb-2">
                <div className="wish-list-instance-price">
                    <PriceText value={instance.price} />
                </div>
                <div className="wish-list-instance-name">
                    {instance.name}
                </div>

                <div className="wish-list-cta w-100 mt-1">
                    <AppButton className="w-100 sm" href={instance.link} target="_blank" ext={true} label="Go to brand" />
                </div>
            </div>
            <div className="wish-list-instance-remove-wrapper tooltip-wrapper d-flex flex-column align-items-end" onClick={(e)=>{e.stopPropagation()}}>
                <span className="action-icon" onClick={deletePopAlert}>
                    <TrashIcon />
                </span>
                <div className={"action-message-tooltip p-3" + (showDeletePop ? "" : " d-none")}>
                    <p className="mb-2">Are you sure you want to remove this item?</p>
                    <div className="d-flex align-items-end">
                        <div className="d-inline-block mr-2">
                            <AppButton 
                                label="Cancel" 
                                className="w-100 btn-white sm border-0 border-radius-0" 
                                onClick={(e) => {setShowDeletePop(false)}}
                                />
                        </div>
                        <div className="d-inline-block">
                            <AppButton 
                                label="Remove" 
                                className="w-100 sm border-0 border-radius-0" 
                                onClick={deleteWishListAction}
                                />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}