import React, {useState, useEffect} from 'react';
import ChevronUp from '../svg-components/ChevronUp';
import ChevronDown from '../svg-components/ChevronDown';

function Accordion({
    label, 
    children, 
    disabled=false, 
    defOpen=false, 
    hideHeaderOnOpen=false
}){
    const [open, setOpen] = useState(defOpen);
    const [hideHeader, setHideHeader] = useState(typeof hideHeaderOnOpen !== "undefined" && (hideHeaderOnOpen === true || hideHeaderOnOpen === 'true') && open);
    const toggleAccordion = (e) => {
        if(!disabled){
            setOpen(!open);
            if(hideHeaderOnOpen && (hideHeaderOnOpen === true || hideHeaderOnOpen === 'true')){
                setHideHeader(!hideHeader);
            }
        }
    }
    useEffect(() => {
        if(defOpen && !open){
            toggleAccordion();
        }
    }, [defOpen])
    return (
        <div className={"accordion-container" + (open ? " open" : "")}>
            <div className={"accordion-header " + (hideHeader ? " d-none" : "") + (disabled ? " disabled" : "")} onClick={toggleAccordion}>
                <span className="accordion-header-label">{label}</span>
                {<span className={"accordion-btn"}>
                    {
                        open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>
                    }
                </span>}
            </div>
            <div className={"accordion-body " + (open ? "open" : "")} aria-hidden={!open} aria-expanded={open}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Accordion;