import React, { useState, useEffect } from "react";
import CircledCheckIcon from './../svg-components/CircledCheckIcon';
import InfoIcon from "../svg-components/InfoIcon";

const Notification = ({id, type, dispatch, message, dark=true}) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const handleStartTimer = () => {
    //window.mlog('Notification: handleStartTimer called');
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
      if(intervalID){
        clearInterval(intervalID);
      }
    
  };

  const handleCloseNotification = () => {
    //window.mlog('Notification: handleCloseNotification called');
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        id: id
      })
    }, 400)
  };

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification()
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${dark ? "dark" : ""} ${
        type ? (type || "").toLowerCase() : ""
      } ${exit ? "exit" : ""}`}
        >
        <span className="notification-icon">
        {
        ( (type || "").toLowerCase() === 'success') ? <CircledCheckIcon /> : <InfoIcon />
        }
        </span>
      <div className="notification-text">{message}</div>
      <span className="notification-close" onClick={handleCloseNotification}>&times;</span>
      <div className={"bar"}/>
    </div>
  );
};

export default Notification;