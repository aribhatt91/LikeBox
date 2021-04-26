import React, { useState } from 'react';
import MultiSelectDropdown from './generic/MultiSelectDropdown';
import AppDropdown from './generic/AppDropdown';
import AppDualRangeSlider from './generic/AppDualRangeSlider';
import SingleSelectDropdown from './generic/SingleSelectDropdown';
import { BRANDS, CATEGORIES, SORT_ORDER } from '../../service/constants/product-listing';
import AppButton from './generic/AppButton';
import { debounce } from 'lodash';

//_handleBrandChange(e)
const PriceRangeFilter = ({min=0, max=100, onSelect}) => {
    const [range, setRange] = useState([min, max]);

    const handleChange = (input) => {
        setRange(input);
    },
    search = debounce(() => {
        console.log('price filter ->', range);
        if(typeof onSelect === 'function'){
            onSelect(range);
        }
        document.body.click();
    }, 500)

    return (
        <div className="price-range-filter d-flex flex-column w-100 p-2">
            <h6 className="mt-2 text-center font-weight-bold col-12">Select price range</h6>
            <div className="price-range-values w-100 mt-3 d-flex justify-content-between">
                <div className="price-range-min d-inline-flex">
                    {range[0]}
                </div>
                <div className="price-range-max d-inline-flex">
                    {range[1]}
                </div>
            </div>
            <div className="price-range-slider w-100 d-flex mt-0 mb-4">
                <AppDualRangeSlider min={min} max={max} onChange={handleChange} />
            </div>
            <div className="price-range-btn-wrapper w-100 mb-2">
                <AppButton className="w-100 border-0 border-radius-0 sm" label="Search" onClick={search}/>
            </div>
        </div>
    )
}
const ProductFilters = (props) => {
    const [collapseFilters, setCollapseFilters] = useState(true);
    
    const filterHandler = (name, obj) => {
        console.log('filterHandler', name, obj);
    }
    
    return (
        <div className="product_filter_wrapper page-content-wrapper">
            
            <div className="d-flex justify-content-between flex-wrap">
                {CATEGORIES.length > 0 && 
                    <div className="filter_section">
                        <MultiSelectDropdown
                            label="Category"
                            items={CATEGORIES}
                            onSelect={filterHandler}
                        />
                    </div>
                }
                {BRANDS.length > 0 && 
                    <div className="filter_section">
                        <MultiSelectDropdown
                            label="Brands"
                            items={BRANDS}
                            onSelect={filterHandler}
                        />
                    </div>
                }
                
                <div className="filter_section">
                    <AppDropdown label="Price range">
                        <PriceRangeFilter/>
                    </AppDropdown>
                </div>
                
                <div className="filter_section">
                    <SingleSelectDropdown 
                        label="Sort by"
                        items={SORT_ORDER}
                        onSelect={props.sortBy ? props.sortBy : (item) => {console.log('Sort Order:', item)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductFilters;