import React, { useEffect, useReducer, useState } from "react";
import "./index.css";

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
    setIsLoading(true);

    if (isCopyOn) {
      setIsCoppyOn(false);
      props.onSubmitForm({
        status: 0,
        message: "Link coppied to your clipboard",
      });

      navigator.clipboard.writeText("kmhdui.link/" + customLinkValue);
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
      }
    }
    setIsLoading(false);
  }

  let btnContent = isLoading ? "Loading..." : "Generate!";
  if (isCopyOn) {
    btnContent = "Copy your custom url";
  }

  console.log(isValidCustomLink);
  return (
    <div className="home-content m-auto">
      <div className="sub-content">
        <p className="sy-tag">Hello Again!👋 </p>
        <div className="sy-tag-line">
          <span>Keep it </span>
          <span className="font-medium">simple</span>
          <span> with customizable link</span>
          <p>for KMHD UI</p>
        </div>

        <div></div>
        <form className="form-content" onSubmit={submitFormHandler}>
          <div>
            <input
              className={`input-round ${
                linkState.value.length === 0 || linkState.isValid
                  ? "input-url-fcs"
                  : "input-invalid"
              }`}
              id="long-link"
              value={linkValue}
              onChange={linkChangeHandler}
              placeholder="Enter your long URL"
            ></input>
          </div>
          <div className="flex short-input">
            <p className="mr-0.5 m-auto">kmhdui.link/</p>
            <input
              className={`input-short ${
                customLinkState.value.length === 0 || isValidCustomLink
                  ? "input-url-fcs"
                  : "input-invalid"
              }`}
              value={customLinkValue}
              id="custom-link"
              onChange={customLinkChangeHandler}
              placeholder="Enter your short URL"
            ></input>
          </div>
          <button
            className={`btn-gen font-Poppins ${isCopyOn ? "copy" : ""}`}
            disabled={isLoading}
          >
            {btnContent}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
