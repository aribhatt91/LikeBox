import React, {Component, useState, useLocation, useEffect, useParams} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import fetchItems from './../../service/fetchItems';
import LoadingModule from './../components/LoadingModule';
import { ProductCard } from './../components/ProductCard';
import ProductFilters from './../components/ProductFilters';

class ListingPage extends Page {
  //Filter by search keyword, discount, price range, brand
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

  }
  handlePriceFilter(el){
    
  }
  handleDiscountFilter(e){
    
  }
  handleSubCategoryFilter(e){
    
  }

  render() {
    return (
      <section className="products-section">
        {this.props.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.props.pending && this.props.items.length > 0 && 
          <div className="flex_container">
            <ProductFilters></ProductFilters>
            
            <div className="product_cards_container">
              <div className="heade col-12">
                Found {this.props.items.length} products
              </div>
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
        {!this.props.pending && this.props.items.length === 0 && <div>No products found</div>} 
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
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchProducts: fetchItems}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
