import React from 'react'
import Page from './Page'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parseSearchParams } from '../../service/helper';
import { getNearestMatches } from './../../service/productMethods';


export default function SearchPage() {
    const location = useLocation();
    const params = parseSearchParams(location.search),
    searchTerm = params.search;
    window.mlog('SearchTerm', searchTerm);
    useEffect(()=>{
        /* 
        1. Check if search term is a valid one
        2. If yes, make call to products and fetch list in ProductListing
        3. If no, show nearest matching suggestions.
        4. Also show a list of regular products
        5. Header reads - 'You searched for ""'
        */
        (async ()=> {
            try{
                let map = await getNearestMatches(searchTerm);
                window.mlog('SearchPage:', map);
            }catch(err){

            }
            

        })();

    }, [searchTerm])
    return (
        <Page pageName="search">
            <section className="products-section">
                <div className="page container-fluid">
                <h1 className="listing-page-header m-3 mt-5 mb-5 text-center text-uppercase">
                    {(searchTerm|| "").replace('-', ' & ')}
                </h1>
                {/* <ProductListing category={category} filter={filterObject} /> */}
                </div>
            </section>
            
        </Page>
    )
}
