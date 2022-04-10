import React from 'react';
import PropTypes from 'prop-types';

import ProductCardBase, { ProductCardBaseSkeleton } from '../ProductCardBase'

const CONFIG = {
    sm: 12,
    md: 4,
    lg: 4
}

export default function ProductGrid({products=[], config=CONFIG, loading=true, header=null, removeItem}) {
    const { sm, md, lg } = config;
    return (
        <div className="product-grid w-100 mb-5">
            <div className="container">
                {header && <h2 className='mt-5 mb-5 text-center text-bold'>{header}</h2>}
                <div className="row ml-0 mr-0 pl-0 pr-0">
                    {
                        products.map((item, index) => 
                            <ProductCardBase 
                                className={`col-12 col-md-${md} col-lg-${lg}`}
                                name={item.title || item.name} 
                                brand={item.brand} 
                                img={item.thumbnail} 
                                price={item.price} 
                                currency={item.currency} 
                                url={item.url || item.link} 
                                key={item.id} />
                        )
                    }
                    {loading && <React.Fragment>
                        <ProductCardBaseSkeleton className={`col-12 col-md-${md} col-lg-${lg}`} />
                        <ProductCardBaseSkeleton className={`col-12 col-md-${md} col-lg-${lg}`} />
                        <ProductCardBaseSkeleton className={`col-12 col-md-${md} col-lg-${lg}`} />
                    </React.Fragment>}

                </div>
            </div>
        </div>
    )
}

ProductGrid.propTypes = {
    products: PropTypes.array.isRequired,
    config: PropTypes.shape({
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number
    }),
    loading: PropTypes.bool,
    header: PropTypes.string
}