import React, {Component, useState, useLocation, useEffect, useParams} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import LoadingModule from './../components/LoadingModule';
import fetchProduct from './../../service/fetchProduct';
import ProductHeroGallery from '../components/ProductHeroGallery';

function SizeSelector({sizes, handler, label, name}){
  let size_radios = [];
  const handleSelect = (e) => {
    if(typeof handler === 'function'){
      handler(e.target.name, e.target.value);
    }else {
      console.log(e.target.name, e.target.value);
    }
  }
  (sizes || []).forEach((item, index) => {
    size_radios.push(
      <label className="square-radio mr-2 mb-2" key={index}>
        <input type="radio" name={name} value={item} onChange={handleSelect} />
        <span className="square-radio-text">{item}</span>
      </label>
    );
  });
  return (
    <div className="select-size-wrapper">
      <div className="select-size-label mb-2">{label}</div>
      <div className="select-size-input-container">
        {
          size_radios
        }
      </div>
    </div>
  )
}
function Incrementer({handler, limit, label, initial_count}){
  const [val, setVal] = useState(initial_count || 0);
  
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  )
}
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
    let product = this.props.items.length > 0 ? this.props.items[0] : {}, sizes = [];
    if(typeof product.sizes !== 'undefined'){
      if(typeof product.sizes === 'string'){
        sizes = (product.sizes || "").split(",") || [];
      }else if( product.sizes instanceof Array){
        sizes = product.sizes || [];
      }
    }

    return (
      <div className="product-home-page">
        {this.props.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.props.pending && this.props.items.length > 0 && 
          <div className="d-lg-flex">
            <ProductHeroGallery
              images={product.images}
              product_name={product.name}
            />
            <div className="product-details p-2">
              <div className="product-name">{product.name}</div>
              <div className="product-brand mb-3">{product.brand}</div>
              <div className="product-price">
                <div className="product-sale-price">&#x20B9;{product.price}</div>
                {product.fullPrice && product.fullPrice !== "" && product.fullPrice !== product.price && <div>
                  <div className="product-full-price"><strike>&#x20B9;{product.fullPrice}</strike></div>
                  <div className="product-discount">{product.discount}% discount</div>
                </div>}
              </div>
              <div className="product-size-options mb-2 mt-3">
                <SizeSelector
                  sizes={sizes}
                  name="size"
                  label="Select size"
                />
              </div>
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
