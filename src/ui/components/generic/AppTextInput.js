import React, {useState, useRef} from 'react';
import PageMessage from './PageMessage';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

/* AppTextInput.propTypes = {
    name: String
};
 */
const AppTextInput = ({name, label, disabled, defvalue, type='text', ...rest}) => {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext();
    const [dirty, setDirty] = useState(defvalue && defvalue.trim() !== "");
    //const [err, setErr] = useState(false);
    const tinput = useRef(null);
    const resetEditMode = (e) => {
        setDirty(((e.target.value || "").trim() !== ""));
        if(typeof setFieldTouched === 'function'){
            //console.log('blurrr');
            setFieldTouched(name);
        }
    }
    //console.log('Ref', tinput, {name, touched, errors});
    if(tinput && tinput.current && defvalue){
        //console.log(name, defvalue);
        tinput.current.value = defvalue || "";
    }
    return (
        <div className={"form-group animated-text-input d-inline-block" /*+ (errors[name] && touched ? " error" : "")*/ + (dirty ? " edit-mode" : "")+ (disabled ? " disabled" : "")}>
            <label className="d-flex position-relative" htmlFor={name}>
                {/* <span className={"text_input_label"}>{label}</span> */}
                {
                    (!type || type !== 'textarea') && <input
                        {...rest}
                        type={type}
                        name={name}
                        ref={tinput}
                        className="form-control"
                        onFocus={() => setDirty(true)}
                        onBlur={resetEditMode}
                        onChange={handleChange(name)}
                        defaultValue={defvalue}
                        placeholder={label}
                        disabled={disabled ? " disabled" : ""}
                    />
                }
                {
                    type && type === 'textarea' && <textarea
                    {...rest}
                        name={name}
                        ref={tinput}
                        type={type}
                        className="form-control"
                        onFocus={() => setDirty(true)}
                        onBlur={resetEditMode}
                        onChange={handleChange(name)}
                        defaultValue={defvalue}
                        disabled={disabled ? " disabled" : ""}
                    />
                }
            </label>
            {errors[name] && touched[name] && <PageMessage type="error" size="small" text={errors[name]}/>}
        </div>
    )
}

export default AppTextInput;