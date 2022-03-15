import React, {useState} from 'react';
import CircledCheckIcon from '../../_svg-components/CircledCheckIcon';
import PropTypes from 'prop-types';
import './style.component.css';

const AppMessage = ({text, type="info", size="sm", icon=false, dismissable=false}) => {
    const [showMsg, setShowMsg] = useState(true);
    const className = 'app-message' + ` app-message--${size}` + ` app-message--${type}`;

    return (
        <div className={className + (!showMsg ? " d-none" : "")}>
            {icon && <span className="app-message__icon">
                {(type === "error" || type === "alert") && <span>&#9432;</span> }
                {type === "info" && <span>&#9432;</span>}
                {type === "success" && <span>&#10003;</span>}
            </span>}
            <span className="app-message__text" aria-label={text}>{text}</span>
            {dismissable && <span className="app-message__close" onClick={()=>setShowMsg(false)}>&times;</span>}
        </div>
    )
}

AppMessage.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'error', 'success', 'alert']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    icon: PropTypes.bool,
    dismissable: PropTypes.bool
}

export const SuccessMessage = ({message, subtext}) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="green-tick mb-3">
            <CircledCheckIcon size="64" />
          </div>
          <h2 className="font-weight-light" aria-label={message}>{message}</h2>
          {subtext && <h3 className="font-weight-light mt-3">{subtext}</h3>}

        </div>
    )
}

export default AppMessage;