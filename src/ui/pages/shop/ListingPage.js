import React, { useState, useEffect } from 'react';
import Page from '../Page';
//import ProductFilters from './components/ProductFilters';
import { useParams } from 'react-router-dom';
import { getAvailableKeywords } from '../../../service/productMethods';
import { Helmet } from 'react-helmet';
import ProductListing from './components/ProductListing';
import { logSearch } from './../../../service/api/analytics/index';


function ListingPage(props) {
  const {category} = useParams();
  const [filterObject, setFilterObject] = useState(null);

  const applyFilter = async (obj) => {
    window.mlog('ListingPage:applyFilter ->', obj);
    setFilterObject(obj);
  }

  useEffect(()=>{
    logSearch(category);
    document.title = (category|| "").replace('-', ' & ').toUpperCase();
    (async () => {
      let keys = await getAvailableKeywords();
      window.mlog('All available keys -- ', keys);
    })();
    
  }, [category])

  return (
    <Page pageName={"category"} category={(category|| "").replace('-', ' & ')}>
        <Helmet>
          <meta property="og:description" content={category|| ""} />
        </Helmet>
        <section className="products-section">
            <div className="page container-fluid">
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


export default ListingPage;
