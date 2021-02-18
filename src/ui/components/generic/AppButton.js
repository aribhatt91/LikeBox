import React from 'react'
import { Link } from 'react-router-dom'

export default function AppButton({label, href, onClick, className, ...rest}) {
    return (
        <React.Fragment>
            {
                href && <Link {...rest} className={"app-btn" + (className ? " " + className : "")} to={href}>
                    <span className="app-btn-text">{label}</span>
                </Link>
            }
            {
                !href && <button {...rest} className={"app-btn" + (className ? " " + className : "")} type="button" onClick={onClick ? onClick : ()=>{}}>
                    <span className="app-btn-text">{label}</span>
                </button>
            }
        </React.Fragment>
    )
}
