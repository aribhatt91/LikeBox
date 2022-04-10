import React from 'react'
import { Link } from 'react-router-dom'
import AppLink from '../AppLink'
import PropTypes from 'prop-types';
import './style.component.css';

export default function AppButton({
    label, 
    href, 
    onClick, 
    className, 
    size="md", 
    type="button", 
    variant="primary", 
    rounded=true, 
    loading=false, 
    ext=false,
    ...rest}) {

    const customClass = "app-btn" + (className ? " " + className : "") + (loading ? " app-btn--loading" : "") + ` app-btn--${size} app-btn--${variant}` + (!rounded ? ' border-radius-0' : '');

    return (
        <React.Fragment>
            {
                href && ext && <AppLink {...rest} className={customClass} href={href} aria-label={label}>
                    <span className="app-btn__text">{label}</span>
                </AppLink>
            }
            {
                href && !ext && <Link {...rest} className={customClass} to={href} aria-label={label}>
                    <span className="app-btn__text">{label}</span>
                </Link>
            }
            {
                !href && <button {...rest} className={customClass} type={type} onClick={onClick ? onClick : ()=>{}} aria-label={label}>
                    <span className="app-btn__text">{label}</span>
                </button>
            }
        </React.Fragment>
    )
}

AppButton.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'transparent']),
    rounded: PropTypes.bool,
    loading: PropTypes.bool,
    ext: PropTypes.bool
}