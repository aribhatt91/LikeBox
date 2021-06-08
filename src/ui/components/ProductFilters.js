import React, { useState, useEffect, useReducer } from 'react';
import MultiSelectDropdown from './generic/MultiSelectDropdown';
import AppDropdown from './generic/AppDropdown';
import AppDualRangeSlider from './generic/AppDualRangeSlider';
import SingleSelectDropdown from './generic/SingleSelectDropdown';
import { BRANDS, CATEGORIES, SORT_ORDER } from '../../service/constants/product-listing';
import AppButton from './generic/AppButton';
import { debounce } from 'lodash';
import { getBrands } from './../../service/productMethods';

//_handleBrandChange(e)
const PriceRangeFilter = ({min=0, max=100, onSelect}) => {
    const [range, setRange] = useState([min, max]);

    const handleChange = (input) => {
        setRange(input);
    },
    search = debounce(() => {
        window.mlog('price filter ->', range);
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
const DEFAULT_FILTER_OPTIONS = {
    brands: {
        state: 'pending',
        count: 0,
        items: [],
        selected: []
    },
    pricerange: {
        state: 'pending',
        max: 100,
        min: 0,
        selected: []
    },
    gender: {
        options: [
            {
                label: 'Male',
                val: 'm'
            },
            {
                label: 'Female',
                val: 'f'
            }
        ],
        selected: []
    },
    sortby: {
        options: [
            {
                label: 'Price: High to Low',
                val: 'value:desc'
            },
            {
                label: 'Price: Low to High',
                val: 'value:asc'
            },
            {
                label: 'Popularity',
                val: 'popular'
            }
        ],
        selected: ""
    }
}
const ProductFilters = ({
        category, 
        sort_by, 
        gender,
        onFilterChange, 
        defaultFilterOptions=DEFAULT_FILTER_OPTIONS
    }) => {
    const [filterObject, setFilterObject] = useState(defaultFilterOptions);
    const [state, dispatch] = useReducer();
    useEffect(() => {
        (async () => {
            try{
                let res = await getBrands(category);
                //window.mlog('getBrands:', res);

                if(Array.isArray(res)){
                    let brands = {
                        ...filterObject.brands,
                        state: 'done',
                        count: res.count,
                        items: res
                    }
                    setFilterObject({
                        ...filterObject,
                        brands
                    })
                }
            }catch(err){

            }
        })()
        
    }, [category])
    
    const filterHandler = (name, obj) => {
        window.mlog('filterHandler', name, obj);
        let f = null;
        if(name === 'brands'){
            let brands = {
                ...filterObject.brands,
                state: 'done',
                selected: obj
            };
            f = {
                ...filterObject,
                brands
            };
            setFilterObject(f)
        }else if(name === 'gender'){
            let gender = {
                ...filterObject.gender,
                state: 'done',
                selected: obj
            };
            f = {
                ...filterObject,
                gender
            };
            setFilterObject(f);
        }else if(name === 'sortby'){
            let sortby = {
                ...filterObject.sortby,
                selected: obj
            };
            f = {
                ...filterObject,
                sortby
            };
            setFilterObject(f);
        }
        if(typeof onFilterChange === 'function' && f){
            onFilterChange(f);
        }
    }
    
    return (
        <div className="product_filter_wrapper page-content-wrapper">
            
            <div className="d-flex justify-content-between flex-wrap">
                {CATEGORIES.length > 0 && 
                    <div className="filter_section">
                        <MultiSelectDropdown
                            label="Category"
                            name="category"
                            items={CATEGORIES}
                            onSelect={filterHandler}
                        />
                    </div>
                }
                {filterObject.brands && 
                    <div className="filter_section">
                        <MultiSelectDropdown
                            label="Brands"
                            name="brands"
                            items={filterObject.brands.items}
                            onSelect={filterHandler}
                        />
                    </div>
                }

                <div className="filter_section">
                    <MultiSelectDropdown
                        label="Gender"
                        name="gender"
                        items={filterObject.gender.options}
                        onSelect={filterHandler}
                    />
                </div>
                
                <div className="filter_section">
                    <AppDropdown label="Price range" name="pricerange">
                        <PriceRangeFilter/>
                    </AppDropdown>
                </div>
                
                
                <div className="filter_section">
                    <SingleSelectDropdown 
                        label="Sort by"
                        name="sortby"
                        items={filterObject.sortby.options}
                        onSelect={filterHandler}
                    />
                </div>
            </div>
            <div className="container">

            </div>
        </div>
    )
}

export default ProductFilters;