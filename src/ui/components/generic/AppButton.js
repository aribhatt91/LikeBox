import React from 'react'
import { Link } from 'react-router-dom'

export default function AppButton({label, href, onClick, className, type="button", ...rest}) {
    return (
        <React.Fragment>
            {
                href && <Link {...rest} className={"app-btn" + (className ? " " + className : "")} to={href}>
                    <span className="app-btn-text">{label}</span>
                </Link>
            }
            {
                !href && <button {...rest} className={"app-btn" + (className ? " " + className : "")} type={type} onClick={onClick ? onClick : ()=>{}}>
                    <span className="app-btn-text">{label}</span>
                </button>
            }
        </React.Fragment>
    )
}
