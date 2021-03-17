import React, { useState, useEffect } from 'react';
import Page from './Page';
import LoadingModule from './../components/LoadingModule';
import ProductCard, { ProductCardPlaceholder } from './../components/ProductCard';
import ProductFilters from './../components/ProductFilters';
import EMPTY from '../../assets/img/no-search-result.png';
import ErrorModule from './../components/ErrorModule';
import { useParams } from 'react-router-dom';
import { fetchProducts } from './../../service/api/firestore/product';
import { addUser, updateUserByEmail } from './../../service/api/firestore/user';
import { AuthContext } from './../../store/contexts/AuthContext';
import { addItemToWishList } from '../../service/wishlistMethods';

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
    let user = {
      email: 'a@f.com',
      name: {
        first: 'A',
        middle: '',
        last: 'B'
      }
    }
    let update = {
      'name.first': 'Zorro'
    }
    //addUser(user);
    //updateUserByEmail('z@f.com', update);
  }, [category])

  useEffect(()=> {
    if(page === 0 || maxReached){return}
  }, [page])

  return (
    <div className="product-cards-container">
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
class ListingPage extends Page {
  //Filter by search keyword, discount, price range, brand
  selected_brand = []; 
  selected_price_range = []; 
  selected_discount = [];
  
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      items: [],
      error: null
    }
    this.applyFilter = this.applyFilter.bind(this);
    this.applySort = this.applySort.bind(this);
  }

  
  componentDidMount(){
    //this.getProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log('componentDidUpdate -> ', prevProps, this.props);
    if(prevProps.match.params.category !== this.props.match.params.category){
      //this.getProducts();
    }
  }
  applyFilter(filterObj){
    console.log('ListingPage:applyFilter ->', filterObj);
    //fetchAllProducts(filterObj);
  }
  applySort(sortOrder){

  }

  render() {
    return (
      <section className="products-section">
        
          <div className="page container-fluid">
            <div className="listing-page-header m-3 text-center text-uppercase">
              {(this.props.match.params.category || "").replace('-', ' & ')}
            </div>
            <ProductFilters 
            filterHandler={this.applyFilter}
            sortHandler={this.applySort}
            products={this.state.items.length}></ProductFilters>
            
            {/* <div className="product-cards-container">
              {this.state.items.map((item)=>{
                return (<ProductCard 
                  key={item.sku}
                  title={item.name}
                  img={item.thumbnail}
                  price={item.price}
                  link={"/product/" + item.sku}
                  rating={item.ratings}
                  brand={item.brand}
                  ></ProductCard>)
              })}
            </div> */}
            <Listing />
          </div>
        
      </section>
    );
  }
}


export default ListingPage;
