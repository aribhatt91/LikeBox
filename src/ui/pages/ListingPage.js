import React, {Component, useState, useLocation, useEffect, useParams} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import { fetchAllProducts } from '../../service/productMethods';
import LoadingModule from './../components/LoadingModule';
import { ProductCard } from './../components/ProductCard';
import ProductFilters from './../components/ProductFilters';
import EMPTY from '../../assets/img/no-search-result.png';
import ErrorModule from './../components/ErrorModule';

const EMPTY_TEXT = "Sorry, no results found!",
EMPTY_SUBTEXT = "Please check the spelling or try searching for something else";

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
    this.handleBrandFilter = this.handleBrandFilter.bind(this);
  }

  getProducts(){
    const {fetchProducts} = this.props;
    const cat = this.props.match.params.category;
    const filter = {};
    if(cat){
      filter.category = cat;
    }
    console.log('getProducts -> ', filter);
    fetchProducts(filter);
  }
  componentDidMount(){
    this.getProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log('componentDidUpdate -> ', prevProps, this.props);
    if(prevProps.match.params.category !== this.props.match.params.category){
      this.getProducts();
    }
  }
  handleBrandFilter(e){
    console.log('Dummy Filter event handler ->', e.target.value);
    var brand = e.target.value;
    if(this.selected_brand.indexOf(brand) > -1){
      this.selected_brand = this.selected_brand.filter((b)=> {return b!==brand;});
    }else {
      this.selected_brand.push(brand)
    }
  }
  handlePriceFilter(e){
    console.log('Dummy Filter event handler ->', e.target.value);
    
  }
  handleDiscountFilter(e){
    console.log('Dummy Filter event handler ->', e.target.value);
    
  }
  handleSortBy(e){

  }
  handleSubCategoryFilter(e){
    
  }

  render() {
    return (
      <section className="products-section">
        {this.props.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.props.pending && this.props.items.length > 0 && 
          <div className="container-fluid">
            <ProductFilters 
            _handleBrandSelect = {this.handleBrandFilter}
            _handlePriceRangeSelect={this.handlePriceFilter}
            _handleDiscountSelect={this.handleDiscountFilter}
            _handleSortBy={this.handleSortBy}
            products={this.props.items.length}></ProductFilters>
            
            <div className="product_cards_container page-content-wrapper">
              {this.props.items.map((item)=>{
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
            </div>
          </div>}
        {!this.props.pending && this.props.items.length === 0 && <ErrorModule
          error_image={EMPTY}
          error_text={EMPTY_TEXT}
          error_subtext={EMPTY_SUBTEXT}
        />} 
      </section>
    );
  }
}
const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    pending: state.itemsReducer.pending,
    items: state.itemsReducer.items,
    error: state.itemsReducer.error
  }
}
//Anything returned from this function will end up as props to BookList container
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchProducts: fetchAllProducts}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
