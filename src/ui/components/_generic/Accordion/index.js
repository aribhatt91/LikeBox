import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ChevronUp from '../../_svg-components/ChevronUp';
import ChevronDown from '../../_svg-components/ChevronDown';
import './style.component.css';

function Accordion({
    label, 
    children, 
    disabled=false, 
    /* Expanded by default */
    defOpen=false
}){
    const [open, setOpen] = useState(defOpen);

    const toggleAccordion = (e) => {
        if(!disabled){
            setOpen(!open);
        }
    }
    useEffect(() => {
        if(defOpen && !open){
            toggleAccordion();
        }
    }, [defOpen])
    return (
        <div className={"accordion" + (open ? " accordion--open" : "")}>
            <div className={"accordion__header " + (disabled ? " accordion__header--disabled" : "")} onClick={toggleAccordion}>
                <span className="accordion__header-label">{label}</span>
                {<span className={"accordion__btn"}>
                    {
                        open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>
                    }
                </span>}
            </div>
            <div className={"accordion__body"} aria-hidden={!open} aria-expanded={open}>
                {
                    children
                }
            </div>
        </div>
    )
}

Accordion.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string]),
    disabled: PropTypes.bool,
    defOpen: PropTypes.bool
}

export default Accordion;