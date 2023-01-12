import React from "react";
import './index.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="">
        <h1>Opps</h1>
        <p className="sub--nf">Something went Wrong</p>
        <p className="sub--nf-decs">Error 404 Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
