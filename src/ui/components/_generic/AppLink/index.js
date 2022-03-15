import React from 'react';
import PropTypes from 'prop-types';

export default function AppLink({href, target="_self", className="", clickEvents=[], children, ...rest}) {
    const click = (e) => {
        if(!clickEvents.length === 0){
            return true;
        }
        if(target !== "_blank"){
            e.preventDefault();
            clickEvents.forEach(fn => {
                fn.apply(this, arguments);
            })
            if(href && href.indexOf('#') !== 0){
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        }else {
            clickEvents.forEach(fn => {
                fn.apply(this, arguments);
            })
        }
    }
    return (
        <a {...rest} className={`app-link ${className}`} target={target} href={href} onClick={click} >
            {
                children
            }
        </a>
    )
}

AppLink.propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
    classNames: PropTypes.string,
    clickEvents: PropTypes.arrayOf(PropTypes.func),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string])
}