import React from "react";
import "./index.css";
import iconBrowser from "../../assets/browser.svg";
import iconIntagram from "../../assets/instagram.svg";
import iconLocation from "../../assets/location.svg";
import iconWhatsapp from "../../assets/whatsapp.svg";
import logo from "../../assets/kmhdui.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-info grid md:grid-cols-3 gap-4 mt-4">
        <div className="label-name sm:text-sm lg:text-lg">
          <img alt="logo" src={logo} />
          <p className="ml-6">
            Keluarga Mahasiswa Hindu Dharma
            <br />
            Universitas Indonesia
          </p>
        </div>
        <div className="location">
          <img alt="location" src={iconLocation} />
          <p className="ml-6">Universitas Indonesia, Depok, Jawa Barat.</p>
        </div>
        <div className="footer--media">
          <p>Our social media</p>
          <div className="media--icon flex">
            <a href="https://www.kmhdui.link">
              <img alt="browser" src={iconBrowser} />
            </a>
            <a href="https://www.instagram.com/kmhdui/">
              <img alt="instagram" src={iconIntagram} />
            </a>
            <a href="https://www.wa.me/62">
              <img alt="whatsapp" src={iconWhatsapp} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p>&copy; KMHD UI 2022</p>
      </div>
    </div>
  );
};

export default Footer;
