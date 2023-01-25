import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import failedImg from "../../assets/failed.svg";
import successImg from "../../assets/success.svg";

export const FailedAlert = (props) => {
  return (
    <div className="flex failed-alert">
      <div className="img-alert flex-none">
        <img src={failedImg} alt="failed-img"></img>
      </div>
      <div className="txt-alert flex-grow">
        <p className="head-alert">Failed!</p>
        <p className="sub-alert">{props.message}</p>
      </div>
    </div>
  );
}

export const SuccesAlert = (props) => {
  return (
    <div className="flex content-start success-alert ">
      <div className="img-alert flex-none">
        <img src={successImg} alt="succes-img"></img>
      </div>
      <div className="txt-alert flex-grow">
        <p className="head-alert">Success!</p>
        <p className="sub-alert">{props.message}</p>
      </div>
    </div>
  );
}