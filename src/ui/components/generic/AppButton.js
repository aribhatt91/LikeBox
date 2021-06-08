import React from 'react'
import { Link } from 'react-router-dom'

export default function AppButton({label, href, onClick, className, type="button", loading=false, ext=false,...rest}) {
    return (
        <React.Fragment>
            {
                href && ext && <a {...rest} className={"app-btn" + (className ? " " + className : "") + (loading ? " loading" : "")} href={href} aria-label={label}>
                    <span className="app-btn-text">{label}</span>
                </a>
            }
            {
                href && !ext && <Link {...rest} className={"app-btn" + (className ? " " + className : "") + (loading ? " loading" : "")} to={href} aria-label={label}>
                    <span className="app-btn-text">{label}</span>
                </Link>
            }
            {
                !href && <button {...rest} className={"app-btn" + (className ? " " + className : "") + (loading ? " loading" : "")} type={type} onClick={onClick ? onClick : ()=>{}} aria-label={label}>
                    <span className="app-btn-text">{label}</span>
                </button>
            }
        </React.Fragment>
    )
}
