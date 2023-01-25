import React from "react";
import "./index.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h1>Opps</h1>
        <p className="sub--nf">Something went Wrong</p>
        <p className="sub--nf-decs">Error 404 Page Not Found</p>
      </div>
      <div className="mt-5">
        <a
          className="btn btn-gen btn-primary font-Poppins p-2"
          href="/"
          role="button"
        >
          Back to Main Page
        </a>
      </div>
    </div>
  );
};

export default NotFound;
