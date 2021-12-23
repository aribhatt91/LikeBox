import React, { useState } from 'react';
import AppImage from '../../../components/generic/AppImage';

function ProductImageGrid({images, productName }) {
    const [selected, setSelected] = useState(0);
    return (
        <div className="product-thumb-gallery col-lg-6 d-md-flex flex-md-nowrap float-left position-relative">
            
            <div className="product-image-thumbnails no-scroll-bar overflow-auto clearfix col-12 col-md-2 d-flex flex-md-column justify-content-start float-left p-2 pt-md-0 pb-md-0">
                {
                    (images || []).map((item, index) => (
                        <div key={index} className={"thumb-image square mb-md-2" + (selected === index ? " selected" : "")} onClick={() => {setSelected(index)}}>
                            <AppImage src={(decodeURI(item) || "").trim() + '&w=80&h=80'} alt={productName} title={productName}/>
                        </div>
                    ))
                }
            </div>
            <div className="product-zoomed-image col-md-10 float-left p-0">
                    {
                        (images || []).map((item, index) => (
                            <AppImage key={index} className={"mb-2 w-100" + (selected === index ? " selected" : " position-absolute")} src={(decodeURI(item) || "").trim() + '&w=800&h=800'} alt={productName} title={productName}/>
                        ))
                    }
                    <AppImage className="mb-2 w-100" src={(decodeURI(images[0]) || "").trim() + '&w=800&h=800'} alt={productName} aria-label={productName}/>
            </div>
            
        </div>
    )
}

export default ProductImageGrid;