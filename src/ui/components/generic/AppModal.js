import React, {useEffect, useState, useRef} from 'react';
import CloseIcon from '../svg-components/CloseIcon';

let scrolled = 0;
export default function AppModal({id, removeOnClose, onClose, className, children}) {
    const [show, setShow] = useState(true);
    let ref = useRef(null);
    

    useEffect(() => {
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
        <div ref={ref} className={"app-modal" + (show ? ' show' : "")} aria-hidden={!show} id={id}>
            <div className={"app-modal-container" + (className? ' ' + className : "")}>
                {children}
                <span className="app-modal-close">
                    <a href="#" aria-label="Close" onClick={() => setShow(false)}>
                        <CloseIcon size={24} />
                    </a>
                </span>
            </div>
        </div>
    )
}
