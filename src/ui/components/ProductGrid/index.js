import React from 'react';
import PropTypes from 'prop-types';

import ProductCardBase, { ProductCardBaseSkeleton } from '../ProductCardBase'

const CONFIG = {
    sm: 12,
    md: 4,
    lg: 4
}

export default function ProductGrid({products=[], config, loading=true, header=null, removeItem}) {
    const { sm, md, lg } = config;
    return (
        <div className="product-grid w-100">
            <div className="container">
                <div className="row ml-0 mr-0 pl-0 pr-0">
                    {
                        products.map((item, index) => 
                            <ProductCardBase 
                                title={item.title || item.name} 
                                subtext={item.brand} 
                                thumbnail={item.thumbnail} 
                                price={item.price} 
                                currency={item.currency} 
                                link={item.url || item.link} 
                                key={index} />
                        )
                    }
                    {loading && <React.Fragment>
                        <ProductCardBaseSkeleton />
                        <ProductCardBaseSkeleton />
                        <ProductCardBaseSkeleton />
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
    loading: PropTypes.bool
}