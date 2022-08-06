import React from "react";
import ReactDOM from "react-dom";
import classes from "./Alert.module.css";

const Alert = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className={`${classes.alert} ${
            props.status === 1 ? classes.invalid : ""
          } ${props.isAlertOn ? classes.display : ""}`}
        >
          {props.message}
        </div>,
        document.getElementById("alert")
      )}
    </React.Fragment>
  );
};

export default Alert;
