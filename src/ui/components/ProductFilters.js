import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import MultiSelectTag from './generic/MultiSelectTag';
import { debounce, throttle } from 'lodash';

//_handleBrandChange(e)
const ProductFilters = (props) => {
    const [collapseFilters, setCollapseFilters] = useState(true);
    const _logEvent = (e) => console.log('Dummy Filter event handler ->', e.target.value);
    let filtered = {};
    var brands = props.brands || ['Adidas', 'Puma', 'Nike', 'HRX', 'Reebok', 'Red Tape'], 
        priceRanges = props.priceRange || ['500 - 1500', '1500 - 2500', '2500 - 3500', '3500 - 5000', '5000 - 7500', '7500+'], 
        discounts = props.discounts || ['10%', '15%', '20%', '30%', '40%', '50%+'], 
        categories = ['Men', 'Women', 'Kids'];

    
    const filterHandler = (name, obj) => {
        let value = [];
        name = name ? name.trim().toLowerCase().replace(' ', "_") : "";
        
        (Object.keys(obj) || []).forEach(item => {
            if(obj[item]){
                value.push(item)
            }
        });
        if(value.length === 0){
            delete filtered[name];
        }else {
            filtered[name] = value.join(',');
        }
        console.log(filtered);
        if(typeof props.filterHandler === 'function'){
            props.filterHandler(filtered);
        }
    },
    optimisedFilter = debounce(filterHandler, 1000),
    sortHandler = (e) => {
    },
    optimisedSort = debounce(sortHandler, 500);
    
    return (
        <div className="product_filter_wrapper page-content-wrapper">
            {(brands.length > 0 || priceRanges.length > 0 || discounts.length > 0) &&
            <div className="section_heading">
                <div className="left_section">
                    <span className="collapsible_header" onClick={()=>setCollapseFilters(!collapseFilters)}>Filters</span>
                    <span className="sort_dropdown">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={sortHandler}>Price: Low to High</Dropdown.Item>
                                <Dropdown.Item onClick={sortHandler}>Price: High to Low</Dropdown.Item>
                                <Dropdown.Item onClick={sortHandler}>Popularity</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                </div>
                <div className="right_section">
                    {props.products + " products"}
                </div>
            </div>}
            <div className="collapsible_filter_container" hidden={collapseFilters}>
                {categories.length > 0 && 
                    <div className="filter_section">
                        <MultiSelectTag
                            label="Category"
                            items={categories}
                            handler={optimisedFilter}
                        />
                    </div>
                }
                {brands.length > 0 && 
                    <div className="filter_section">
                        <MultiSelectTag
                            label="Brands"
                            items={brands}
                            handler={optimisedFilter}
                        />
                    </div>
                }
                {priceRanges.length > 0 &&
                    <div className="filter_section">
                        <MultiSelectTag
                            label="Price range"
                            items={priceRanges}
                            handler={optimisedFilter}
                        />
                    </div>
                }
                {discounts.length > 0 &&
                    <div className="filter_section">
                        <MultiSelectTag
                            label="Discount"
                            items={discounts}
                            handler={optimisedFilter}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductFilters;