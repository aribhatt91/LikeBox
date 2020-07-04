import React, { Component, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

//_handleBrandChange(e)
function ProductFilters(props){
    const [collapseFilters, setCollapseFilters] = useState(true);
    const _logEvent = (e) => console.log('Dummy Filter event handler ->', e.target.value);
    var brands = props.brands || ['Adidas', 'Puma', 'Nike', 'HRX', 'Reebok', 'Red Tape'], 
        brandsList = [],
        priceRange = props.priceRange || ['500 - 1500', '1500 - 2500', '2500 - 3500', '3500 - 5000', '5000 - 7500', '7500+'], 
        priceRangeList = [],
        discounts = props.discounts || ['10%', '15%', '20%', '30%', '40%', '50%+'], 
        discountsList = [],
        categories = props.categories,
        categoryList = [];

    for (let index = 0; categories && index < categories.length; index++) {
        categoryList.push(<li key={index}><label><input type='checkbox' value={categories[index]} onChange={props._handleCategorySelect ? props._handleCategorySelect : _logEvent}/><span>{categories[index]}</span></label></li>);
    }
    for (let index = 0; brands && index < brands.length; index++) {
        brandsList.push(<li key={index}><label><input type='checkbox' value={brands[index]} onChange={props._handleBrandSelect ? props._handleBrandSelect : _logEvent}/><span>{brands[index]}</span></label></li>);
    }
    for (let index = 0; priceRange && index < priceRange.length; index++) {
        priceRangeList.push(<li key={index}><label><input type='checkbox' value={priceRange[index]} onChange={props._handlePriceRangeSelect ? props._handlePriceRangeSelect : _logEvent}/><span>Rs. {priceRange[index]}</span></label></li>);
    }
    for (let index = 0; discounts && index < discounts.length; index++) {
        discountsList.push(<li key={index}><label><input type='checkbox' value={discounts[index]} onChange={props._handleDiscountSelect ? props._handleDiscountSelect : _logEvent}/><span>{discounts[index]}</span></label></li>);
    }
    return (
        <div className="product_filter_wrapper page-content-wrapper">
            {(brandsList.length > 0 || priceRangeList.length > 0 || discountsList.length > 0) &&
            <div className="section_heading">
                <div className="left_section">
                    <span className="collapsible_header" onClick={()=>setCollapseFilters(!collapseFilters)}>Filters</span>
                    <span className="sort_dropdown">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={props._handleSortBy ? props._handleSortBy : _logEvent}>Price: Low to High</Dropdown.Item>
                                <Dropdown.Item onClick={props._handleSortBy ? props._handleSortBy : _logEvent}>Price: High to Low</Dropdown.Item>
                                <Dropdown.Item onClick={props._handleSortBy ? props._handleSortBy : _logEvent}>Popularity</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                </div>
                <div className="right_section">
                    {props.products + " products"}
                </div>
            </div>}
            <div className="collapsible_filter_container" hidden={collapseFilters}>
                {categoryList.length > 0 && 
                    <div className="filter_section">
                        <p className="filter_section_heading">Category</p>
                        <ul className="filter_list brands">
                            {
                                categoryList
                            }
                        </ul>
                    </div>
                }
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
        </div>
    )
}

export default ProductFilters;