import React, { Component } from 'react';

//_handleBrandChange(e)
function ProductFilters(props){
    const _logEvent = (e) => console.log('Dummy Filter event handler ->', e.target.value);
    var brands = props.brands || ['Adidas', 'Puma', 'Nike', 'HRX', 'Reebok', 'Red Tape'], 
        brandsList = [],
        priceRange = props.priceRange || ['500 - 1500', '1500 - 2500', '2500 - 3500', '3500 - 5000', '5000 - 7500', '7500+'], 
        priceRangeList = [],
        discounts = props.discounts || ['10%', '15%', '20%', '30%', '40%', '50%'], 
        discountsList = [];
    for (let index = 0; brands && index < brands.length; index++) {
    brandsList.push(<li key={index}><label><input type='checkbox' value={brands[index]} onChange={props._handleBrandSelect ? props._handleBrandSelect : _logEvent}/>{brands[index]}</label></li>);
    }
    for (let index = 0; priceRange && index < priceRange.length; index++) {
        priceRangeList.push(<li key={index}><label><input type='checkbox' value={priceRange[index]} onChange={props._handlePriceRangeSelect ? props._handlePriceRangeSelect : _logEvent}/>Rs. {priceRange[index]}</label></li>);
    }
    for (let index = 0; discounts && index < discounts.length; index++) {
        discountsList.push(<li key={index}><label><input type='checkbox' value={discounts[index]} onChange={props._handleDiscountSelect ? props._handleDiscountSelect : _logEvent}/>{discounts[index]}</label></li>);
    }
    return (
        <div className="product_filter_wrapper">
            {(brandsList.length > 0 || priceRangeList.length > 0 || discountsList.length > 0) &&
            <div className="section_heading">Filters</div>}
            {brandsList.length > 0 && 
                <div className="filter_section">
                    <p className="filter_section_heading">Brands</p>
                    <ul className="filter_list brands">
                        {
                            brandsList
                        }
                    </ul>
                </div>
            }
            {priceRangeList.length > 0 &&
                <div className="filter_section">
                    <p className="filter_section_heading">Price</p>
                    <ul className="filter_list price_range">
                        {
                            priceRangeList
                        }
                    </ul>
                </div>
            }
            {discountsList.length > 0 &&
                <div className="filter_section">
                    <p className="filter_section_heading">Discounts</p>
                    <ul className="filter_list price_range">
                        {
                            discountsList
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default ProductFilters;