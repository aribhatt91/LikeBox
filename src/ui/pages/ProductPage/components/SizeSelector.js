import React from 'react';
import RadioButtonGroup from '../../../components/generic/RadioButtonGroup';
//import SizeGuide from './SizeGuide';

const SizeSelector = ({className, variants, onSelect, disabled}) => {
    const sizes = (variants || []).map(v => v.size).filter(size => typeof size !== 'undefined' && size !== null);
    return (
        <React.Fragment>
        {
            sizes.length > 0 && <div className={`product-size-options ${className}`}>
                <h6 className="text-uppercase">Available sizes</h6>
                <RadioButtonGroup 
                    name="size"
                    label="Select size"
                    options={sizes}
                    disabled={disabled}
                    onChange={onSelect}
                    defaultChecked={sizes[0]}
                />
            </div>
        }
        {
            /* product.merchant_name && <div>
              <SizeGuide 
                affiliate={(product.merchant_name || "").toLowerCase()} 
                className="text-uppercase size-guide-link mt-2 mb-2 mt-lg-5 mb-lg-5" />
            </div> */
          }
        </React.Fragment>
    );
}

export default SizeSelector;
