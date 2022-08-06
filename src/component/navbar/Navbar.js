import React from "react";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <div className={classes.content}>
        KMHDUI.<span className={classes.link}>link</span>
      </div>
    </div>
  );
};

export default Navbar;
