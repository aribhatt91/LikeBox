import React, { useState, useEffect, useRef } from 'react'
import './style.component.css';

export default function AppDropdown({label, children, className}) {
    const [open, setOpen] = useState(false);
    const selectLabel = useRef(null); 
    useEffect(()=>{
        window.addEventListener('click', e => {
            //window.loginfo(e.target, selectLabel);
            if(selectLabel && e.target !== selectLabel.current){
                setOpen(false);
            }
        })
    }, [])
     const toggle = () => {
         if(open){
             setOpen(false);
         }else {
             setOpen(true);
         }
     }
    return (
        <div className={"d-inline-block app-dropdown" + (className ? " " + className : "") + (open ? " app-dropdown--open" : "")} aria-label={label}>
            <div className="d-flex d-md-inline-flex app-dropdown__label" onClick={toggle} ref={selectLabel}>
                {label}            
            </div>
            <div className="app-dropdown__items thin-scroll-bar" onClick={(e)=>{e.stopPropagation()}} aria-hidden={!open} aria-expanded={open}>
                {
                    children
                }
            </div>
        </div>
    )
}
