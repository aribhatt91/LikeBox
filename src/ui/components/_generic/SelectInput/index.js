import React, {useState} from 'react';
import AppMessage from '../AppMessage';
import './style.component.css';

function SelectInput({name, options, handler, error, defvalue, disabled}) {
    let optionsArray = [];
    (options || []).forEach((item, index) => {
        optionsArray.push(
            <option key={index} value={item}>{item}</option>
        );
    });
    optionsArray.unshift(
        <option key={-1} value="">Select {name || ""}</option>
    );
    let selectHandler = (e) => {
        if(handler && typeof handler === 'function'){
            handler(e.target.name, e.target.value);
        }else {
            window.loginfo('No handler attached -> ', e.target.name, " - ", e.target.value);
        }
    }
    return (
        <div className={"form-group app-select" + (error ? " app-select--error": "")}>
            <select name={name} className="form-control" required="true" onChange={selectHandler}  disabled={disabled && (disabled === true || disabled === "true")}>
                {
                    optionsArray
                }
            </select>
            {error && <AppMessage type="error" text={error}/>}
        </div>
    )
}

export default SelectInput;
