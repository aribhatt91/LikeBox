import React, { useState, useContext, useEffect } from 'react'
import AppButton from '../_generic/AppButton';
import { removeItemFromWishList, addItemToWishList, itemInWishList } from '../../../libs/WishlistService';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { useNotification } from '../../../libs/store/contexts/NotificationProvider';
import EventTracker from '../../../libs/api/EventTracker';
//import { addToList, removeFromList } from './../../libs/api/recommendations/index';

export default function WishListButton({product, className="", ...rest}) {
    const [loading, setLoading] = useState(true);
    const [inWishList, setInWishList] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const dispatch = useNotification();

    useEffect(()=>{
        if(currentUser && product){
          try{
            if(product.id){
              
              (async ()=>{
                let res = await itemInWishList(currentUser.email, product.id);
                setInWishList(res);
                setLoading(false);
              })()
            }
            
          }catch(err){
            window.logerror(err);
            setLoading(false);
          }finally{
              
          }
        }
    }, [currentUser])

    const toggleInWishList = async () => {
        if(currentUser && product){

          (async ()=>{
            setLoading(true);
            try{
              let res = null;
              if(inWishList){
                res= await removeItemFromWishList(currentUser.email, product.id);
              }else {
                res = await addItemToWishList(currentUser.email, product);
              }
              //let res = await itemInWishList(currentUser.email, id);
              if(res.type === 'success'){

                if(inWishList){
                  setInWishList(false);
                  EventTracker.trackEvent(EventTracker.events.product.REMOVE_FROM_WISHLIST, product);
                }else {
                  setInWishList(true);
                  EventTracker.trackEvent(EventTracker.events.product.ADD_TO_WISHLIST, product);
                }
                
                dispatch({
                  type: res.type,
                  title: 'Success!',
                  message: res.msg
                });
                
              }
            }catch(error) {
              window.logerror('WishListButton::toggleInWishList::error', error);
              dispatch({
                type: 'error',
                title: 'Error!',
                message: 'Something went wrong!'
              })
            }finally {
              setLoading(false);
            }
            
          })()

        }
    }

    return (
        <React.Fragment>
            <AppButton 
              disabled={!currentUser}
              className={className}
              onClick={toggleInWishList}
              loading={loading}
              label={inWishList ? "Remove from Wishlist" : "Add to Wishlist"}
              {...rest}
            />
        </React.Fragment>
    )
}
