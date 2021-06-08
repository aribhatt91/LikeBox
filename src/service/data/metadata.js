import React from 'react';

export function addDefaultMetadata() {
    return (
        <React.Fragment>
            <meta property="description" content={""} />
            <meta property="og:description" content={""} />
            <meta property="og:image" content={""} />
        </React.Fragment>   
    )
}
export function addProductMetadata(product) {
    return (
        <React.Fragment>
            <meta property="description" content={product.description || ""} />
            <meta property="og:description" content={product.description || ""} />
            <meta property="og:url" content={product.link} />
            <meta property="og:type" content={product.category} />
            <meta property="og:image" content={product.thumbnail} />
        </React.Fragment>   
    )
}

export function addListingMetadata(category) {
    return (
        <React.Fragment>
            <meta property="og:description" content={ ""} />
        </React.Fragment>   
    )
}

