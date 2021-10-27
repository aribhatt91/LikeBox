import React from 'react'

export default function AppLink({href, target="_self", clickEvents=[], children, ...rest}) {
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
        <a {...rest} target={target} href={href} onClick={click} >
            {
                children
            }
        </a>
    )
}
