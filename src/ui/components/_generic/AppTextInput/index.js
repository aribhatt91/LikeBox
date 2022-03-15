import React, {useState, useRef} from 'react';
import AppMessage from '../AppMessage';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

/* AppTextInput.propTypes = {
    name: String
};
 */
const AppTextInput = ({name, label, disabled=false, type='text', ...rest}) => {
    const {setFieldTouched, handleChange, errors, touched, values, initialValues } = useFormikContext();
    //const [dirty, setDirty] = useState(defvalue && defvalue.trim() !== "");
    //const [err, setErr] = useState(false);
    //const tinput = useRef(null);
    const resetEditMode = (e) => {
        //setDirty(((e.target.value || "").trim() !== ""));
        if(typeof setFieldTouched === 'function'){
            //window.loginfo('blurrr');
            setFieldTouched(name);
        }
    }
    //window.loginfo('Ref', tinput, {name, touched, errors});
    /* if(tinput && tinput.current && defvalue){
        //window.loginfo(name, defvalue);
        tinput.current.value = defvalue || "";
    } */
    return (
        <div className={"form-group app-text-input d-inline-block" + (disabled ? " app-text-input--disabled" : "")}>
            <label className="d-flex position-relative" htmlFor={name}>
                {/* <span className={"text_input_label"}>{label}</span> */}
                {
                    (!type || type !== 'textarea') && <input
                        {...rest}
                        id={name}
                        type={type}
                        name={name}
                        aria-label={label}
                        /*ref={tinput}*/
                        className="form-control"
                        /*onFocus={() => setDirty(true)}*/
                        onBlur={resetEditMode}
                        onChange={handleChange(name)}
                        defaultValue={initialValues[name] || ""}
                        placeholder={label}
                        disabled={disabled ? " disabled" : ""}
                    />
                }
                {
                    type && type === 'textarea' && <textarea
                    {...rest}
                        id={name}
                        name={name}
                        /*ref={tinput}*/
                        type={type}
                        aria-label={label}
                        className="form-control"
                        /*onFocus={() => setDirty(true)}*/
                        onBlur={resetEditMode}
                        onChange={handleChange(name)}
                        defaultValue={initialValues[name]}
                        disabled={disabled ? " disabled" : ""}
                    />
                }
            </label>
            {errors[name] && touched[name] && <AppMessage type="error" size="sm" text={errors[name]}/>}
        </div>
    )
}

export default AppTextInput;