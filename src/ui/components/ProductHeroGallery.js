import React, { useState } from 'react';

function ProductHeroGallery({images, product_name}) {
    return (
        <div className="product-thumb-gallery col-lg-7 d-md-flex flex-md-nowrap">
            <div className="product-zoomed-image col-md-8 p-2 float-left">
                <img src={images[0]} alt={product_name} title={product_name}/>
            </div>
            <div className="product-image-thumbnails clearfix col-md-4 d-flex flex-column float-left justify-content-between p-2">
                <div className="thumb-image pb-md-2">
                    <img src={images[1]} alt={product_name} title={product_name}/>
                </div>
                <div className="thumb-image pt-md-2">
                    <img src={images[2]} alt={product_name} title={product_name}/>
                </div>
            </div>
        </div>
    )
}

export default ProductHeroGallery;