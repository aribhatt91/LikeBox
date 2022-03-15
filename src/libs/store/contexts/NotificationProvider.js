import React, {createContext, useContext, useReducer, useState} from "react";
import {v4} from "uuid";
import EventTracker from "../../api/EventTracker";
import AppNotification from "../../../ui/components/_generic/AppNotification";

const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, {...action.payload}];
      case "REMOVE_NOTIFICATION":
        return state.filter(el => el.id !== action.id);
      default:
        return state
    }
  }, []);

  return(
    <NotificationContext.Provider value={dispatch}>
      <div className={"app-notification-wrapper below--nav"}>
        {state.map((note) => {
          return <AppNotification dispatch={dispatch} key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props) => {
    window.loginfo('useNotification called');
    EventTracker.trackEvent(EventTracker.events.ui.NOTIFICATION_DISPLAYED);
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props
      }
    })
  }
};

export default NotificationProvider;