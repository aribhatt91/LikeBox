import React, { useContext } from 'react';
import AppButton from '../_generic/AppButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import WishListButton from '../WishListButton';
import PriceText from '../_generic/PriceText';
import './style.component.css';


export function ProductCardPlaceholder () {
    return (
        <div className="product-card product-card--skeleton placeholder anim--slide-up row mr-0 ml-0 mt-5 mb-5">
            <div className="product-card__thumb-wrapper p-0 col-xs-12 col-md-4 col-lg-3">
            </div>
            <div className="product-card__detail col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-card__text w-100 justify-center">
                    <div className="placeholder__element w-100"></div>
                    <div className="placeholder__element w-100 mt-3"></div>
                    <div className="placeholder__element w-50 mt-3"></div>
                </div>
                <div className="product-card__buttons w-100">
                    <div className="placeholder__element w-100"></div>
                    <div className="placeholder__element w-100 mt-2"></div>
                </div>
            </div>
            <div className="product-card__description col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                <div className="placeholder__element w-100"></div>
                <div className="placeholder__element w-100 mt-2"></div>
                <div className="placeholder__element w-50 mt-2"></div>
            </div>
        </div>
    )
}

const ProductCard = ({product}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="product-card row mr-0 ml-0 mt-5 mb-5" key={product.id}>
            <div className="product-card__thumb-wrapper p-0 col-xs-12 col-md-4 col-lg-3">
{/*                 <AppImage className="card-thumb" src={(decodeURI(props.img) || "").trim()} alt={props.title} aria-label={props.title} />
 */}                <LazyLoadImage
                    alt={product.title || product.name}
                    aria-label={product.title || product.name}
                    effect="opacity"
                    src={(decodeURI(product.thumbnail) || "").trim() + '&w=400&h=400'}
                    className="product-card__thumb w-100 h-100" />
            </div>
            <div className="product-card__detail col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-card__text">
                    <h3 className="product-card__text-brand text-center">{product.brand}</h3>
                    <h4 className="product-card__text-name text-center">{product.title || product.name}</h4>
                    <div className="product-card__text-price text-center">
                        <PriceText value={product.price} />
                    </div>
                </div>
                <div className="product-card__buttons w-100">
                    <AppButton href={"/product/" + product.id} target="_blank" label="View product" className="w-100"/>
                    <WishListButton variant="secondary" className={"w-100 mt-2"} product={product} />
                </div>
            </div>
            <div className="product-card__description col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                {
                    (product.description || "")
                }
            </div>
        </div>
    );
}


export default ProductCard;