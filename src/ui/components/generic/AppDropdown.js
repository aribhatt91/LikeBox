import React, { useState, useEffect, useRef } from 'react'

export default function AppDropdown({label, children, className}) {
    const [open, setOpen] = useState(false);
    const selectLabel = useRef(null); 
    useEffect(()=>{
        window.addEventListener('click', e => {
            //console.log(e.target, selectLabel);
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
        <div className={"d-inline-block app-dropdown" + (className ? " " + className : "") + (open ? " open" : "")}>
            <div className="d-flex d-md-inline-flex app-dropdown-label" onClick={toggle} ref={selectLabel}>
                {label}            
            </div>
            <div className="app-dropdown-items" onClick={(e)=>{e.stopPropagation()}}>
                {
                    children
                }
            </div>
        </div>
    )
}
