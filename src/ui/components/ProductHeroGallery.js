import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ProductHeroGallery({images, product_name, product_id, addWishList, inWishList}) {
    const [wished, setWished] = useState(inWishList ? inWishList : false);
    const toggleWished = () => {
        let res = !wished;
        setWished(res);
        if(typeof addWishList === 'function'){
            addWishList(product_id, res);
        }
    }
    return (
        <div className="product-thumb-gallery col-lg-7 d-md-flex flex-md-nowrap float-left position-relative">
            <div className="product-zoomed-image col-md-8 p-2 float-left">
                <img src={images[0]} alt={product_name} title={product_name}/>
                <div className={"product-add-wishlist-icon" + (wished ? " wished" : "")} onClick={toggleWished}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
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