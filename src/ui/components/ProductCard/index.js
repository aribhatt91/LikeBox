import React, { useContext } from 'react';
import AppButton from '../_generic/AppButton';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import WishListButton from '../WishListButton';
import PriceText from '../_generic/PriceText';

export function ProductCardPlaceholder () {
    return (
        <div className="product-card-placeholder placeholder slide-up row mr-0 ml-0 mt-5 mb-5">
            <div className="card-thumb-wrapper-placeholder p-0 col-xs-12 col-md-4 col-lg-3">
            </div>
            <div className="card-text-wrapper col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-description-placeholder w-100">
                    <div className="card-product-brand-placeholder w-100"></div>
                    <div className="card-product-name-placeholder w-100 mt-4"></div>
                    <div className="card-product-price-placeholder w-100 mt-4"></div>
                </div>
                <div className="action-buttons-placeholder w-100">
                    <div className="button-placeholder w-100"></div>
                    <div className="button-placeholder w-100 mt-2"></div>
                </div>
            </div>
            <div className="card-desc-wrapper-placeholder col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                <div className="line w-100"></div>
                <div className="line w-100 mt-2"></div>
                <div className="line w-100 mt-2"></div>
            </div>
        </div>
    )
}

const ProductCard = ({product}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="product-card row mr-0 ml-0 mt-5 mb-5" key={product.id}>
            <div className="card-thumb-wrapper p-0 col-xs-12 col-md-4 col-lg-3">
{/*                 <AppImage className="card-thumb" src={(decodeURI(props.img) || "").trim()} alt={props.title} aria-label={props.title} />
 */}                <LazyLoadImage
                    alt={product.title || product.name}
                    aria-label={product.title || product.name}
                    effect="opacity"
                    src={(decodeURI(product.thumbnail) || "").trim() + '&w=400&h=400'}
                    className="card-thumb w-100 h-100" />
            </div>
            <div className="card-text-wrapper col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-description">
                    <h3 className="card-product-brand text-center">{product.brand}</h3>
                    <h4 className="card-product-name text-center">{product.title || product.name}</h4>
                    <div className="card-product-price text-center">
                        <PriceText value={product.price} />
                    </div>
                </div>
                <div className="action-buttons w-100">
                    <AppButton href={"/product/" + product.id} target="_blank" label="View product" className="w-100"/>
                    <WishListButton variant="white" className={"w-100 mt-2"} product={product} />
                </div>
            </div>
            <div className="card-desc-wrapper col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                {
                    (product.description || "")
                }
            </div>
        </div>
    );
}


export default ProductCard;