import React, {useState} from 'react';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* 
props.text, 
props.iconBefore, 
props.iconAfter, 
props.iconLoading, 
props.loadingText, 
props.successText, 
props.successIcon, 
props.url, 
props._click, 
props.btnState,
props.rounded
*/
function ThemedButton(props){
    return (
        <div className='themed_btn_container'>
            {props.url && <Link className={'themed_btn' + (props.theme ? (' theme_' + props.theme) : "")  + (props.border === 'false' ? ' no-border' : "") + (props.size ? " btn-" + props.size : "")} to={props.url}>
                <span className="themed_btn_content">
                    {props.iconBefore && <span className='themed_btn_icon'><FontAwesomeIcon icon={props.iconBefore}></FontAwesomeIcon></span>}
                    <span className="themed_btn_text">{props.text}</span>
                    {props.iconAfter && <span className='themed_btn_icon'><FontAwesomeIcon icon={props.iconAfter}></FontAwesomeIcon></span>}
                </span>
            </Link>}
            {!props.url && <button type={props.type ? props.type : "button"} className={'themed_btn' + (props.theme ? (' theme_' + props.theme) : "")  + (props.border === 'false' ? ' no-border' : "") + (props.size ? " btn-" + props.size : "")} disabled={props.btnState === 'disabled'} onClick={props._click ? props._click : () => {console.log('themed_btn clicked')}}>
                {(props.btnState === 'disabled' || props.btnState === 'active' || !props.btnState) && <span className="themed_btn_content">
                    {props.iconBefore && <span className='themed_btn_icon'><FontAwesomeIcon icon={props.loadingIcon || props.iconBefore}></FontAwesomeIcon></span>}
                    <span className="themed_btn_text">{props.text}</span>
                    {props.iconAfter && <span className='themed_btn_icon'><FontAwesomeIcon icon={props.iconAfter}></FontAwesomeIcon></span>}
                </span>}
                {(props.btnState === 'success') && <span className="themed_btn_content">
                    {(props.iconBefore || props.successIcon) && <span className='themed_btn_icon'>
                        <FontAwesomeIcon icon={props.successIcon || props.iconBefore}></FontAwesomeIcon>
                    </span>}
                    <span className="themed_btn_text">{props.successText || props.text}</span>{(!props.successIcon && props.iconAfter) && <span className='themed_btn_icon'><FontAwesomeIcon icon={props.iconAfter}></FontAwesomeIcon></span>}
                </span>}
                {(props.btnState === 'loading') && <span className="themed_btn_content">
                    {(props.iconBefore || props.loadingIcon) && <span className='themed_btn_icon'>
                        <FontAwesomeIcon icon={props.loadingIcon || props.iconBefore}></FontAwesomeIcon>
                        </span>}
                        <span className="themed_btn_text">{props.loadingText || props.text}</span>
                    {(!props.loadingIcon && props.iconAfter) && <span className='themed_btn_icon'
                    ><FontAwesomeIcon icon={props.iconAfter}></FontAwesomeIcon></span>}
                </span>}
            </button>}
        </div>
    )
}

export default ThemedButton;