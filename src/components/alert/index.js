import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import failedImg from "../../assets/failed.svg"
import successImg from "../../assets/success.svg";

const Alert = (props) => {

  const success= () => {
    return (<div className="flex content-start success-alert ">
      <div className="img-alert flex-none">
          <img src={successImg}></img>
        </div>
        <div className="txt-alert flex-grow">
          <p className="head-alert">Success!</p>
          <p className="sub-alert">Your shorten link success for generate</p>
        </div>
    </div>
    )
  }

  const failed= () => {
    return (<div className="flex failed-alert">
      <div className="img-alert flex-none">
          <img src={failedImg}></img>
        </div>
        <div className="txt-alert flex-grow">
          <p className="head-alert">Failed!</p>
          <p className="sub-alert">Your shorten link failed...</p>
        </div>
    </div>
    )
  }
  return (
    <React.Fragment>
    {ReactDOM.createPortal(
      <div className={`alert ${props.isAlertOn ? "display" : ""}`}>
      {props.status == 1 ? failed() : success()}
      </div>,
      document.getElementById("alert")
    )}
  </React.Fragment>
  );
};

export default Alert;
