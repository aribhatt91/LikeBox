import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AppImage from './generic/AppImage';
import { debounce } from 'lodash';

function ProductHeroGallery({images, product_name, inWishList, toggleInWishList}) {
    const [selected, setSelected] = useState(0);
    const toggleWished = debounce (() => {
        if(typeof toggleInWishList === 'function'){
            toggleInWishList();
        }
    }, 1000);
    return (
        <div className="product-thumb-gallery col-lg-6 d-md-flex flex-md-nowrap float-left position-relative">
            
            <div className="product-image-thumbnails clearfix col-md-2 d-flex flex-column justify-content-start float-left p-2">
                {
                    (images || []).map((item, index) => (
                        <div key={index} className={"thumb-image square mb-md-2" + (selected === index ? " selected" : "")} onClick={() => {setSelected(index)}}>
                            <AppImage src={(decodeURI(item) || "").trim()} alt={product_name} title={product_name}/>
                        </div>
                    ))
                }
            </div>
            <div className="product-zoomed-image col-md-10 float-left p-0">
                    {
                        (images || []).map((item, index) => (
                            <AppImage key={index} className={"m-2 w-100 h-100" + (selected === index ? " selected" : " position-absolute")} src={(decodeURI(item) || "").trim()} alt={product_name} title={product_name}/>
                        ))
                    }
                    <AppImage className="w-100 h-100" src={(decodeURI(images[0]) || "").trim()} alt={product_name} aria-label={product_name}/>
                    <div className={"product-add-wishlist-icon" + (inWishList ? " wished" : "")} onClick={toggleWished}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
            </div>
            
        </div>
    )
}

export default ProductHeroGallery;