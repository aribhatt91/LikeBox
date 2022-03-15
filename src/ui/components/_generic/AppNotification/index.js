import React, { useState, useEffect } from "react";
import CircledCheckIcon from '../../_svg-components/CircledCheckIcon';
import InfoIcon from "../../_svg-components/InfoIcon";
import PropTypes from 'prop-types';
import './style.component.css';

const AppNotification = ({id, type, dispatch, message, dark=true}) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
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
    //window.loginfo('Notification: handleCloseNotification called');
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
      className={`app-notification ${dark ? "app-notification--dark" : ""} ${
        type ? (`app-notification--${type}`).toLowerCase() : ""
      } ${exit ? "app-notification--exit" : ""}`}
        >
        <span className="app-notification__icon">
        {
        ( (type || "").toLowerCase() === 'success') ? <CircledCheckIcon /> : <InfoIcon />
        }
        </span>
      <div className="app-notification__text">{message}</div>
      <span className="app-notification__close" onClick={handleCloseNotification}>&times;</span>
      <div className={"app-notification__bar"}/>
    </div>
  );
};

AppNotification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  dispatch: PropTypes.func,
  message: PropTypes.string,
  dark: PropTypes.bool
}

export default AppNotification;