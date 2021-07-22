import React from 'react'
import AppImage from './generic/AppImage';
import { formatPrice } from '../../service/helper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export function ProductCardMinimalSkeleton() {
    return (
        <div className="d-flex col-12 col-md-4 justify-content-center p-0">
            <div className="product-card-min-container product-card-min-placeholder mb-3 position-relative">
                <div className="product-card-min-thumb product-card-min-thumb-placeholder">
                </div>
                <div className="product-card-min-text pt-2 pb-2">
                    <div className="product-card-min-price-placeholder w-100"></div>
                    <div className="product-card-min-name-placeholder w-100"></div>
                </div>
            </div>
        </div>
    )
}
export default function ProductCardMinimal({title, subtext, price, currency="GBP", thumbnail, link}) {
    return (
        <div className="d-flex col-12 col-md-4 justify-content-center p-0">
            <div className="product-card-min-container position-relative">
                <a href={link} className="product-card-min-thumb d-flex justify-content-center">
                    <LazyLoadImage effect="opacity" src={thumbnail}/>
                </a>
                <div className="product-card-min-text pt-2 pb-2">
                    {price && <div className="product-card-min-price">
                        <span className="price">
                            {formatPrice(price)}
                        </span>
                        <span className="ml-1 currency">{currency}</span>
                    </div>}
                    {
                        !price && subtext && <div className="product-card-min-price">
                            {subtext}
                        </div>
                    }
                    <div className="product-card-min-name">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    )
}
