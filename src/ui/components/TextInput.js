import React from 'react';
import PageMessage from './PageMessage';

//{type='text', name, error, value, label, onChange, onBlur}
const TextInput = ({name, error, label, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                {...rest}
                className="form-control"
            />
            {error && <PageMessage type="error" size="small" text={error}></PageMessage>}
        </div>
    )
}

export default TextInput; 