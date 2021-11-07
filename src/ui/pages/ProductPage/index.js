import React, { useState, useContext, useEffect } from 'react';
import Page from '../Page';
import './index.css';
import { LoadingPendulum } from '../../components/LoadingModule';
import ProductHeroGallery from './components/ProductHeroGallery';
import PageMessage from '../../components/generic/PageMessage';
import AppButton from '../../components/generic/AppButton';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab'
import { AuthContext } from '../../../store/contexts/AuthContext';
import CartService from '../../../service/cartOperation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import FourZeroFour from '../FourZeroFour';
import { fetchProduct } from '../../../service/productMethods';
import { formatPrice } from '../../../service/helper';
import RadioButtonGroup from '../../components/generic/RadioButtonGroup';
import { Helmet } from 'react-helmet';
import StarRating from '../../components/generic/StarRating';
import WishListButton from '../../components/WishListButton';
import SizeGuide from './components/SizeGuide';
import SizeChart from './components/SizeChart';
import { logAddToCart, logSelectItem } from '../../../service/api/analytics';
import { logPurchase } from '../../../service/api/analytics/index';
import { detailPageView } from '../../../service/api/recommendations/index';
import SignInMessage from '../../components/SignInMessage';
function ProductDescription({product}){
  const [key, setKey] = useState('desc');
  return (
    <div className="app-tab-layout">
      <Tabs
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="desc" title="Description">
          <div className="d-flex">
            {product.description || ""}
          </div>
        </Tab>
        <Tab eventKey="size" title="Sizing">
          <React.Fragment>
            {
              product.brand && <SizeChart affiliate={(product.merchant_name || "").toLowerCase()} />
            }
          </React.Fragment>
        </Tab>
      </Tabs>


    </div>
  )
}
function ProductForm({currentUser, product, sizes, addToCart }){
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
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

  const trackConversion = () => {
    console.log('trackConversion');
    if(product){
      logPurchase(product);
    }
  }
  

  return (
    <React.Fragment>
      {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && 
        <div className="product-size-options mt-3 mb-3 mb-lg-5 mt-lg-5">
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
        product.merchant_name && <div>
          <SizeGuide affiliate={(product.merchant_name || "").toLowerCase()} className="text-uppercase size-guide-link mt-2 mb-2 mt-lg-5 mb-lg-5" />
        </div>
      }
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
          ext={true}
          clickEvents={[trackConversion]}
        />
      </div>
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-5 p-0">
        <WishListButton className="btn-white w-100" product={product} />
      </div>
    </React.Fragment>
  )
}

 
function ProductPage(props) {
  //const [deliverable, setDeliverable] = useState(true);
  const [pending, setPending] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  
  const parseProduct = (product) => {
    if(!product || !product.sku){
      return null;
    }
    let sizes = [], images = [];
    try{
      window.mlog('Product Sizes -> ', product.sizes);
      if(typeof product.sizes !== 'undefined' && product.sizes !== "-"){
        if(typeof product.sizes === 'string'){
          sizes = product.sizes.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '');
          sizes = sizes.split(',') || [];
          //window.mlog('Sizes -> ', sizes);
          
        }else if( product.sizes instanceof Array){
          sizes = product.sizes || [];
          //window.mlog('Sizes -> ', sizes);
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
      logSelectItem([product]);
      detailPageView(product);
      
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
    {(pending || product) && <Page className={"product-home-page pt-2 pt-lg-5 pb-5 position-relative"} product={product} pageName={"pdp"}>
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
              productName={product.name}
            />
            <div className="product-details col-lg-5 float-left">
              <div className="product-brand">{product.brand}</div>
              <div className="product-name mb-lg-3">{product.name}</div>
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
                currentUser={currentUser} 
                link={product.link} 
                product={product} 
                sizes={product.sizes} />

              <ProductDescription product={product}/>
            </div>
          </div>
        }
        
      </Page>}
      {!pending && !product && currentUser && <FourZeroFour/>}
      {!pending && !product && !currentUser && <SignInMessage/>} 
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