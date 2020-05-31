import React, {Component, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingModule(props){
    return (
    <div className='loading_module'>
        <div className='loading_module_wrapper'>
            <span className='loading_icon'>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
            </span>
            <span className='loading_text'>{props.text}</span>
        </div>
    </div>
    );
}
export default LoadingModule;