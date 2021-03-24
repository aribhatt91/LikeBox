import React, { useState, useEffect } from 'react'

export default function AppDropdown({children}) {
    const [open, setOpen] = useState(false);
    useEffect(()=>{

    }, [])
    return (
        <div className={"d-inline-block select-dropdown multiselect_tags_container" + (open ? " open" : "")} onClick={(e)=>{e.stopPropagation()}}>
            <div className="d-flex d-md-inline-flex dropdown-label-container" onClick={toggle}>
                {label}            
            </div>
            <div className="select-dropdown-items">
                {
                    children
                }
            </div>
        </div>
    )
}
