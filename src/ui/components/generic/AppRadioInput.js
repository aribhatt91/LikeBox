import React from 'react'
import { useFormikContext } from 'formik';
import PageMessage from './PageMessage';

export default function AppRadioInput({name, options, onChange, ...rest}) {
    const {setFieldTouched, handleChange, errors, touched, initialValues, values} = useFormikContext();
    const postChange = (e) => {
        window.mlog(name, e.target.value);
    }
    return (
        <div className="app-radio-input-options d-flex flex-wrap">
            {
                (options || []).map((item, index) => (
                        <div className="app-radio-input-wrapper mr-2" key={index}>
                            <input {...rest} 
                                className="app-radio-input" 
                                type="radio" 
                                onFocus={() => {setFieldTouched(true)}} 
                                onChange={handleChange} 
                                defaultChecked={initialValues[name] === item}
                                aria-label={item}
                                aria-checked={values[name] === item}
                                name={name} 
                                value={item} />
                            <span className="text-capitalize">{item}</span>
                        </div>
                    )
                )
            }
            {
                errors[name] && 
                <div className="d-flex w-100 mt-2">
                    <PageMessage type="error" text={errors[name]} />
                </div>
            }
            
            
        </div>
    )
}
