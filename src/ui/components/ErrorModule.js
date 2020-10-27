import React, {useState} from 'react';

export default function ErrorModule({error_image, error_text, error_subtext}) {
    return (
        <div className="error-module d-flex justify-content-center align-items-center flex-column">
            {error_image && <img className="error-image" src={error_image}/>}
            {error_text && <div className="d-inline-flex error-text text-center">{error_text}</div>}
            {error_subtext && <div className="d-inline-flex error-subtext text-center">{error_subtext}</div>}
        </div>
    )
}