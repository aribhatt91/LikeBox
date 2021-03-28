import React, { Component, useState, useContext, useLocation, useEffect } from 'react';
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
import { AuthContext } from './../../store/contexts/AuthContext';
import CartService from './../../service/cartOperation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import FourZeroFour from './FourZeroFour';
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

function ProductForm({product, sizes, addToCart}){
  const {currentUser} = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  
  const counter = (tag, val) => {
    setQuantity(val)
  }
  const sizeSelect = (tag, val) => {
    setSize(val)
  }
  const _addToCart = () => {
    if(!currentUser){
      console.log('User not logged in');
      return;
    }
    if(quantity <= 0){
      console.log('Add products');
      //Raise error
    }if(sizes.length > 0 && size === ''){
      console.log('Select size');
      //Raise error
    }else {
      console.log('Ready to add to cart');
      try {
        let p = {
          sku: product.sku,
          thumbnail: product.thumbnail,
          name: product.name,
          price: product.price,
          quantity: quantity
        }
        if(size !== ''){
          p.size = size;
        }
        addToCart(currentUser.email, p);
        //console.log()
      }catch(err){
        console.error('CartService error -> ', err);
      }
    }
  }
  const buyNow = () => {
    if(!currentUser){
      console.log('User not logged in');
      return;
    }
    if(quantity > 0){
      console.log('Add products');
      //Raise error
    }if(sizes.length > 0 && size === ''){
      console.log('Select size');
      //Raise error
    }else {
      //Show snackbar message
    }
  }

  return (
    <React.Fragment>
      {sizes.length > 0 && <div className="product-size-options mb-2 mt-3">
        <SizeSelector
          sizes={sizes}
          name="size"
          label="Select size"
          handler={sizeSelect}
        />
      </div>}
      {/* <div className="product-quantity mb-3">
        <Counter
          handler={counter}
          name="qty"
          label="Quantity"
        />
      </div> */}
      {
        !currentUser && <div className="col-12 m-2">
          <PageMessage inline={false} type="info" text="You are not signed in. Sign in to purchase this product" />
        </div>  
      }
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-2 p-0">
        <AppButton
          label="Buy now"
          className="w-100 btn-grey"
          disabled={!currentUser || quantity === 0 || (sizes.length > 0 && size === '')}
          onClick={buyNow}
        />
      </div>
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-5 p-0">
        <AppButton
          label="Add to cart"
          className="btn-white w-100"
          onClick={_addToCart}
          disabled={!currentUser || quantity === 0 || (sizes.length > 0 && size === '')}
        />
      </div>
    </React.Fragment>
  )
}

 
function ProductPage(props) {
  const [deliverable, setDeliverable] = useState(true);
  const [pending, setPending] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const checkPincode = async (pincode) => {
    try {
      let res = await checkDeliveryAvailability(pincode);
      setDeliverable(res);
    }catch(err){
      setDeliverable(false);
    }
  }
  const toggleProductWishList = async (id, wishStatus) => {
    if(wishStatus){
      removeItemFromWishList(id);
    }else {
      addItemToWishList(id);
    }
  }
  const parseProduct = (product) => {
    let sizes = [], images = [];
    try{
      if(typeof product.sizes !== 'undefined' && product.sizes !== "-"){
        if(typeof product.sizes === 'string'){
          sizes = product.sizes.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '');
          sizes = sizes.split(',') || [];
          
        }else if( product.sizes instanceof Array){
          sizes = product.sizes || [];
        } 
      }
      product.sizes = sizes;
    }catch(err){
      console.error('error while parsing product sizes', err, product.sizes);
    }
    try {
      if(typeof product.images !== 'undefined'){
        if(typeof product.images === 'string'){
          images = product.images.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '');
          images = images.split(',') || [];
        }else if( product.images instanceof Array){
          images = product.images || [];
        }
      }
      product.images = images;
    }catch(err){
      console.error('error while parsing product', err, product.images);
    }
    
    return product;
  }
  const getProducts = async () => {
    const sku = id;
    try {
      if(!pending){
        setPending(true);
      }
      console.log('getProduct -> ', sku);
      let product = await fetchProduct(sku);
      setProduct(parseProduct(product));
      document.title = product.name;
    }catch(err){
      console.err('ProductPage', err);
    }finally {
      setPending(false);
    }
  }
  
  useEffect(()=> {
    getProducts();
  }, [id])

  return (
    <Page className={"product-home-page pt-5 pb-5"} pageName={!pending && product ? product.title : "LikeBox" }>
        {pending && <LoadingModule />}
        {!pending && product && 
          <div className="d-block">
            <ProductHeroGallery
              images={product.images}
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
              
              <ProductForm addToCart={props.addToCart} product={product} sizes={product.sizes} />

              <ProductDescComponent description={product.description}/>
            </div>
          </div>
        }
        {!pending && !product && <FourZeroFour/>} 
      </Page>
    )
} 


/* class ProductPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      product: null,
      error: null,
      pincode_error: false
    }
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
    let product = this.state.product ? this.state.product : {}, sizes = [], images = [];
    const {addToCart} = this.props;
    console.log(this.state.size, this.state.qty);
    try{
      if(typeof product.sizes !== 'undefined' && product.sizes !== "-"){
        if(typeof product.sizes === 'string'){
          if(product.sizes.indexOf('[') === -1 && product.sizes.indexOf(']') === -1){
            sizes = product.sizes.split(',');
          }else {
            sizes = JSON.parse(product.sizes || "");
          }
        }else if( product.sizes instanceof Array){
          sizes = product.sizes || [];
        }else {

        }
      }
    }catch(err){
      console.error('error while parsing sizes', err, product.sizes);
    }
    

    if(typeof product.images !== 'undefined'){
      if(typeof product.images === 'string'){
        if(product.images.indexOf('[') === -1 && product.images.indexOf(']') === -1){
          images = product.images.split(',');
        }else{
          images = JSON.parse(product.images || "");
        }
      }else if( product.images instanceof Array){
        images = product.images || [];
      }
    }

    return (
      <div className="page product-home-page pt-5 pb-5">
        {this.state.pending && <LoadingModule />}
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
              
              <ProductForm addToCart={addToCart} product={this.state.product} sizes={sizes} />

              <ProductDescComponent description={product.description}/>
            </div>
          </div>}
        {!this.state.pending && !this.state.product && <FourZeroFour/>} 
      </div>
    );
  }
} */

//export default ProductPage;


const mapStateToProps = state => {
  return {
      cart: state.cartReducer.cart
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({addToCart: CartService.addToCart}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);