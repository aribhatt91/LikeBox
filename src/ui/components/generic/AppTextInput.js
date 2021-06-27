import React, {useState, useRef} from 'react';
import PageMessage from './PageMessage';
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
            //window.mlog('blurrr');
            setFieldTouched(name);
        }
    }
    //window.mlog('Ref', tinput, {name, touched, errors});
    /* if(tinput && tinput.current && defvalue){
        //window.mlog(name, defvalue);
        tinput.current.value = defvalue || "";
    } */
    return (
        <div className={"form-group animated-text-input d-inline-block" /*+ (errors[name] && touched ? " error" : "")*/ + /*(dirty ? " edit-mode" : "")*/+ (disabled ? " disabled" : "")}>
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
            {errors[name] && touched[name] && <PageMessage type="error" size="small" text={errors[name]}/>}
        </div>
    )
}

export default AppTextInput;