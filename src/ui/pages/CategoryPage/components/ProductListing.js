import React, { useState, useEffect } from 'react';
import ProductCard, { ProductCardPlaceholder } from '../../../components/ProductCard';
import ErrorModule from '../../../components/ErrorModule';
import AppButton from '../../../components/generic/AppButton';
import { debounce } from 'lodash';
import { fetchProducts } from '../../../../service/productMethods';
//import { logViewSearchResult } from '../../../../service/api/analytics';
import EventTracker from '../../../../service/api/EventTracker';


const EMPTY_TEXT = "Seems like we don't have what you're looking for!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";

//Firestore Pagination - https://stackoverflow.com/questions/53044791/how-to-paginate-cloud-firestore-data-with-reactjs
const PER_PAGE = 10;

/* 
Array of last visible documents - used for pagination 

Update this with each page update,
but reset its value as category or other variables change
*/
let LAST_NODES = [], 
/* 
Set FLUSH to true when new category is fetched or filters are changed. Placeholders will be shown at the start
When FLUSH is set to false, the Placeholders will show at the end of current list of products
*/
FLUSH = true,

/* 
Products in excess of 10 fetched through compound queries
*/
OVERHEAD = [];

function ProductListing({type, filter=null, category, addToWishlist, inWishlist}){
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [maxReached, setMaxReached] = useState(false);

  const getProducts = async () => {
    try{
      window.mlog('getProducts called', category, page);
      setLoading(true);
      //let data = await fetchProducts(category);
      /* If overhead array contains more than PER_PAGE Limit, do not make an API Call */
      if(OVERHEAD.length >= PER_PAGE){
        setProducts([].concat(products || []).concat(OVERHEAD.slice(0, PER_PAGE)));
        OVERHEAD = OVERHEAD.slice(PER_PAGE, OVERHEAD.length);
        setLoading(false);
        return;
      }

      let response = await fetchProducts(category, page, PER_PAGE, LAST_NODES, filter);
      window.mlog('getProducts:firestoreData', page, response, products);

      if(response && response.items){
        let productsList = response.items;

        if(OVERHEAD.length > 0) {
          productsList = [].concat(OVERHEAD).concat(productsList);
        }
        if(productsList.length > PER_PAGE) {
          OVERHEAD = productsList.slice(PER_PAGE, productsList.length);
          productsList = productsList.slice(0, PER_PAGE);
        }
        if(!FLUSH){
          setProducts([].concat(products || []).concat(productsList));
        }else {
          FLUSH = false;
          setProducts([].concat(productsList));
        }
        
        if(response.items.length < PER_PAGE){
          setMaxReached(true);
        }
        if(response.lastVisible){
          LAST_NODES = response.lastVisible;
        }
        //logViewSearchResult(category, productsList);
        EventTracker.trackEvent(EventTracker.events.page.SEARCH_RESULT, category, productsList);
        window.mlog('getProducts response', response);
      }else {
        setMaxReached(true);
        if(FLUSH){
          //TODO - check this
          setProducts(null);
          FLUSH = false;
        }
      }
    }catch(err){
      console.error('getProducts:error', err);
      EventTracker.trackEvent(EventTracker.events.page.SEARCH_ERROR, category);
      if(products && products.length > 0) {
        FLUSH = false;
        setMaxReached(false);
      }else {
        setMaxReached(true);
      }
    }finally {
      setLoading(false);
      //window.mlog('loading false');
    }
    
  }


  useEffect(()=>{
    window.mlog('useEffect:category:page ->', page);
    LAST_NODES = [];
    if(maxReached){
      setMaxReached(false);
    }
    FLUSH = true;
    OVERHEAD = [];
    setLoading(true);
    getProducts();
  }, [category, filter])

  useEffect(()=> {
    if(!page || page === 0 || page === 1 || maxReached){return}
    FLUSH = false;
    getProducts();
  }, [page])

  const prev = () => {

  }

  const next = () => {
    setPage(page+1);
  }

  return (
    <div className="d-flex flex-column">
      {
        <React.Fragment>
          {!FLUSH && products && products.length > 0 &&  
            <div className="product-cards-container d-flex flex-column">
              {
                products.map((item, index) => 
                <ProductCard 
                    product={item}
                    key={index}
                    />)
              }
            
            </div>
          }
          {
            loading && <div className="product-cards-container d-flex flex-column w-100">
              <ProductCardPlaceholder/>
              <ProductCardPlaceholder/>
              <ProductCardPlaceholder/>
            </div>
          }
          {
            !loading && !maxReached && products && products.length > 0 && <div className="d-flex w-100 justify-content-center mt-5 mb-5">
              <div className="col-12 col-md-6">
                <AppButton className="w-100 border-0 border-radius-0 page-navigate-btn" label="Load more" onClick={debounce(next)}/>
              </div>
            </div>
          }
        </React.Fragment>
      }
      
      {!loading && (!products || products.length === 0) && <ErrorModule
          error_text={EMPTY_TEXT}
        />} 
    </div>
  )
}

export default ProductListing;