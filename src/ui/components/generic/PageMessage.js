import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <span className="msg-text">{text}</span>
            {dismissable && <span className="msg-close" onClick={()=>setShowMsg(false)}>&times;</span>}
        </div>
    )
}

export default PageMessage;