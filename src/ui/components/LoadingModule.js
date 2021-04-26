import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import HOME_ICON from '../../assets/img/logo.png'; 
export default function LoadingModule({text, type='loading', fullscreen=true, opaque=true}){
    return (
    <div className={'loading_module ' + (fullscreen ? 'fullscreen' : 'block')}>
        <div className='loading_module_wrapper'>
            <span className='loading_icon'>
                {/* {type === 'loading' && <Spinner animation="border" variant="info"/>}
                {type === 'success' && <span className="tick-wrapper">
                    <span className="tick">L</span>
                </span>} */}
                <img className="home_icon" src={HOME_ICON} />
            </span>
{/*             <span className={'loading_text' + (type === 'success' ? ' success' : '')}>{text}</span>
 */}        </div>
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