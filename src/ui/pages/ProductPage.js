import React, { useState, useContext, useEffect } from 'react';
import Page from './Page';
import { LoadingPendulum } from './../components/LoadingModule';
import ProductHeroGallery from '../components/ProductHeroGallery';
import PageMessage from '../components/generic/PageMessage';
import { checkDeliveryAvailability } from '../../service/addressMethods';
import { addItemToWishList, removeItemFromWishList, itemInWishList } from '../../service/wishlistMethods';
import Counter from '../components/generic/Counter';
import AppButton from './../components/generic/AppButton';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import { AuthContext } from './../../store/contexts/AuthContext';
import CartService from './../../service/cartOperation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import FourZeroFour from './FourZeroFour';
import { useNotification } from './../../store/contexts/NotificationProvider';
import { fetchProduct } from './../../service/productMethods';
import AppTextInput from './../components/generic/AppTextInput';
import { formatPrice } from '../../service/helper';
import RadioButtonGroup from './../components/generic/RadioButtonGroup';
import { Helmet } from 'react-helmet';
import StarRating from '../components/generic/StarRating';

function SizeSelector({sizes, handler, label, name}){
  let size_radios = [];
  const handleSelect = (e) => {
    if(typeof handler === 'function'){
      handler(e.target.name, e.target.value);
    }else {
      window.mlog(e.target.name, e.target.value);
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
          <AppTextInput
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
function SizeChart(brand, category) {

}
function ProductDescription({description, sizing, deliveryTime, deliveryCost, returns}){
  const [key, setKey] = useState('desc');
  return (
    <div className="app-tab-layout">
      <Tabs
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="desc" title="Description">
          <div>
            {description || ""}
          </div>
        </Tab>
        <Tab eventKey="size" title="Sizing">
          <div></div>
        </Tab>
        <Tab eventKey="ship" title="Shipping">
          <div>
            {deliveryCost && <p>{deliveryCost}</p>}
            {deliveryTime && <p>{deliveryTime}</p>}
          </div>
        </Tab>
        <Tab eventKey="ret" title="Returns">
          <div>

          </div>
        </Tab>
      </Tabs>


    </div>
  )
}

/* const _addToCart = () => {
    if(!currentUser){
      window.mlog('User not logged in');
      return;
    }
    if(quantity <= 0){
      window.mlog('Add products');
      //Raise error
    }if(sizes.length > 0 && size === ''){
      window.mlog('Select size');
      //Raise error
    }else {
      window.mlog('Ready to add to cart');
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
        //window.mlog()
      }catch(err){
        console.error('CartService error -> ', err);
      }
    }
  }
  const buyNow = () => {
    if(!currentUser){
      window.mlog('User not logged in');
      return;
    }
    if(quantity > 0){
      window.mlog('Add products');
      //Raise error
    }if(sizes.length > 0 && size === ''){
      window.mlog('Select size');
      //Raise error
    }else {
      //Show snackbar message
    }
  } */
function ProductForm({currentUser, product, sizes, addToCart, inWishList, toggleInWishList}){
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [cta1Loading, setCta1Loading] = useState(false);
  const [link, setLink] = useState(product.link || "#");

  
  /* const counter = (tag, val) => {
    setQuantity(val)
  } */

  useEffect(() => {
    if(product.variants){

    }
  }, [])
  const sizeSelect = (val) => {
    window.mlog('sizeSelect', val);
    /* setSize(val);
    if(product.variants && Array.isArray(product.variants)) {
      for (let index = 0; index < product.variants.length; index++) {
        const element = product.variants[index];
        if(element.size === val && element.link){
          setLink(element.link);
        }
      }
    } */
  }
  

  return (
    <React.Fragment>
      {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && 
        <div className="product-size-options mb-5 mt-5">
          <h6 className="text-uppercase">Available sizes</h6>
          <RadioButtonGroup 
              name="size"
              label="Select size"
              options={product.sizes}
              disabled={!currentUser}
              onChange={sizeSelect}
              defaultChecked={product.sizes[0]}
          />
        </div>
      }
      {/* <div className="product-quantity mb-3">
        <Counter
          handler={counter}
          name="qty"
          label="Quantity"
        />
      </div> */}
      {
        !currentUser && <div className="w-100 d-flex mb-2 mt-2 p-0">
          <PageMessage inline={false} type="info" text="You are not signed in. Sign in to purchase this product" />
        </div>  
      }
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-2 p-0">
        <AppButton
          label="Go to brand"
          className="w-100 btn-grey"
          disabled={!currentUser /*|| quantity === 0 || (sizes.length > 0 && size === '')*/}
          href={link}
          target="_blank"
          ext={true}
        />
      </div>
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-5 p-0">
        <AppButton
          label={inWishList ? "Remove from Wishlist" : "Add to Wishlist"}
          className="btn-white w-100"
          onClick={toggleInWishList}
          disabled={!currentUser  /*|| quantity === 0 || (sizes.length > 0 && size === '')*/}
        />
      </div>
    </React.Fragment>
  )
}

 
function ProductPage(props) {
  //const [deliverable, setDeliverable] = useState(true);
  const [pending, setPending] = useState(true);
  const [product, setProduct] = useState(null);
  const [inWishList, setInWishList] = useState(false);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const dispatch = useNotification();

  useEffect(()=>{
    if(currentUser && id){
      try{
        if(id){
          
          (async ()=>{
            let res = await itemInWishList(currentUser.email, id);
            setInWishList(res);
          })()
        }
        
      }catch(err){
        console.error(err);
      }
    }
  }, [id, currentUser])
  const checkPincode = async (pincode) => {
    /* try {
      let res = await checkDeliveryAvailability(pincode);
      setDeliverable(res);
    }catch(err){
      setDeliverable(false);
    } */
  }
  const toggleInWishList = async () => {
    if(currentUser && id){
      try {
        if(inWishList){
          (async ()=>{
            let res = await removeItemFromWishList(currentUser.email, id);
            //let res = await itemInWishList(currentUser.email, id);
            if(res.type === 'success'){
              setInWishList(false);
              dispatch({
                type: res.type,
                title: 'Success!',
                message: res.msg
              })
            }
          })()
        }else {
          (async ()=>{
            let res = await addItemToWishList(currentUser.email, id, product);
            if(res.type === 'success'){
              setInWishList(true);
              dispatch({
                type: res.type,
                title: 'Success!',
                message: res.msg
              })
            }
          })()
        }
      }catch(err){
        window.mlog('toggleWishList', err);
        dispatch({
          type: 'error',
          title: 'Error!',
          message: 'Something went wrong!'
        })
      }
    }
  }
  const parseProduct = (product) => {
    if(!product || !product.sku){
      return null;
    }
    let sizes = [], images = [];
    try{
      window.mlog('Sizes -> ', product.sizes);
      if(typeof product.sizes !== 'undefined' && product.sizes !== "-"){
        if(typeof product.sizes === 'string'){
          sizes = product.sizes.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '');
          sizes = sizes.split(',') || [];
          window.mlog('Sizes -> ', sizes);
          
        }else if( product.sizes instanceof Array){
          sizes = product.sizes || [];
          window.mlog('Sizes -> ', sizes);
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
      //window.mlog('getProduct -> ', sku);
      //let product = await fetchProduct(sku);
      let product = await fetchProduct(sku);
      //window.mlog('fetchedProduct ->', product);
      setProduct(parseProduct(product));
      
    }catch(err){
      console.error('ProductPage', err);
    }finally {
      setPending(false);
    }
  }
  
  useEffect(()=> {
    getProducts();
  }, [id])

  return (
    <React.Fragment>
    {(pending || product) && <Page className={"product-home-page pt-5 pb-5 position-relative"} product={product} pageName={"pdp"}>
        {pending && <LoadingPendulum />}
        {!pending && product && 
          <div className="d-block">
            <Helmet>
              <meta property="description" content={product.description || ""} />
              <meta property="og:description" content={product.description || ""} />
              <meta property="og:url" content={product.link} />
              <meta property="og:type" content={product.category} />
              <meta property="og:image" content={product.thumbnail} />
            </Helmet>
            <ProductHeroGallery
              images={product.images}
              product_name={product.name}
              product_id={product.sku}
              inWishList={inWishList}
              toggleInWishList={toggleInWishList}
            />
            <div className="product-details p-2 col-lg-5 float-left">
              <div className="product-brand">{product.brand}</div>
              <div className="product-name mb-3">{product.name}</div>
              <div className="product-price">
                {
                  product.fullPrice && (product.fullPrice > product.salePrice) && <div className="product-full-price mb-1">
                  <span>{formatPrice(product.price)}</span>
                  <span className="text-uppercase ml-1">{product.currency}</span>
                </div>
                }
                <div className="product-sale-price">
                  <span>{formatPrice(product.price)}</span>
                  <span className="text-uppercase ml-1">{product.currency}</span>
                </div>
                {/* <div className="price-tax-info mt-1 mb-3">Inclusive of all taxes</div> */}
              </div>
              
              <div className="row">
                <div className="col-12">
                  {/* <StarRating /> */}
                </div>
              </div>
              
              
              <ProductForm 
                inWishList={inWishList}
                toggleInWishList={toggleInWishList} 
                currentUser={currentUser} 
                link={product.link} 
                addToCart={props.addToCart} 
                product={product} 
                sizes={product.sizes} />

              <ProductDescription description={product.description}/>
            </div>
          </div>
        }
        
      </Page>}
      {!pending && !product && <FourZeroFour/>} 
      </React.Fragment>
    )
} 


const mapStateToProps = state => {
  return {
      cart: state.cartReducer.cart
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({addToCart: CartService.addToCart}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);