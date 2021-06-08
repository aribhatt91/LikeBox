import React, {useState} from 'react';
/* 
option -> {
    label: '',
    value: ''
}
*/
export default function RadioButtonGroup({name, options, onChange, defaultChecked, ...rest}) {

    return (
        <div className="app-radio-input-options d-flex flex-wrap">
            {
                (options || []).map((item, index) => (
                        <div className="app-radio-input-wrapper mr-2 mb-2" key={index}>
                            <input {...rest} 
                                className="app-radio-input" 
                                type="radio"
                                onChange={onChange} 
                                defaultChecked={defaultChecked === item}
                                aria-label={item}
                                //aria-checked={checked === item}
                                name={name} 
                                value={item} />
                            <span className="text-capitalize">{item}</span>
                        </div>
                    )
                )
            }
            
            
        </div>
    )
}
