import React, {useState} from 'react';

/* 
option -> {
    label: '',
    value: ''
}
*/
export default function RadioButtonGroup({title, name, options, handler, disabled, defvalue}){
    let radios = [], d = defvalue;
    console.log('Radio -> ', defvalue);
    (options || []).forEach((item, index) => {
        radios.push(
            <div className="d-inline-flex radio-button mr-3">
                <label key={index} for={name}>
                    <input key={index} type="radio" name={name} value={item.value} onChange={handler} checked={defvalue ? defvalue === item.value : false}  disabled={disabled ? " disabled" : ""}/>
                    <span className="ml-1">{item.label}</span>
                </label>
            </div>
        );
    })
    console.log(options, radios);
    return (
        <div className="d-flex flex-column">
            {options && options.length > 1 && <div className="mb-3">{title}</div>}
            {options && options.length > 1 && <div className="field-group radio-button-group d-flex flex-column flex-md-row flex-wrap"> 
                {
                    radios
                }
            </div>
            }
        </div>
    )
}