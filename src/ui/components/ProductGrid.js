import React from 'react'
import ProductCardMinimal, { ProductCardMinimalSkeleton } from './ProductCardMinimal'

export default function ProductGrid({products=[], loading=true, header=null, removeItem}) {
    return (
        <div className="product-grid w-100">
            <div className="container">
                {header && (loading || products.length > 0) && <h2 className="text-center mt-5 mb-5">{header}</h2>}
                <div className="row ml-0 mr-0 pl-0 pr-0">
                    {
                        products.map((item, index) => 
                            <ProductCardMinimal 
                                title={item.name} 
                                subtext={item.brand} 
                                thumbnail={item.thumbnail} 
                                price={item.price} 
                                currency={item.currency} 
                                link={item.url || item.link} 
                                key={index} />
                        )
                    }
                    {loading && <React.Fragment>
                        <ProductCardMinimalSkeleton />
                        <ProductCardMinimalSkeleton />
                        <ProductCardMinimalSkeleton />
                    </React.Fragment>}

                </div>
                
            </div>
        </div>
    )
}
