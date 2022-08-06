import React, { useEffect, useReducer, useState } from "react";
import classes from "./Content.module.css";

const linkReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid:
        (action.val.includes("https://") || action.val.includes("http://")) &&
        !action.val.includes(" "),
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid:
        (state.value.includes("https://") || state.value.includes("http://")) &&
        !state.value.includes(" "),
    };
  } else if (action.type === "RESET") {
    return { value: "", isValid: null };
  }
};

const customLinkReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: !action.val.includes(" ") && action.val.trim().length > 0,
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: !state.value.includes(" ") && state.value.trim().length > 0,
    };
  } else if (action.type === "RESET") {
    return { value: "", isValid: null };
  }
};

const Content = (props) => {
  const [linkState, dispatchLink] = useReducer(linkReducer, {
    value: "",
    isValid: null,
  });
  const [customLinkState, dispatchCustomLink] = useReducer(customLinkReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isCopyOn, setIsCoppyOn] = useState(false);
  const { isValid: isValidLink, value: linkValue } = linkState;
  const { isValid: isValidCustomLink, value: customLinkValue } =
    customLinkState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(isValidCustomLink && isValidLink);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isValidLink, isValidCustomLink]);

  function linkChangeHandler(event) {
    dispatchLink({ type: "USER_INPUT", val: event.target.value });
  }

  function customLinkChangeHandler(event) {
    dispatchCustomLink({ type: "USER_INPUT", val: event.target.value });
  }

  async function submitFormHandler(event) {
    event.preventDefault();
    if (props.isAlertOn) {
      props.offAlert();

      setTimeout(() => {}, 200);
    }

    if (isCopyOn) {
      setIsCoppyOn(false);
      props.onSubmitForm({
        status: 0,
        message: "Link coppied to your clipboard",
      });
      navigator.clipboard.writeText("https://kmhdui.link/" + customLinkValue);
      dispatchLink({ type: "RESET" });
      dispatchCustomLink({ type: "RESET" });
    } else {
      setIsLoading(true);
      const data = {
        link: linkValue,
        customLink: customLinkValue,
      };

      await fetch("https://kmhdui-link-api.herokuapp.com/api/addCustomLink", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          props.onSubmitForm(data);
          if (data.status === 0) {
            setIsCoppyOn(true);
          }
        })
        .catch((err) => {
          props.onSubmitForm({ status: 1, message: "Server Error" });
        });

      setIsLoading(false);
    }
  }

  let btnContent = isLoading ? "Loading..." : "Generate Link";
  if (isCopyOn) {
    btnContent = "Copy your custom url";
  }

  return (
    <div className={classes.home}>
      <div className={classes.title}>
        <div>
          <span className={classes.link}>Customizable</span> link shortener app
        </div>
        <div>
          for <span className={classes.kmhdui}>KMHDUI.</span>
        </div>
      </div>
      <form onSubmit={submitFormHandler} className={classes.form}>
        <div className={classes["form-input"]}>
          <input
            id="long-link"
            value={linkValue}
            className={`${classes.input} ${
              isValidLink === false ? classes["input-invalid"] : ""
            }`}
            onChange={linkChangeHandler}
            placeholder="Enter your link here"
          ></input>
        </div>
        <div className={classes["form-input"]}>
          <div
            className={`${classes.wrapper} ${classes.input} ${
              isValidCustomLink === false ? classes["input-invalid"] : ""
            }`}
          >
            <span>kmhdui.link/</span>
            <input
              value={customLinkValue}
              className={`${classes.input} ${classes.custom}`}
              id="custom-link"
              onChange={customLinkChangeHandler}
              placeholder="Enter your custom link"
            ></input>
          </div>
        </div>
        <div className={classes["form-input"]}>
          <button
            className={`${classes.btn} ${isCopyOn ? classes.copy : ""}`}
            disabled={!formIsValid}
          >
            {btnContent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Content;
