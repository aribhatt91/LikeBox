import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TestIcons from '../svg-components/TestIcons';

//import {faWarning, faInfoCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

/* 
size: [small, [default]],
type: [error, success, info, alert],
text: String,
dismissable: Boolean
*/

const PageMessage = ({text, type, size, inline=true, icon=false, dismissable=false}) => {
    const [showMsg, setShowMsg] = useState(true);
    const box = !(inline === true || inline === 'true');
    return (
        <div className={"msg-container" + (size === "small" ? " msg-small" : "") + " " + (type || "") + (!box ? " no-border" : " box") + (!showMsg ? " d-none" : "")}>
            {icon && <span className="msg-icon">
                {(type === "error" || type === "alert") && <span>&#9432;</span> }
                {type === "info" && <span>&#9432;</span>}
                {type === "success" && <span>&#10003;</span>}
            </span>}
            <span className="msg-text" aria-label={text}>{text}</span>
            {dismissable && <span className="msg-close" onClick={()=>setShowMsg(false)}>&times;</span>}
        </div>
    )
}

export const SuccessMessage = ({message}) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="green-tick mb-3">
            <FontAwesomeIcon icon={faCheck} size="2x"></FontAwesomeIcon>
            
          </div>
          <h2 className="font-weight-light" aria-label={message}>{message}</h2>
          <TestIcons />
        </div>
    )
}

export default PageMessage;