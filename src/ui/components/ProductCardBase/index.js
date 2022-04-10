import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AppLink from '../_generic/AppLink';
import PriceText from '../_generic/PriceText';
import './style.component.css';

export function ProductCardBaseSkeleton({className}) {
    return (
        <div className={"product-card-base product-card-base--skeleton placeholder d-flex justify-content-center mb-4" + (className ? ` ${className}` : '')}>
            <div className="position-relative d-flex flex-column w-100">
                <div className="product-card-base__thumb d-flex justify-content-center">
                </div>
                <div className="product-card-base__details pt-2 pb-2">
                    <div className="product-card-base__brand placeholder__element mb-2 col-12"></div>
                    <div className="product-card-base__title placeholder__element col-6"></div>
                </div>
            </div>
        </div>
    )
}

export function ProductCardTooltip({className, icon, children}) {
    const [show, setShow] = useState(false);

    const toggleTooltip = (e) => {
        e.stopPropagation();
        const target = e.target;
        const isCta = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a'),
        isIcon = target.classList.contains('product-card-base__tooltip-icon') || target.closest('.product-card-base__tooltip-icon');

        if(target.classList.contains('product-card-base__tooltip') || isCta) {
            setShow(false);
        }else if(isIcon){
            setShow(true);
        }
    }
    /* Hide tooltip on clicking outside */
    useEffect(()=>{
        window.addEventListener('click', ()=>{
            setShow(false);
        });
    }, [])

    return (
        <div className={"product-card-base__tooltip" + (className ? ` ${className}` : '') + (show ? ' product-card-base__tooltip--show' : '')} onClick={toggleTooltip}>
            <span className="product-card-base__tooltip-icon">
                {icon}
            </span>
            <div className={"product-card-base__tooltip-content p-3"}>
                {
                    children
                }
            </div>
        </div>
    )
}

export function ProductCardWithTooltip({children}) {

}

export default function ProductCardBase({name, brand, price, img, url, className, children}) {
    return (
        <div className={"product-card-base d-flex mb-4 justify-content-center" + (className ? ` ${className}` : '')}>
            <div className="position-relative d-flex flex-column w-100">
                <AppLink href={url} ext="true"  className="product-card-base__thumb d-flex justify-content-center">
                    <LazyLoadImage effect="opacity" src={img + (img.indexOf('?') > -1 ? '&' : '?')  + 'w=800&h=800'}/>
                </AppLink>
                <div className="product-card-base__details pt-2">
                    {brand && <div className="product-card-base__brand pb-1">
                        {brand}
                    </div>}
                    {name && <div className="product-card-base__title pb-1">
                        {name}
                    </div>}
                    {price && <div className="product-card-base__price pb-1">
                        <PriceText value={price} />
                    </div>}
                </div>
                {children && <React.Fragment>
                    {children}
                </React.Fragment>}
            </div>
        </div>
    )
}
