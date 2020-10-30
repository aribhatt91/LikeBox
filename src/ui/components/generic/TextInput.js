import React, {useState, useRef} from 'react';
import PageMessage from './PageMessage';

//{type='text', name, error, value, label, _onChange, _onBlur, disabled}
//TODO - Create actionable text input 
//TODO - Create inbuilt validation
const TextInput = ({name, error, label, disabled, defvalue, handler, type, validate, ...rest}) => {
    const [dirty, setDirty] = useState(defvalue && defvalue.trim() !== "");
    const [err, setErr] = useState(false);
    const tinput = useRef(null);
    const resetEditMode = (e) => {
        setDirty(((e.target.value || "").trim() !== ""));
        if(typeof handler === 'function'){
            handler(e.target.name, (e.target.value || "").trim());
        }else {
            console.log("TextInput: onBlur: ", e.target.name, (e.target.value || "").trim());
        }
        if(typeof validate === 'function'){
            setErr(!validate(e.target.value));
        }
    }
    console.log('Ref', tinput);
    if(tinput && tinput.current && defvalue){
        console.log(name, defvalue);
        tinput.current.value = defvalue || "";
    }
    return (
        <div className={"form-group animated-text-input d-inline-block" + (err ? " error" : "") + (dirty ? " edit-mode" : "")+ (disabled ? " disabled" : "")}>
            <label className="d-flex position-relative" htmlFor={name}>
                <span className={"text_input_label"}>{label}</span>
                {
                    (!type || type !== 'textarea') && <input
                    {...rest}
                        name={name}
                        ref={tinput}
                        type={type || 'text'}
                        className="form-control"
                        onFocus={() => setDirty(true)}
                        onBlur={resetEditMode}
                        defaultValue={defvalue}
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
                        defaultValue={defvalue}
                        disabled={disabled ? " disabled" : ""}
                    />
                }
            </label>
            
            {err && <PageMessage type="error" size="small" text={error}/>}
        </div>
    )
}

export default TextInput; 