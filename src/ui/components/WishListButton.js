import React, { useState, useContext, useEffect } from 'react'
import AppButton from './generic/AppButton';
import { removeItemFromWishList, addItemToWishList, itemInWishList } from '../../service/wishlistMethods';
import { AuthContext } from './../../store/contexts/AuthContext';
import { useNotification } from './../../store/contexts/NotificationProvider';
import EventTracker from './../../service/api/EventTracker';
//import { addToList, removeFromList } from './../../service/api/recommendations/index';

export default function WishListButton({product, className="" }) {
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
            console.error(err);
            setLoading(false);
          }finally{
              
          }
        }
    }, [currentUser])

    const toggleInWishList = async () => {
        if(currentUser && product){
          try {
            
            if(inWishList){
              (async ()=>{
                setLoading(true);
                let res = await removeItemFromWishList(currentUser.email, product.id);
                //let res = await itemInWishList(currentUser.email, id);
                if(res.type === 'success'){
                  setInWishList(false);
                  dispatch({
                    type: res.type,
                    title: 'Success!',
                    message: res.msg
                  });
                  EventTracker.trackEvent(EventTracker.events.REMOVE_FROM_WISHLIST, product);
                  //removeFromList(product);
                }
                setLoading(false);
              })()
            }else {
              (async ()=>{
                setLoading(true);
                let res = await addItemToWishList(currentUser.email, product.id, product);
                if(res.type === 'success'){
                  setInWishList(true);
                  dispatch({
                    type: res.type,
                    title: 'Success!',
                    message: res.msg
                  });
                  
                  EventTracker.trackEvent(EventTracker.events.ADD_TO_WISHLIST, product);
                  //addToList(product);
                }
                setLoading(false);
              })()
            }
          }catch(err){
            window.mlog('toggleWishList', err);
            dispatch({
              type: 'error',
              title: 'Error!',
              message: 'Something went wrong!'
            })
            setLoading(false);
          }finally{
              
          }
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
            />
        </React.Fragment>
    )
}
