import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import HOME_ICON from '../../assets/img/logo.png'; 
function LoadingModule({text, type='loading', fullscreen=true, opaque=true}){
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
export default LoadingModule;