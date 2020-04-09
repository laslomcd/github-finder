import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types.js";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // SET ALERT
  const setAlertType = (message, type) => {
    //this.setState({ alert: { message: message, type: type } });
    // setAlertType({ message, type });
    dispatch({
      type: SET_ALERT,
      payload: { message, type },
    });
    //setTimeout(() => this.setState({ alert: null }), 3000);
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlertType,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
