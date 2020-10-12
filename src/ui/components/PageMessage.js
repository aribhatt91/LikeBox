import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faWarning, faInfoCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

/* 
size: [small, [default]],
type: [error, success, info, alert],
text: String,
dismissable: Boolean
*/

const PageMessage = (props) => {
    const {showMsg, setShowMsg} = useState(true);
    return (
        <div className={"msg-container" + (props.size === "small" ? " msg-small" : "") + " " + (props.type || "") + (props.border === false ? "" : " no-border") + (!showMsg ? " d-none" : "")}>
            <span className="msg-icon">
                {(props.type === "error" || props.type === "alert") && <span>&#9432;</span> }
                {props.type === "info" && <span>&#9432;</span>}
                {props.type === "success" && <span>&#10003;</span>}
            </span>
            <span className="msg-text">{props.text}</span>
            {props.dismissable && <span className="msg-close" onClick={()=>setShowMsg(false)}>&times;</span>}
        </div>
    )
}

export default PageMessage;