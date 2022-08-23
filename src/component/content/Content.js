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
      if (!isValidLink) {
        props.onSubmitForm({ status: 1, message: "Enter a valid link!" });
      } else if (!isValidCustomLink) {
        props.onSubmitForm({
          status: 1,
          message: "Enter a valid custom link!",
        });
      } else if (formIsValid) {
        setIsLoading(true);
        const data = {
          link: linkValue,
          customLink: customLinkValue,
        };
        let thereIsSameCustomLink = false;

        await fetch("https://kmdui-link-default-rtdb.firebaseio.com/links.json")
          .then((res) => res.json())
          .then((data) => {
            for (const i in data) {
              const key = data[i];
              if (key["customLink"] === customLinkValue) {
                thereIsSameCustomLink = true;
                break;
              }
            }
          });

        if (thereIsSameCustomLink) {
          props.onSubmitForm({
            status: 1,
            message: "Custom Link has been taken",
          });
        } else {
          await fetch(
            "https://kmdui-link-default-rtdb.firebaseio.com/links.json",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then(() => {
              props.onSubmitForm({
                status: 0,
                message: "Custom Link has been saved",
              });
              setIsCoppyOn(true);
            })
            .catch(() => {
              props.onSubmitForm({ status: 1, message: "Server Error" });
            });
        }
        setIsLoading(false);
      }
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
          <button className={`${classes.btn} ${isCopyOn ? classes.copy : ""}`}>
            {btnContent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Content;
