import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import HOME_ICON from '../../assets/img/logo.png'; 
export default function LoadingModule({fullscreen=true}){
    return (
    <div className={'loading-module d-flex w-100 h-100'}>
        <div className='container d-flex h-100 position-relative'>
            <LoadingPendulum />
        </div>
    </div>
    );
}
export function LoadingSpinner({text}){
    return (
    <div className={'loading-spinner position-absolute w-100 h-100 top-0 left-0'}>
        <div className='d-flex flex-column justify-content-center align-center w-100 h-100'>
            <span className='loading-spinner-icon'>
                <Spinner animation="border"/>
            </span>
            <div className='loading-spinner-text d-flex text-center justify-content-center'>
                {text}
            </div>
      </div>
    </div>
    );
}

export function LoadingPendulum(){
    return (
    <div className={'loading-pendulum d-flex justify-content-center align-items-center'}>
        <div className='pendulum'>
            <span className='ball'>
            </span>
            <span className='ball'>
            </span>
            <span className='ball'>
            </span>
            <span className='ball'>
            </span>
      </div>
    </div>
    );
}