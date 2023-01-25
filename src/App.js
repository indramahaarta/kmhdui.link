import React from "react";
import { Route, Switch } from "react-router-dom";
import Content from "./pages/short/index.js";
import NotFound from "./pages/notFound/index.js";
import RedirectedPage from "./pages/redirectPage";
import Footer from "./components/footer/index.js";
import Navbar from "./components/navbar";
import { FailedAlert, SuccesAlert } from "./components/alert";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "./App.css";

function App() {
  const submitFormHandler = (data) => {
    toast(
      data.status === 0 ? (
        <SuccesAlert message={data.message} />
      ) : (
        <FailedAlert message={data.message} />
      ),
      {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        transition: Slide,
        className: "alerts alerts-wrapper",
        bodyClassName: "alerts alerts-body",
        progressClassName: "alerts",
      }
    );
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <ToastContainer
            autoClose={false}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          />
          <Navbar />
          <Content onSubmitForm={submitFormHandler} />
          <Footer />
        </Route>
        <Route path="/notfound" exact>
          <ToastContainer
            autoClose={false}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          />
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
