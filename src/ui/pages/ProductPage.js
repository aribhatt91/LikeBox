import React, {Component, useState, useLocation, useEffect, useParams} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import LoadingModule from './../components/LoadingModule';
import fetchProduct from './../../service/fetchProduct';

class ProductPage extends Page {
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      items: [],
      error: null
    }
  }

  getProducts(){
    const {fetchProduct} = this.props;
    const sku = this.props.match.params.id;
    console.log('getProduct -> ', sku);
    fetchProduct(sku);
  }
  componentDidMount(){
    this.getProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    console.log('componentDidUpdate -> ', prevProps, this.props);
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.getProducts();
    }
  }

  render() {
    return (
      <div className="products-section">
        {this.props.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.props.pending && this.props.items.length > 0 && 
          <div>
            <div className="haeder">
              Found {this.props.items.length} products
            </div>
            {/* {this.props.items.map((item)=>{
              return (<ProductCard 
                key={item.sku}
                title={item.name}
                img={item.thumbnail}
                price={item.price}
                link={"/product/" + item.sku}
                rating={item.ratings}
                brand={item.brand}
                ></ProductCard>)
            })} */}
          </div>}
        {!this.props.pending && this.props.items.length === 0 && <div>No products found</div>} 
      </div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({'fetchProduct': fetchProduct}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
