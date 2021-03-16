import React, {Component, useState, useContext, useLocation, useEffect, useParams} from 'react';
import Page from './Page';
import LoadingModule from './../components/LoadingModule';
import ProductHeroGallery from '../components/ProductHeroGallery';
import PageMessage from '../components/generic/PageMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import TextInput from '../components/generic/TextInput';
import { checkDeliveryAvailability } from '../../service/addressMethods';
import { addItemToWishList, removeItemFromWishList } from '../../service/wishlistMethods';
import Counter from '../components/generic/Counter';
import AppButton from './../components/generic/AppButton';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import { fetchProduct } from './../../service/api/firestore/product';
import { addUser } from './../../service/api/firestore/user';
import { AuthContext } from './../../store/contexts/AuthContext';
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

function RatingStars(ratings){
  let full = Math.floor(Number(ratings)) || 0, part = (Number(ratings) - full) > 0,
  stars = [];
  
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <span class={"mr-2 rating-star" + (index <= full ? " active" : "") + (index === full + 1 && part ? " half-star" : "")}>
        {
          index <= full && <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        }
        {
          (index === full + 1 && part) && <FontAwesomeIcon icon={faStarHalfAlt}></FontAwesomeIcon>
        }
        {
          ((!part && index > full) || (part && index > full + 1)) && <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        }
      </span>
    )
  }

}
const formatDeliveryDate = (dateObj) => {
  if(dateObj instanceof Date){
    let res = dateObj.toDateString().replace(dateObj.getFullYear(), "").trim();
    return res.replace(" ", ", ");
  }
  return null;
}
function ProductDelivery({handler}){
  let d = new Date();
  d.setDate(d.getDate() + 4);

  return (
    <div className="product-delivery-container mt-2">
      <div className="product-delivery-header mb-2">Delivery options</div>
      <div className="product-delivery-check">
        <div className="col-6 pl-0 pr-2">
          <TextInput
              name="pincode"
              label="Enter pincode"
          />
        </div>
        
        <div className="small-msg mt-1">Please enter PIN code to check delivery availability</div>
      </div>
      <ul className="product-delivery-options mt-2 mb-2">
        <li>Get it by {formatDeliveryDate(d)}</li>
        <li>Pay on delivery available</li>
        <li>Easy 30 days return & exchange available</li>
        <li>100% Original Products</li>
        <li>Free Delivery on order above &#x20B9;799</li>
      </ul>
    </div>
  )
}

function PinCodeChecker (props) {
  
}

function ProductDescComponent({description, sizing, shipping, returns}){
  const [key, setKey] = useState('desc');
  return (
    <div className="app-tab-layout">
      <Tabs
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="desc" title="Description">
          <div>
            {description || "100% Original Products"}
          </div>
        </Tab>
        <Tab eventKey="size" title="Sizing">
          <div>Sizing</div>
        </Tab>
        <Tab eventKey="ship" title="Shipping">
          <div>
            <p>Pay on delivery available</p>
            <p>Get it by Fri, Mar 05</p>
            <p>Free Delivery on order above ₹799</p>
          </div>
        </Tab>
        <Tab eventKey="ret" title="Returns">
          <div>
          Easy 30 days return & exchange available
          </div>
        </Tab>
      </Tabs>


    </div>
  )
}

function ProductForm(){
  const {currentUser} = useContext(AuthContext);
  const [quantity, setQuantity] = useState()

  const buyNow = () => {
    if(this.state.qty > 0){

    }else {

    }
  }
  const addToCart = () => {
    if(this.state.qty > 0){

    }else {
      
    }
  }

  return (
    <div></div>
  )
}
class ProductPage extends Page {
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      product: null,
      error: null,
      pincode_error: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.buyNow = this.buyNow.bind(this);
    this.addToCart = this.addToCart.bind(this);

  }

  async checkPincode(pincode) {
    let res = await checkDeliveryAvailability(pincode);
    this.setState({
      ...this.state,
      res
    })
  }
  toggleProductWishList(id, wishStatus) {
    if(wishStatus){
      removeItemFromWishList(id);
    }else {
      addItemToWishList(id);
    }
  }
  async getProducts(){
    const sku = this.props.match.params.id;
    console.log('getProduct -> ', sku);
    let product = await fetchProduct(sku);
    this.setState(
      {
        ...this.state,
        pending: false,
        product
      }
    )
  }
  handleInput(tag, val) {
    this.setState({
      ...this.state,
      [tag]: val
    })
  }
  buyNow(){
    if(this.state.qty > 0){

    }else {

    }
  }
  addToCart(){
    if(this.state.qty > 0){

    }else {
      
    }
  }
  componentDidMount(){
    //super();
    this.getProducts();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.getProducts();
    }
  }

  render() {
    let product = this.state.product ? this.state.product : {}, sizes = [], images = [],
    disable_cta = !this.state.size || !(this.state.qty && this.state.qty > 0);
    console.log(this.state.size, this.state.qty);
    if(typeof product.sizes !== 'undefined'){
      if(typeof product.sizes === 'string'){
        sizes = JSON.parse(product.sizes || "");
      }else if( product.sizes instanceof Array){
        sizes = product.sizes || [];
      }
    }

    if(typeof product.images !== 'undefined'){
      if(typeof product.images === 'string'){
        images = JSON.parse(product.images || "");
      }else if( product.images instanceof Array){
        images = product.images || [];
      }
    }

    return (
      <div className="page product-home-page pt-5 pb-5">
        {this.state.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.state.pending && this.state.product && 
          <div className="d-block">
            <ProductHeroGallery
              images={images}
              product_name={product.name}
              product_id={product.sku}
            />
            <div className="product-details p-2 col-lg-5 float-left">
              <div className="product-brand">{product.brand}</div>
              <div className="product-name mb-3">{product.name}</div>
              <div className="product-price">
                <div className="product-sale-price">
                  &pound;{product.price}
                </div>
                <div className="price-tax-info mt-1 mb-3">Inclusive of all taxes</div>
              </div>
              {product.rating && RatingStars((product.rating || ""))}
              <div className="product-size-options mb-2 mt-3">
                <SizeSelector
                  sizes={sizes}
                  name="size"
                  label="Select size"
                  handler={this.handleInput}
                />
              </div>
              <div className="product-quantity mb-3">
                <Counter
                  handler={this.handleInput}
                  name="qty"
                  label="Quantity"
                />
              </div>
              <div className="product-cta-container col-md-10 clearfix mt-2 mb-2 p-0">
                <AppButton
                  label="Buy now"
                  className="w-100"
                  disabled={disable_cta}
                  onClick={this.buyNow}
                />
              </div>
              <div className="product-cta-container col-md-10 clearfix mt-2 mb-5 p-0">
                <AppButton
                  label="Add to cart"
                  className="btn-white w-100"
                  onClick={this.addToCart}
                  //disabled={disable_cta}
                />
              </div>
              {/* <ProductDelivery/> */}
              <ProductDescComponent description={product.description}/>
            </div>
          </div>}
        {!this.state.pending && !this.state.product && <div>No products found</div>} 
      </div>
    );
  }
}

export default ProductPage;


