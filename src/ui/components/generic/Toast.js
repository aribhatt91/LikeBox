import React from 'react';
/* 
type: message, error, success
*/
export default function Toast({text, duration=2000, className}) {
    return <div className={"snackbar" + (className ? " " + className : "")}>
        <div className="snackbar-text">{text}</div>
    </div>;
}