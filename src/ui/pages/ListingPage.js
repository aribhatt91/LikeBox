import React, { useState, useEffect, useContext } from 'react';
import Page from './Page';
import ProductFilters from './../components/ProductFilters';
import { useParams, useLocation } from 'react-router-dom';
import { fetchProducts, getAvailableKeywords } from './../../service/productMethods';
import { Helmet } from 'react-helmet';
import { AuthContext } from './../../store/contexts/AuthContext';
import ProductListing from '../components/ProductListing';


function ListingPage(props) {
  const {category} = useParams();
  const [filterObject, setFilterObject] = useState(null);

  const applyFilter = async (obj) => {
    window.mlog('ListingPage:applyFilter ->', obj);
    //fetchAllProducts(filterObj);
    setFilterObject(obj);
  }

  useEffect(()=>{
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
              <ProductFilters 
                category={category}
                onFilterChange={applyFilter}/>
              <ProductListing category={category} filter={filterObject} />
            </div>
        </section>
    </Page>
  );
  
}


export default ListingPage;
