import React, { useState, useEffect } from 'react';
import Page from '../Page';
//import ProductFilters from './components/ProductFilters';
import { useParams, useLocation } from 'react-router-dom';
import { getAvailableKeywords, getNearestMatches } from '../../../service/ProductService';
import { Helmet } from 'react-helmet';
import ProductListing from './components/ProductListing';
import EventTracker from './../../../service/api/EventTracker';
import { capitaliseAll, parseSearchParams } from '../../../service/helper';
import './index.css';

function CategoryPage(props) {
  const location = useLocation();
  const params = parseSearchParams(location.search),
  searchTerm = params.search,
  searchPage = location.pathname.indexOf('/search') > -1;

  const {category} = useParams();
  const [filterObject, setFilterObject] = useState(null);

  const applyFilter = async (obj) => {
    window.mlog('ListingPage:applyFilter ->', obj);
    setFilterObject(obj);
  }

  useEffect(()=>{
    const pageTitle = capitaliseAll((category|| "").replace('-', ' & '));
    EventTracker.trackEvent(EventTracker.events.page.SEARCH, category);
    EventTracker.trackEvent(EventTracker.events.page.PAGE_VIEW, pageTitle, 'category-page');
    EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, 'category-page');
    
    document.title = pageTitle;
    (async () => {
      let keys = await getAvailableKeywords();
      window.mlog('All available keys -- ', keys);
    })();
    
  }, [category])

  useEffect(()=>{
    /* 
    1. Check if search term is a valid one
    2. If yes, make call to products and fetch list in ProductListing
    3. If no, show nearest matching suggestions.
    4. Also show a list of regular products
    5. Header reads - 'You searched for ""'
    */
    if(searchTerm && searchPage){
      (async ()=> {
          try{
              let map = await getNearestMatches(searchTerm);
              window.mlog('SearchPage:', map);
          }catch(err){

          }
      })();
    }

}, [searchTerm])

  return (
    <Page pageName={"category-page"} category={(category|| "").replace('-', ' & ')}>
        <Helmet>
          <meta property="og:description" content={category|| ""} />
        </Helmet>
        <section className="products-section">
            <div className="container-fluid">
              <h1 className="listing-page-header m-3 mt-5 mb-5 text-center text-uppercase">
                {(category|| "").replace('-', ' & ')}
              </h1>
              {/* <ProductFilters 
                category={category}
                onFilterChange={applyFilter}/> */}
              <ProductListing category={category} filter={filterObject} />
            </div>
        </section>
    </Page>
  );
  
}


export default CategoryPage;
