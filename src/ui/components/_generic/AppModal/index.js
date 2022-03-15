import React, {useEffect, useState, useRef} from 'react';
import CloseIcon from '../../_svg-components/CloseIcon';
import PropTypes from 'prop-types';
import './style.component.css';

let scrolled = 0;
export default function AppModal({id, removeOnClose, onClose, className, children}) {
    const [show, setShow] = useState(true);
    let ref = useRef(null);
    

    useEffect(() => {
        /* Restore HTML scrolled to the length as before opening the modal */
        if(show) {
            document.body.setAttribute('open-popup', true); 
            scrolled = window.scrollY;
        }else {
            document.body.removeAttribute('open-popup');
            setTimeout(() => {
                window.scrollTo({top: scrolled});
            }, 10);
            
            if(typeof onClose === 'function'){
                onClose();
            }
            if(removeOnClose){
                if(ref && ref.current){
                    //remove the element from the DOM tree
                }
            }
        }
    }, [show]);

    return (
        <div ref={ref} className={"app-modal" + (show ? ' app-modal--show' : "")} aria-hidden={!show} id={id}>
            <div className={"app-modal__container" + (className? ' ' + className : "")}>
                {children}
                <span className="app-modal__close">
                    <a href="#" aria-label="Close" onClick={() => setShow(false)}>
                        <CloseIcon size={24} />
                    </a>
                </span>
            </div>
        </div>
    )
}


AppModal.propTypes = {
    id: PropTypes.string,
    removeOnClose: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string])
}