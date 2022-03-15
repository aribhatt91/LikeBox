import React, { useState, useContext, useEffect } from 'react';
import Page from '../Page';
import { LoadingPendulum } from '../../components/LoadingModule';
import ProductImageGrid from './components/ProductImageGrid';
import AppMessage from '../../components/_generic/AppMessage';
import AppButton from '../../components/_generic/AppButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import CartService from '../../../libs/CartService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import FourZeroFour from '../404';
import { fetchProduct } from '../../../libs/ProductService';
import { Helmet } from 'react-helmet';
import StarRating from '../../components/_generic/StarRating';
import WishListButton from '../../components/WishListButton';
import SignInMessage from '../../components/SignInMessage';
import SizeSelector from './components/SizeSelector';
import ProductDescription from './components/ProductDescription';
import PriceText from '../../components/_generic/PriceText';
import EventTracker from '../../../libs/api/EventTracker';
import './style.page.css';

function ProductForm({currentUser, product, addToCart, pending_update=false }){
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants[0]);
  const [loading, setLoading] = useState(false);

  
  /* const counter = (tag, val) => {
    setQuantity(val)
  } */

  const sizeSelect = (e) => {
    window.loginfo('sizeSelect', e.target.value);
    const val = e.target.value,
    newVar = product.variants.find(v => v.size === val);

    if(newVar){
      setVariant(newVar);
      EventTracker.trackEvent(EventTracker.events.product.SELECT_SIZE, variant);
    }
  }

  const trackConversion = () => {
    if(product){
      //logPurchase(product);
      EventTracker.trackEvent(EventTracker.events.product.PURCHASE, product);
    }
  }

  return (
    <React.Fragment>
      <h3 className="product-brand text-uppercase mb-0">{product.brand}</h3>
      <h5 className="product-name mb-lg-3">{variant.title || product.title}</h5>
      <div className="product-price">
        {
          product.full_price && product.full_price > product.price && <div className="product-full-price mb-1">
          <PriceText value={product.full_price}/>
        </div>
        }
        <div className="product-sale-price">
          <PriceText value={product.price}/>
        </div>
        {/* <div className="price-tax-info mt-1 mb-3">Inclusive of all taxes</div> */}
      </div>
      
      <div className="row">
        <div className="col-12">
          {/* <StarRating /> */}
        </div>
      </div>
      {product.variants && Array.isArray(product.variants) && product.variants.length && 
        <SizeSelector 
          className="mt-3 mb-3 mb-lg-5 mt-lg-5" 
          variants={product.variants || []} 
          onSelect={sizeSelect}
          disabled={!currentUser}/>
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
          <AppMessage inline={false} type="info" text="You are not signed in. Sign in to purchase this product" />
        </div>  
      }
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-2 p-0">
        {
          window.DEV_MODE && <AppButton 
                disabled={!currentUser}
                className='w-100'
                onClick={() => addToCart(currentUser.email, product, variant)}
                loading={pending_update}
                label={"Add to Bag"}
              />
        }
        {
          !window.DEV_MODE && <AppButton
            label="Go to brand"
            className="w-100"
            disabled={!currentUser /*|| quantity === 0 || (sizes.length > 0 && size === '')*/}
            href={(variant.link || "").split('?')[0]}
            ext={true}
            clickEvents={[trackConversion]}
          />
        }
      </div>
      <div className="product-cta-container col-md-10 clearfix mt-2 mb-5 p-0">
        <WishListButton variant="white" className="w-100" product={product} />
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
  
  const getProducts = async () => {
    try {
      if(!pending){
        setPending(true);
      }

      let product = await fetchProduct(id);
      setProduct(product);
      EventTracker.trackEvent(EventTracker.events.product.PRODUCT_VIEW, product);
      
    }catch(err){
      window.logerror('ProductPage', err);
      EventTracker.trackEvent(EventTracker.events.product.PRODUCT_FETCH_ERROR);
    }finally {
      setPending(false);
    }
  }

  useEffect(() => {
    
  }, [props.cart_error])
  
  useEffect(()=> {
    getProducts();
  }, [id])

  return (
    <React.Fragment>
    {(pending || product) && <Page className={"product-home-page pt-2 pt-lg-5 pb-5 position-relative"} product={product} pageName={"product-page"}>
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
            <ProductImageGrid
              images={product.images}
              productName={product.title}
            />
            <div className="product-details col-lg-5 float-left">
              <ProductForm 
                currentUser={currentUser} 
                product={product}
                addToCart={props.addToCart}
                pending_update={props.pending_update}/>

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
      cart: state.cartReducer.cart,
      cart_error: state.cartReducer.error,
      pending_update: state.cartReducer.update_pending
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart: CartService.addToCart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);