import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingModule({text, type='fullscreen', opaque=true}){
    return (
    <div className={'loading_module ' + type}>
        <div className='loading_module_wrapper'>
            <span className='loading_icon'>
                <Spinner animation="border" variant="info"/>
            </span>
            <span className='loading_text'>{text}</span>
        </div>
    </div>
    );
}
export default LoadingModule;