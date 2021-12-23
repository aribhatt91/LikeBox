import React, { useState, useEffect, useContext } from 'react';
import { fetchWishList, removeItemFromWishList } from '../../../service/wishlistMethods';
import Page from '../Page';
import { AuthContext } from '../../../store/contexts/AuthContext';
import { useNotification } from '../../../store/contexts/NotificationProvider';
import WishListInstance, { WishListInstanceSkeleton } from './components/WishListInstance';
import './index.css';

const WishList = () => {
    const {currentUser} = useContext(AuthContext)
    const [wishList, setWishList] = useState([]),
    [pending, setPending] = useState(false);    
    const dispatch = useNotification();
    useEffect(() => {
        if(currentUser){
            setPending(true);
            fetchWishList(currentUser.email).then(res => {
                window.mlog('WishListPage', res); 
                setWishList(res); 
            }).catch(err => {
                console.error(err);
            }).finally(() => {
                setPending(false);
            })
        }else {
        }
    }, [currentUser])
    const removeItem = async (sku) => {
        if(!currentUser){
            return;
        }
        try {
            setPending(true);
            let rem = await removeItemFromWishList(currentUser.email, sku);
            window.mlog(rem);
            let res = await fetchWishList(currentUser.email);
            window.mlog('updated wishlist', res);
            if(rem.type === 'success'){
                dispatch({
                    type: rem.type,
                    message: rem.msg,
                    title: 'Success!'
                })
            }
            if(res){
                setWishList(res);
            }
            
        }catch(err) {
            console.error(err)
            if(err.msg){
                dispatch({
                    type: err.type,
                    message: err.msg,
                    title: 'Error'
                })
            }
            
        }finally {
            setPending(false);
        }
    }
    return (
        <Page pageName="Wishlist">
            <div className={"wish-list-section mt-5 mb-5 container"}>
                <h1 className="text-center mb-5 text-uppercase">Wishlist</h1>
                <div className="wish-list-container d-flex flex-wrap justify-content-start">
                    {
                        wishList && wishList.length > 0 && wishList.map((item, index) => 
                            <div className="d-flex col-12 col-md-4 justify-content-center p-0">
                                <WishListInstance
                                    key={index}
                                    instance={item}
                                    removeItem={removeItem}
                                />
                            </div>
                        )
                    }
                    {
                        (!pending && wishList.length === 0) && <div className="container d-flex w-100 h-100 m5">
                            <h1 className="text-center mt-5 mb-5 pt-4 pb-4 w-100">
                                It seems you haven't added anything to your wishlist.
                            </h1>

                        </div>
                    }
                    {
                        pending && <React.Fragment>
                            <div className="d-flex col-12 col-md-4 justify-content-center p-0">
                                <WishListInstanceSkeleton/>
                            </div>
                            <div className="d-flex col-12 col-md-4 justify-content-center p-0">
                                <WishListInstanceSkeleton/>
                            </div>
                            <div className="d-flex col-12 col-md-4 justify-content-center p-0">
                                <WishListInstanceSkeleton/>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </Page>
    )

}

export default WishList;