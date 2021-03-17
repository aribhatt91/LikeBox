import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AppImage from './generic/AppImage';

function ProductHeroGallery({images, product_name, product_id, addWishList, inWishList}) {
    const [wished, setWished] = useState(inWishList ? inWishList : false);
    const [selected, setSelected] = useState(0);
    const toggleWished = () => {
        let res = !wished;
        setWished(res);
        if(typeof addWishList === 'function'){
            addWishList(product_id, res);
        }
    }
    return (
        <div className="product-thumb-gallery col-lg-6 d-md-flex flex-md-nowrap float-left position-relative">
            
            <div className="product-image-thumbnails clearfix col-md-2 d-flex flex-column justify-content-start float-left p-2">
                {
                    (images || []).map((item, index) => (
                        <div key={index} className={"thumb-image mb-md-2" + (selected === index ? " selected" : "")} onClick={() => {setSelected(index)}}>
                            <AppImage src={item} alt={product_name} title={product_name}/>
                        </div>
                    ))
                }
                {/* <div className="thumb-image pb-md-2">
                    <img src={images[1]} alt={product_name} title={product_name}/>
                </div>
                <div className="thumb-image pt-md-2">
                    <img src={images[2]} alt={product_name} title={product_name}/>
                </div> */}
            </div>
            <div className="product-zoomed-image col-md-10 float-left p-0">
                {
                    (images || []).map((item, index) => (
                        <AppImage key={index} className={"m-2" + (selected === index ? " selected" : "")} src={item} alt={product_name} title={product_name}/>
                    ))
                }
                <img src={images[0]} alt={product_name} title={product_name}/>
                <div className={"product-add-wishlist-icon" + (wished ? " wished" : "")} onClick={toggleWished}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
            
        </div>
    )
}

export default ProductHeroGallery;