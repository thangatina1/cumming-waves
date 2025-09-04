import React from "react";
import FindDirections from "./FindDirections";


const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
      <div style={{marginTop: 40}}>
        <FindDirections />
      </div>
    </div>
  );
};

export default Contact;
