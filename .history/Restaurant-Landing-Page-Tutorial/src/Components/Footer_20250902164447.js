import React from "react";
// import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          {/* <img src={Logo} alt="" /> */}
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>About the Team</span>
          <span>Coaching Staff</span>
          <span>Practice Schedule</span>
          <span>Meets & Events</span>
          <span>Parent Info</span>
          <span>Testimonials</span>
        </div>
        <div className="footer-section-columns">
          <span>Swim Office: 244-5333-7783</span>
          <span>coach@cummingwaves.com</span>
          <span>info@cummingwaves.com</span>
          <span>emergency@cummingwaves.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>USA Swimming</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
