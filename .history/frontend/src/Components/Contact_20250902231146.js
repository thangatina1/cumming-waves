import React from "react";
import FindDirections from "./FindDirections";


const Contact = () => {
  return (
    <div className="contact-page-wrapper" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 40, minHeight: 500 }}>
      {/* Left side: Contact form and headings */}
      <div style={{ flexBasis: '20%', maxWidth: '20%', minWidth: 120 }}>
        <h1 className="primary-heading">Have Question In Mind?</h1>
        <h1 className="primary-heading">Let Us Help You</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="secondary-button">Submit</button>
        </div>
      </div>
  {/* Right side: FindDirections */}
  <div style={{ flexBasis: '80%', maxWidth: '80%', minWidth: 340 }}>
        <FindDirections />
      </div>
    </div>
  );
};

export default Contact;
