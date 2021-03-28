import React, { Component, useState, useEffect } from 'react';
import Page from './Page';
import ProductCard, { ProductCardPlaceholder } from './../components/ProductCard';
import ProductFilters from './../components/ProductFilters';
import EMPTY from '../../assets/img/no-search-result.png';
import ErrorModule from './../components/ErrorModule';
import { useParams } from 'react-router-dom';
import { fetchProducts } from './../../service/api/firestore/product';

const EMPTY_TEXT = "Sorry, no results found!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else",
LOADING_TEXT = "";

//Firestore Pagination - https://stackoverflow.com/questions/53044791/how-to-paginate-cloud-firestore-data-with-reactjs
function Listing({type, filter, sortBy}){
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const {category} = useParams();
  const [maxReached, setMaxReached] = useState(false);

  const getProducts = async () => {
    console.log('getProducts called', category);
    setLoading(true);
    let data = await fetchProducts(category);
    setProducts(data);
    setLoading(false);
  }

  useEffect(()=>{
    getProducts();
  }, [category])

  useEffect(()=> {
    if(page === 0 || maxReached){return}
  }, [page])

  return (
    <div className="product-cards-container d-flex flex-column">
      {
        !loading && products && products.length > 0 && products.map((item, index) => <ProductCard 
                  key={index}
                  sku={item.sku}
                  title={item.name}
                  img={item.thumbnail}
                  price={item.price}
                  link={"/product/" + item.sku}
                  rating={item.ratings}
                  brand={item.brand}
                  desc={item.description}
                  ></ProductCard>)
      }
      {
        loading && <div className="loading-state">
          <ProductCardPlaceholder/>
          <ProductCardPlaceholder/>
          <ProductCardPlaceholder/>
        </div>
      }
      {!loading && products.length === 0 && <ErrorModule
          error_image={EMPTY}
          error_text={EMPTY_TEXT}
          error_subtext={EMPTY_SUBTEXT}
        />} 
    </div>
  )
}
function ListingPage(props) {
  const {category} = useParams();

  const applyFilter = async (filterObj) => {
    console.log('ListingPage:applyFilter ->', filterObj);
    //fetchAllProducts(filterObj);
  }
  const applySort = async (sortOrder) => {

  }

  return (
    <Page pageName={(category|| "").replace('-', ' & ').toUpperCase()}>
        <section className="products-section">
            <div className="page container-fluid">
              <h1 className="listing-page-header m-3 mt-5 mb-5 text-center text-uppercase">
                {(category|| "").replace('-', ' & ')}
              </h1>
              <ProductFilters 
                filterHandler={applyFilter}
                sortHandler={applySort}
                products={0} />
              <Listing/>
            </div>
        </section>
    </Page>
  );
  
}


export default ListingPage;
