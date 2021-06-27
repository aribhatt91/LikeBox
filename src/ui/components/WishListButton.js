import React, { useState, useContext, useEffect } from 'react'
import AppButton from './generic/AppButton';
import { removeItemFromWishList, addItemToWishList, itemInWishList } from '../../service/wishlistMethods';
import { AuthContext } from './../../store/contexts/AuthContext';
import { useNotification } from './../../store/contexts/NotificationProvider';

export default function WishListButton({product, className="" }) {
    const [loading, setLoading] = useState(true);
    const [inWishList, setInWishList] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const dispatch = useNotification();

    useEffect(()=>{
        if(currentUser && product){
          try{
            if(product.sku){
              
              (async ()=>{
                let res = await itemInWishList(currentUser.email, product.sku);
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
                let res = await removeItemFromWishList(currentUser.email, product.sku);
                //let res = await itemInWishList(currentUser.email, id);
                if(res.type === 'success'){
                  setInWishList(false);
                  dispatch({
                    type: res.type,
                    title: 'Success!',
                    message: res.msg
                  })
                }
                setLoading(false);
              })()
            }else {
              (async ()=>{
                setLoading(true);
                let res = await addItemToWishList(currentUser.email, product.sku, product);
                if(res.type === 'success'){
                  setInWishList(true);
                  dispatch({
                    type: res.type,
                    title: 'Success!',
                    message: res.msg
                  })
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
