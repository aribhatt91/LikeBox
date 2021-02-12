import React from 'react'
import { Link } from 'react-router-dom'

export default function AppButton({label, href, onClick, className}) {
    return (
        <React.Fragment>
            {
                href && <Link className={"app-btn" + (className ? " " + className : "")} to={href}>
                    <span className="app-btn-text">{label}</span>
                </Link>
            }
            {
                onClick && <button className={"app-btn" + (className ? " " + className : "")} type="button" onClick={onClick}>
                    <span className="app-btn-text">{label}</span>
                </button>
            }
        </React.Fragment>
    )
}
