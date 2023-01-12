import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./pages/short/index.js";
import NotFound from "./pages/notFound/index.js";
import RedirectedPage from "./pages/redirectPage";
import Footer from "./components/footer/index.js";
import Navbar from "./components/navbar";
import Alert from "./components/alert";
import 'tailwindcss/tailwind.css';

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
    }, 2500);

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
          <Navbar/>
          <Content
            onSubmitForm={submitFormHandler}
            isAlertOn={isAlertOn}
            offAlert={offAlertHandler}
          />
          <Footer />
        </Route>
        <Route path="/notfound" exact>
        <Alert message={message} status={status} isAlertOn={isAlertOn} />
          <Navbar />
          <NotFound />
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
