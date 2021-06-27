import React from 'react'
import AppImage from './generic/AppImage';
import { formatPrice } from '../../service/helper';
export function ProductCardMinimalPlaceholder() {
    return (
        <div className="product-card-min-container product-card-min-placeholder mb-3 position-relative">
            <div className="product-card-min-thumb">
            </div>
            <div className="product-card-min-text pt-2 pb-2">
                <div className="product-card-min-price-placeholder w-100"></div>
                <div className="product-card-min-name-placeholder w-100"></div>
            </div>
        </div>
    )
}
export default function ProductCardMinimal({product}) {
    return (
        <div className="product-card-min-container mb-3 position-relative">
            <a href={product.url} className="product-card-min-thumb">
                <AppImage src={product.thumbnail}/>
            </a>
            <div className="product-card-min-text pt-2 pb-2">
                <div className="product-card-min-price">
                    <span className="price">
                        {formatPrice(product.price)}
                    </span>
                    <span className="ml-1 currency">{product.currency}</span>
                </div>
                <div className="product-card-min-name">
                    {product.name}
                </div>
            </div>
        </div>
    )
}
