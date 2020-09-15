import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWarning, faInfoCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
/* 
size: [small, [default]],
type: [error, success, info, alert],
message: String,
dismissable: Boolean
*/
//https://www.facebook.com/images/comet/empty_states_icons/general/general_gray_wash.svg
//https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png
const NotFoundModule = (props) => {
    const {showMsg, setShowMsg} = useState(true);
    return (
        <div className={"empty-error-container" + (props.size === "small" ? " msg-small" : "") + " " + (props.type || "") + (props.border === false ? "" : " no-border")} hidden={!showMsg}>
            <span className="empty-error-icon">
                {(props.type === "error" || props.type === "alert") && <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>}
                {props.type === "info" && <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>}
                {props.type === "success" && <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>}
            </span>
            <span className="empty-error-text">{props.text}</span>
        </div>
    )
}

export default NotFoundModule;