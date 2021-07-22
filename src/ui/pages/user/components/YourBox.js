import React from 'react';
import { useEffect, useState } from 'react';
import { fetchLikeBox } from '../../../../service/userProfile';
import ProductGrid from '../../../components/ProductGrid';
import { fetchLikeCards } from './../../../../service/api/firestore/likebox';

export default function YourBox({currentUser}) {
    const [loading, setLoading] = useState(true);
    const [{LIKED, DISLIKED}, setCards] = useState({});
    useEffect(()=>{
        if(currentUser){
            (async ()=>{
                try{
                    let res = await fetchLikeBox(currentUser.email);
                    setCards(res || {});
                }catch(err){
                    console.error('YourBox:fetchLikeBox:error', err);
                }finally {
                    setLoading(false);
                }
            })()
        }
    },[currentUser]);

    return (
        <div className="your-box container pl-0 pr-0">
            <ProductGrid products={LIKED} loading={loading} header="Items you've liked"/>
            {DISLIKED && DISLIKED.length > 0 && <ProductGrid products={DISLIKED} loading={loading} header="Items you've disliked"/>}
            <div className="d-flex justify-content-center">

            </div>
        </div>
    )
}
