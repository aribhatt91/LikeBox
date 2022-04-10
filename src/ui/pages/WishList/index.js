import React, { useState, useEffect, useContext } from 'react';
import { fetchWishList, removeItemFromWishList } from '../../../libs/WishlistService';
import Page from '../Page';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { useNotification } from '../../../libs/store/contexts/NotificationProvider';
import ProductCardBase, { ProductCardTooltip, ProductCardBaseSkeleton } from '../../components/ProductCardBase';
import AppButton from '../../components/_generic/AppButton';
import TrashIcon from '../../components/_svg-components/TrashIcon';
import './style.page.css';

const WishList = () => {
    const {currentUser} = useContext(AuthContext)
    const [wishList, setWishList] = useState([]),
    [pending, setPending] = useState(false);    
    const dispatch = useNotification();

    useEffect(() => {
        (async () => {
            
            setPending(true);
            try{
                const res = await fetchWishList(currentUser.email);
                if(res && Array.isArray(res)){
                    setWishList(res.filter(item => item.id && item.title));
                }
            }catch(error){
                window.logerror(error);
            }finally{
                setPending(false);
            }
            
        })()
    }, [currentUser])

    const removeItem = async (productId) => {
        if(!currentUser){
            return;
        }
        try {
            setPending(true);
            let rem = await removeItemFromWishList(currentUser.email, productId);
            let res = await fetchWishList(currentUser.email);
            
            if(rem.type === 'success'){
                dispatch({
                    type: rem.type,
                    message: rem.msg,
                    title: 'Success!'
                })
            }
            if(res && Array.isArray(res)){
                setWishList(res.filter(item => item.id && item.title));
            }
            
        }catch(error) {
            dispatch({
                type: 'error',
                message: 'Something went wrong while trying to remove the item',
                title: 'Error'
            })
            
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
                            <ProductCardBase
                                key={item.id}
                                name={item.title}
                                price={item.price}
                                url={item.link}
                                img={item.thumbnail}
                                className="col-12 col-md-4"
                                >
                                <div className="product-card-base__cta w-100 mt-1">
                                    <AppButton size="sm" className="w-100" href={item.link} target="_blank" ext={true} label="Go to brand" />
                                </div>
                                <ProductCardTooltip icon={<TrashIcon/>}>
                                    <p className="product-card-base__tooltip-text mb-2">Are you sure you want to remove this item?</p>
                                    <div className="d-flex align-items-end">
                                        <div className="d-inline-block mr-2">
                                            <AppButton 
                                                label="Cancel" 
                                                size="sm"
                                                rounded={false}
                                                variant="secondary"
                                                className="w-100 border-0" 
                                                onClick={(e) => {}}
                                                />
                                        </div>
                                        <div className="d-inline-block">
                                            <AppButton 
                                                label="Remove" 
                                                size="sm"
                                                rounded={false}
                                                className="w-100 border-0" 
                                                onClick={()=>{
                                                    removeItem(item.id);
                                                }}
                                                />
                                        </div>
                                    </div>
                                </ProductCardTooltip>
                                
                            </ProductCardBase>
                        )
                    }
                    {
                        (!pending && wishList.length === 0) && <div className="container d-flex w-100 h-100 m5">
                            <h2 className="text-center mt-5 mb-5 pt-4 pb-4 w-100">
                                It seems you haven't added anything to your wishlist.
                            </h2>

                        </div>
                    }
                    {
                        pending && <React.Fragment>
                            <ProductCardBaseSkeleton className="col-12 col-md-4" />
                            <ProductCardBaseSkeleton className="col-12 col-md-4" />
                            <ProductCardBaseSkeleton className="col-12 col-md-4" />
                        </React.Fragment>
                    }
                </div>
            </div>
        </Page>
    )

}

export default WishList;