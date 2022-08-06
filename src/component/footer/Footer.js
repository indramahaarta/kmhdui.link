import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      Keluarga Mahasiswa Hindu Dharma Universitas Indonesia
      <div className={classes.copyright}>Copyright 2022</div>
    </div>
  );
};

export default Footer;
