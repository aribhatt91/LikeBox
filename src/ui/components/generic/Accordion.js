import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Accordion({
    label, 
    children, 
    defDisabled=false, 
    defOpen=false, 
    hideHeaderOnOpen=false
}){
    const [open, setOpen] = useState((typeof defOpen !== "undefined" && (defOpen === true || defOpen === "true") ? true : false));
    const [disabled, setDisabled] = useState((typeof defDisabled !== "undefined" && (defDisabled === true || defDisabled === "true") ? true : false));
    const [hideHeader, setHideHeader] = useState(typeof hideHeaderOnOpen !== "undefined" && (hideHeaderOnOpen === true || hideHeaderOnOpen === 'true') && open);
    const toggleAccordion = (e) => {
        if(!disabled){
            setOpen(!open);
            if(hideHeaderOnOpen && (hideHeaderOnOpen === true || hideHeaderOnOpen === 'true')){
                setHideHeader(!hideHeader);
            }
        }
    }
    return (
        <div className={"accordion-container" + (open ? " open" : "")}>
            <div className={"accordion-header " + (hideHeader ? " d-none" : "") + (disabled ? " disabled" : "")} onClick={toggleAccordion}>
                <span className="accordion-header-label">{label}</span>
                {<span className={"accordion-btn"}>
                    <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown }/>
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