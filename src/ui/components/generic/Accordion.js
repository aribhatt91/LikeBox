import React, {useState} from 'react';

function Accordion({
    label, 
    openBtn, 
    openBtnAlign, 
    openBtnStyle, 
    children, 
    defDisabled, 
    defOpen, 
    hideHeaderOnOpen
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
        <div className="accordion-container">
            <div className={"accordion-header " + (open ? "open" : "")  + (hideHeader ? " d-none" : "") + (openBtnStyle ? " " + openBtnStyle : " plus") + (disabled ? " disabled" : "")} onClick={toggleAccordion}>
                <span className="accordion-header-label">{label}</span>
                {openBtn && <span className={"accordion-btn" + ((!openBtnAlign || openBtnAlign == "right") ? " right" : " left")}>{}</span>}
            </div>
            <div className={"accordion-body " + (open ? "d-inline-block" : "d-none")}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Accordion;