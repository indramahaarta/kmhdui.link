import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./component/content/Content";
import RedirectedPage from "./component/content/RedirectedPage";
import Footer from "./component/footer/Footer";
import Navbar from "./component/navbar/Navbar";
import Alert from "./component/ui/Alert";

function App() {
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const [isAlertOn, setIsAlertOn] = useState(false);

  const submitFormHandler = (data) => {
    setStatus(data.status);
    setMessage(data.message);
    setIsAlertOn(true);

    const timer = setTimeout(() => {
      setStatus(null);
      setMessage(null);
      setIsAlertOn(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  };

  const offAlertHandler = () => {
    setIsAlertOn(false);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Alert message={message} status={status} isAlertOn={isAlertOn} />
          <Navbar />
          <Content
            onSubmitForm={submitFormHandler}
            isAlertOn={isAlertOn}
            offAlert={offAlertHandler}
          />
          <Footer />
        </Route>
        <Route path="/:customUrl/">
          <RedirectedPage />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
